import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const MyJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // FETCH RECRUITER JOBS
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs/myjobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // DELETE JOB
  const deleteJob = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this job?",
      );

      if (!confirmDelete) return;

      await API.delete(`/jobs/job/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // UI UPDATE
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-indigo-100 p-6">
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Jobs</h1>

          <p className="text-gray-500 mt-1">Manage your posted jobs</p>
        </div>

        <button
          onClick={() => navigate("/add-job")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-md transition"
        >
          + Add New Job
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-lg text-gray-500">Loading jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        /* EMPTY STATE */
        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No Jobs Posted Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Start posting jobs to attract candidates
          </p>

          <button
            onClick={() => navigate("/add-job")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
          >
            Create Job
          </button>
        </div>
      ) : (
        /* JOBS GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300 border border-gray-100"
            >
              {/* TOP */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {job.title}
                  </h2>

                  <p className="text-gray-500 mt-1">{job.company}</p>
                </div>

                <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">
                  Active
                </span>
              </div>

              {/* INFO */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📍</span>
                  <p>{job.location}</p>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <span>💰</span>
                  <p>${job.salary}</p>
                </div>

                <div className="flex items-start gap-2 text-gray-600">
                  <span>📝</span>

                  <p className="line-clamp-3">{job.description}</p>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="mt-6 flex gap-3">
                {/* EDIT */}
                <button
                  onClick={() => navigate(`/edit-job/${job._id}`)}
                  className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-2 rounded-xl font-medium transition"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteJob(job._id)}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-xl font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
