import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/recruiter/EmptyState";

const RecruiterProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ================= FETCH PROFILE + JOBS =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        // PROFILE
        const profileRes = await API.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // JOBS
        const jobsRes = await API.get("/jobs/myjobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(profileRes.data);
        setJobs(jobsRes.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  // ================= LOADING =================
  if (loading) {
    return <LoadingSpinner text="Loading profile..." />;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-gray-100 to-indigo-100 min-h-screen p-4 md:p-6">
      {/* ================= PROFILE HEADER ================= */}
      <div className="bg-white rounded-3xl shadow-xl p-5 md:p-8 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* LEFT */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* AVATAR */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>

            {/* INFO */}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {profile?.name}
              </h1>

              <p className="text-gray-500 mt-2 break-all">{profile?.email}</p>

              <div className="mt-4 inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                Recruiter
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={() => navigate("/my-jobs")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-medium shadow-md transition w-full"
            >
              My Jobs
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-medium shadow-md transition w-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {/* TOTAL JOBS */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-sm font-medium">
            Total Jobs Posted
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-3">{jobs.length}</p>
        </div>

        {/* ACTIVE */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-green-500">
          <h2 className="text-gray-500 text-sm font-medium">Active Listings</h2>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {jobs.length}
          </p>
        </div>

        {/* ROLE */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-purple-500">
          <h2 className="text-gray-500 text-sm font-medium">Account Role</h2>

          <p className="text-2xl font-bold text-purple-600 mt-4">Recruiter</p>
        </div>
      </div>

      {/* ================= RECENT JOBS ================= */}
      <div className="bg-white rounded-3xl shadow-lg p-5 md:p-6 mt-8 border border-gray-200">
        {/* TOP */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Job Posts</h2>

          <button
            onClick={() => navigate("/add-job")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl transition font-medium"
          >
            + Add Job
          </button>
        </div>

        {/* EMPTY */}
        {jobs.length === 0 ? (
          <EmptyState
            title="No jobs posted yet"
            subtitle="Start posting jobs to attract candidates"
            buttonText="Create Job"
            buttonAction={() => navigate("/add-job")}
          />
        ) : (
          /* JOB GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
            {jobs.slice(0, 6).map((job) => (
              <div
                key={job._id}
                className="border border-gray-200 rounded-3xl p-5 hover:shadow-xl transition duration-300 bg-gray-50 hover:bg-white"
              >
                {/* TITLE */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {job.title}
                    </h3>

                    <p className="text-gray-500 mt-1">{job.company}</p>
                  </div>

                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    Active
                  </span>
                </div>

                {/* INFO */}
                <div className="mt-5 space-y-3">
                  <p className="text-sm text-gray-600">📍 {job.location}</p>

                  <p className="text-sm text-gray-600">💰 ₹{job.salary}</p>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => navigate("/my-jobs")}
                  className="mt-6 w-full bg-gray-900 hover:bg-blue-600 text-white py-3 rounded-2xl transition font-medium"
                >
                  View Job
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterProfile;
