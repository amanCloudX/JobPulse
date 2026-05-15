import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const RecruiterProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // FETCH PROFILE + JOBS
  useEffect(() => {
    const fetchData = async () => {
      try {
        // PROFILE
        const profileRes = await API.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // MY JOBS
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

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-indigo-100 p-6">
      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* LEFT */}
          <div className="flex items-center gap-5">
            {/* AVATAR */}
            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>

            {/* INFO */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                {profile?.name}
              </h1>

              <p className="text-gray-500 mt-1">{profile?.email}</p>

              <div className="mt-3 inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                Recruiter
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/my-jobs")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-medium shadow-md transition"
            >
              My Jobs
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-medium shadow-md transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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

      {/* RECENT JOBS */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Job Posts</h2>

          <button
            onClick={() => navigate("/add-job")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
          >
            + Add Job
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No jobs posted yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {jobs.slice(0, 6).map((job) => (
              <div
                key={job._id}
                className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>

                <p className="text-gray-500 mt-1">{job.company}</p>

                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">📍 {job.location}</p>

                  <p className="text-sm text-gray-600">💰 ${job.salary}</p>
                </div>

                <button
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="mt-5 w-full bg-gray-900 hover:bg-blue-600 text-white py-2 rounded-xl transition"
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
