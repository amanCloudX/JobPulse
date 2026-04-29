import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [applying, setApplying] = useState(false); // 🔥 NEW

  const navigate = useNavigate();

  // 🔥 Fetch jobs + applied jobs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch jobs
        const jobsRes = await API.get("/jobs/alljobs");

        // Fetch applied jobs
        const appliedRes = await API.get("/applications/myapplications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

  // 🔥 Apply job
  const handleApply = async (jobId) => {
    try {
      setApplying(true);

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

      // Update UI instantly
      setAppliedJobs((prev) => [...prev, jobId]);
      setMessage("Applied successfully ✅");

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Error applying job ❌");

      setTimeout(() => setMessage(""), 3000);
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>

      {/* 🔥 Message */}
      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      {/* 🔥 Loading */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {jobs.map((job) => {
            const isApplied = appliedJobs.includes(job._id);

            return (
              <div
                key={job._id}
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="bg-white p-5 rounded shadow hover:shadow-lg transition cursor-pointer"
              >
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>

                {job.location && (
                  <p className="text-sm text-gray-500">📍 {job.location}</p>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(job._id);
                  }}
                  disabled={isApplied || applying}
                  className={`mt-4 px-4 py-2 rounded text-white ${
                    isApplied || applying
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isApplied ? "Applied" : applying ? "Applying..." : "Apply"}
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
