import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Menu, X, Briefcase, MapPin, IndianRupee } from "lucide-react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // MOBILE MENU
  const [menuOpen, setMenuOpen] = useState(false);

  // CURRENT BUTTON LOADING
  const [applyingJobId, setApplyingJobId] = useState(null);

  const navigate = useNavigate();

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // FETCH JOBS
        const jobsRes = await API.get("/jobs/alljobs");

        // FETCH APPLIED JOBS
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

  // ================= APPLY JOB =================
  const handleApply = async (jobId) => {
    try {
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

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden md:flex w-[270px] bg-gray-900 text-white flex-col justify-between p-6 fixed left-0 top-0 h-screen shadow-2xl">
        {/* TOP */}
        <div>
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-blue-400">JobPulse</h1>

            <p className="text-gray-400 text-sm mt-1">Find your dream job 🚀</p>
          </div>

          {/* MENU */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-2xl transition"
            >
              <span>📊</span>

              <span>Dashboard</span>
            </button>

            <button className="w-full flex items-center gap-3 bg-blue-600 px-4 py-3 rounded-2xl">
              <span>💼</span>

              <span>Jobs</span>
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-2xl transition"
            >
              <span>👤</span>

              <span>Profile</span>
            </button>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-2xl font-semibold transition"
        >
          Logout
        </button>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        {/* BACKDROP */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* SIDEBAR */}
        <div
          className={`absolute left-0 top-0 h-full w-[270px] bg-gray-900 text-white p-6 flex flex-col justify-between transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* TOP */}
          <div>
            {/* HEADER */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="text-3xl font-bold text-blue-400">JobPulse</h1>

                <p className="text-gray-400 text-sm mt-1">
                  Find your dream job 🚀
                </p>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="bg-gray-800 p-2 rounded-xl"
              >
                <X size={22} />
              </button>
            </div>

            {/* MENU */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-2xl transition"
              >
                <span>📊</span>

                <span>Dashboard</span>
              </button>

              <button className="w-full flex items-center gap-3 bg-blue-600 px-4 py-3 rounded-2xl">
                <span>💼</span>

                <span>Jobs</span>
              </button>

              <button
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-2xl transition"
              >
                <span>👤</span>

                <span>Profile</span>
              </button>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-2xl font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 md:ml-[270px]">
        {/* MOBILE TOPBAR */}
        <div className="md:hidden bg-gray-900 text-white px-4 py-4 flex items-center justify-between sticky top-0 z-40 shadow-lg">
          {/* LEFT */}
          <div>
            <h1 className="text-2xl font-bold text-blue-400">JobPulse</h1>

            <p className="text-xs text-gray-400">Available Jobs</p>
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen(true)}
            className="w-11 h-11 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Available Jobs
              </h1>

              <p className="text-gray-500 mt-2">
                Discover opportunities that match your skills
              </p>
            </div>

            {/* JOB COUNT */}
            <div className="flex items-center gap-3 bg-white px-5 py-4 rounded-2xl shadow-md w-fit">
              <Briefcase className="text-blue-500" />

              <div>
                <p className="text-sm text-gray-500">Total Jobs</p>

                <h2 className="font-bold text-lg text-gray-800">
                  {jobs.length}
                </h2>
              </div>
            </div>
          </div>

          {/* MESSAGE */}
          {message && (
            <div className="mb-6 bg-blue-100 border border-blue-200 text-blue-700 px-5 py-4 rounded-2xl">
              {message}
            </div>
          )}

          {/* LOADING */}
          {loading ? (
            <div className="flex items-center justify-center h-[60vh]">
              <p className="text-lg font-medium text-gray-500">
                Loading jobs...
              </p>
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
                    className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border border-gray-100 transition duration-300 cursor-pointer hover:-translate-y-1"
                  >
                    {/* TOP */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                          {job.title}
                        </h2>

                        <p className="text-gray-500 mt-1 text-lg">
                          {job.company}
                        </p>
                      </div>

                      <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                        Hiring
                      </span>
                    </div>

                    {/* INFO */}
                    <div className="mt-5 space-y-4">
                      {job.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin size={18} />

                          <p>{job.location}</p>
                        </div>
                      )}

                      {job.salary && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <IndianRupee size={18} />

                          <p>{job.salary}</p>
                        </div>
                      )}

                      {job.description && (
                        <div className="text-gray-600">
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
                      className={`w-full mt-6 py-3 rounded-2xl font-semibold transition duration-200 ${
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
      </div>
    </div>
  );
};

export default Jobs;
