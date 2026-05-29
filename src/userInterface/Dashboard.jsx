import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Menu, X } from "lucide-react";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // MOBILE MENU
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  // ================= FETCH APPLICATIONS =================
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/applications/myapplications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const validApplications = Array.isArray(res.data)
          ? res.data.filter((app) => app.job !== null)
          : [];

        setApplications(validApplications);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  // ================= STATS =================
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
    <div className="min-h-screen bg-gray-100 flex">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden md:flex w-[270px] bg-gray-900 text-white flex-col justify-between p-6 fixed left-0 top-0 h-screen shadow-2xl">
        {/* TOP */}
        <div>
          {/* LOGO */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-blue-400">JobPulse</h1>

            <p className="text-gray-400 text-sm mt-1">Find your dream job 🚀</p>
          </div>

          {/* MENU */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full flex items-center gap-3 bg-blue-600 px-4 py-3 rounded-2xl"
            >
              <span>📊</span>
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/jobs")}
              className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-2xl transition"
            >
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
                className="w-full flex items-center gap-3 bg-blue-600 px-4 py-3 rounded-2xl"
              >
                <span>📊</span>
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => {
                  navigate("/jobs");
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-2xl transition"
              >
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

            <p className="text-xs text-gray-400">Track applications</p>
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen(true)}
            className="w-11 h-11 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* PAGE */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {/* LOADING */}
          {loading ? (
            <div className="h-[70vh] flex items-center justify-center">
              <p className="text-lg font-medium text-gray-500">
                Loading applications...
              </p>
            </div>
          ) : (
            <>
              {/* HEADER */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  My Applications
                </h1>

                <p className="text-gray-500 mt-2">
                  Track your applications and interview progress
                </p>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
                {/* APPLIED */}
                <div className="bg-white rounded-3xl shadow-md p-6 border-l-4 border-blue-500">
                  <h2 className="text-gray-500 text-sm font-medium">Applied</h2>

                  <p className="text-4xl font-bold text-blue-600 mt-3">
                    {applied}
                  </p>
                </div>

                {/* INTERVIEW */}
                <div className="bg-white rounded-3xl shadow-md p-6 border-l-4 border-green-500">
                  <h2 className="text-gray-500 text-sm font-medium">
                    Interview
                  </h2>

                  <p className="text-4xl font-bold text-green-600 mt-3">
                    {interview}
                  </p>
                </div>

                {/* REJECTED */}
                <div className="bg-white rounded-3xl shadow-md p-6 border-l-4 border-red-500">
                  <h2 className="text-gray-500 text-sm font-medium">
                    Rejected
                  </h2>

                  <p className="text-4xl font-bold text-red-600 mt-3">
                    {rejected}
                  </p>
                </div>
              </div>

              {/* APPLICATIONS */}
              <div className="bg-white rounded-3xl shadow-md overflow-hidden">
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Recent Applications
                  </h2>

                  <span className="text-sm text-gray-500">
                    {applications.length} Applications
                  </span>
                </div>

                {/* EMPTY */}
                {applications.length === 0 ? (
                  <div className="p-10 text-center">
                    <p className="text-gray-500 text-lg">
                      No applications yet 🚀
                    </p>

                    <button
                      onClick={() => navigate("/jobs")}
                      className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition"
                    >
                      Browse Jobs
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px]">
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
                            {/* JOB */}
                            <td className="p-4 font-semibold text-gray-800">
                              {app.job?.title}
                            </td>

                            {/* COMPANY */}
                            <td className="text-gray-600">
                              {app.job?.company}
                            </td>

                            {/* STATUS */}
                            <td className="text-center">
                              <span
                                className={`px-4 py-1.5 rounded-full text-white text-sm font-medium ${
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
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
