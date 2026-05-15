import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // 🔥 ONLY CURRENT BUTTON LOADING
  const [applyingJobId, setApplyingJobId] = useState(null);

  const navigate = useNavigate();

  // FETCH JOBS + APPLIED JOBS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // FETCH ALL JOBS
        const jobsRes = await API.get("/jobs/alljobs");

        // FETCH USER APPLICATIONS
        const appliedRes = await API.get("/applications/myapplications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // GET APPLIED JOB IDS
        const appliedIds = (appliedRes.data || [])
          .map((app) => app.job?._id)
          .filter(Boolean);

        setJobs(jobsRes.data || []);
        setAppliedJobs(appliedIds);
      } catch (error) {
        console.log(error);
        setMessage("Failed to load jobs ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // APPLY JOB
  const handleApply = async (jobId) => {
    try {
      // CURRENT BUTTON LOADING
      setApplyingJobId(jobId);

      const token = localStorage.getItem("token");

      await API.post(
        `/applications/applyjob/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // UPDATE UI INSTANTLY
      setAppliedJobs((prev) => [...prev, jobId]);

      setMessage("Applied successfully ✅");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);

      setMessage(error.response?.data?.message || "Error applying job ❌");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setApplyingJobId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-indigo-100 p-6">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Available Jobs</h1>

          <p className="text-gray-500 mt-2">
            Discover opportunities that match your skills
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow">
          <span className="text-blue-500 text-xl">💼</span>

          <p className="font-medium text-gray-700">
            {jobs.length} Jobs Available
          </p>
        </div>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="mb-6 bg-blue-100 border border-blue-200 text-blue-700 px-5 py-4 rounded-2xl shadow-sm">
          {message}
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-lg font-medium text-gray-500">Loading jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        /* EMPTY STATE */
        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📭</div>

          <h2 className="text-2xl font-bold text-gray-700">
            No Jobs Available
          </h2>

          <p className="text-gray-500 mt-2">Please check again later</p>
        </div>
      ) : (
        /* JOB GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => {
            const isApplied = appliedJobs.includes(job._id);

            return (
              <div
                key={job._id}
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border border-gray-100 transition duration-300 cursor-pointer"
              >
                {/* TOP */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                      {job.title}
                    </h2>

                    <p className="text-gray-500 mt-1 text-lg">{job.company}</p>
                  </div>

                  <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                    Hiring
                  </span>
                </div>

                {/* INFO */}
                <div className="mt-5 space-y-3">
                  {job.location && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>📍</span>

                      <p>{job.location}</p>
                    </div>
                  )}

                  {job.salary && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>💰</span>

                      <p>${job.salary}</p>
                    </div>
                  )}

                  {job.description && (
                    <div className="flex items-start gap-2 text-gray-600">
                      <span>📝</span>

                      <p className="line-clamp-3">{job.description}</p>
                    </div>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(job._id);
                  }}
                  disabled={isApplied || applyingJobId === job._id}
                  className={`w-full mt-6 py-3 rounded-2xl font-semibold transition duration-200 shadow-md ${
                    isApplied
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : applyingJobId === job._id
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isApplied
                    ? "Applied"
                    : applyingJobId === job._id
                      ? "Applying..."
                      : "Apply Now"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Jobs;
