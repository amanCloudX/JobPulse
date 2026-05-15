import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  //Fetch User Apllications

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/applications/myapplications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        const validApplications = Array.isArray(res.data)
          ? res.data.filter((app) => app.job !== null)
          : [];

        setApplications(validApplications);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  //logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  //stats calculation

  const applied =
    applications.filter((a) => a.status?.toLowerCase() === "applied").length ||
    0;

  const interview =
    applications.filter((a) => a.status?.toLowerCase() === "interview")
      .length || 0;

  const rejected =
    applications.filter((a) => a.status?.toLowerCase() === "rejected").length ||
    0;

  return (
    <>
      <div className="flex h-screen">
        {/* sidebar */}
        <div className="w-64 bg-gray-900 text-white flex flex-col justify-between p-6 shadow-2xl">
          {/* TOP SECTION */}
          <div>
            {/* LOGO */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-wide text-blue-400">
                Job Pulse
              </h1>

              <p className="text-sm text-gray-400 mt-1">Find your dream job</p>
            </div>

            {/* MENU */}
            <ul className="space-y-3">
              {/* DASHBOARD */}
              <li
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-800 hover:text-blue-400 transition duration-200"
              >
                <span className="text-lg">📊</span>
                <span className="font-medium">Dashboard</span>
              </li>

              {/* JOBS */}
              <li
                onClick={() => navigate("/jobs")}
                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-800 hover:text-blue-400 transition duration-200"
              >
                <span className="text-lg">💼</span>
                <span className="font-medium">Jobs</span>
              </li>

              {/* PROFILE */}
              <li
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-800 hover:text-blue-400 transition duration-200"
              >
                <span className="text-lg">👤</span>
                <span className="font-medium">Profile</span>
              </li>
            </ul>
          </div>

          {/* LOGOUT BUTTON */}
          <div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 transition duration-200 py-3 rounded-xl font-semibold shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {/* LOADING */}
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-lg font-medium text-gray-500">
                Loading applications...
              </p>
            </div>
          ) : (
            <>
              {/* PAGE HEADER */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                  My Applications
                </h1>

                <p className="text-gray-500 mt-1">
                  Track your job applications and interview progress
                </p>
              </div>

              {/* STATS CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {/* Applied */}
                <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-blue-500 hover:shadow-lg transition">
                  <h2 className="text-gray-500 text-sm font-medium">Applied</h2>

                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {applied}
                  </p>
                </div>

                {/* Interview */}
                <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-green-500 hover:shadow-lg transition">
                  <h2 className="text-gray-500 text-sm font-medium">
                    Interview
                  </h2>

                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {interview}
                  </p>
                </div>

                {/* Rejected */}
                <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-red-500 hover:shadow-lg transition">
                  <h2 className="text-gray-500 text-sm font-medium">
                    Rejected
                  </h2>

                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {rejected}
                  </p>
                </div>
              </div>

              {/* APPLICATION TABLE */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {/* TABLE HEADER */}
                <div className="flex items-center justify-between p-5 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Recent Applications
                  </h2>

                  <span className="text-sm text-gray-500">
                    {applications.length} Total
                  </span>
                </div>

                {/* EMPTY STATE */}
                {applications.length === 0 ? (
                  <div className="p-10 text-center">
                    <p className="text-gray-500 text-lg">No applications yet</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-900 text-white">
                      <tr>
                        <th className="p-4 text-left">Job Title</th>
                        <th className="text-left">Company</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {applications.map((app) => (
                        <tr
                          key={app._id}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          {/* JOB TITLE */}
                          <td className="p-4 font-medium text-gray-800">
                            {app.job?.title}
                          </td>

                          {/* COMPANY */}
                          <td className="text-gray-600">{app.job?.company}</td>

                          {/* STATUS */}
                          <td className="text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                                app.status === "applied"
                                  ? "bg-blue-500"
                                  : app.status === "interview"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
