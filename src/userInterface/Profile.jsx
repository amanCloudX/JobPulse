import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
  Menu,
  X,
  User,
  Briefcase,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 overflow-x-hidden flex">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden md:flex w-[260px] bg-gray-900 text-white flex-col justify-between p-6 fixed left-0 top-0 h-screen">
        {/* TOP */}
        <div>
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-blue-400">JobPulse</h1>

            <p className="text-gray-400 text-sm mt-1">Find your dream job 🚀</p>
          </div>
          {/* MENU */}
          {/* MENU */}
          <div className="space-y-3">
            {/* DASHBOARD */}
            <button
              onClick={() => {
                navigate("/dashboard");
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-2xl transition"
            >
              <span className="text-lg">📊</span>

              <span>Dashboard</span>
            </button>

            {/* JOBS */}
            <button
              onClick={() => {
                navigate("/jobs");
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-2xl transition"
            >
              <span className="text-lg">💼</span>

              <span>Jobs</span>
            </button>

            {/* ACTIVE PROFILE */}
            <button
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 bg-blue-600 px-4 py-3 rounded-2xl"
            >
              <span className="text-lg">👤</span>

              <span>Profile</span>
            </button>
          </div>
        </div>
        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-2xl font-semibold transition flex items-center justify-center gap-2"
        >
          <LogOut size={18} />

          <span>Logout</span>
        </button>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      {menuOpen && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />

          {/* SIDEBAR */}
          <div className="fixed top-0 left-0 w-[260px] h-screen bg-gray-900 text-white p-6 z-50 md:hidden flex flex-col justify-between shadow-2xl">
            {/* TOP */}
            <div>
              {/* HEADER */}
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h1 className="text-3xl font-bold text-blue-400">JobPulse</h1>

                  <p className="text-gray-400 text-sm mt-1">
                    Manage your profile 🚀
                  </p>
                </div>

                {/* CLOSE */}
                <button
                  onClick={() => setMenuOpen(false)}
                  className="bg-gray-800 p-2 rounded-xl"
                >
                  <X size={22} />
                </button>
              </div>

              {/* MENU */}
              <div className="space-y-3">
                {/* DASHBOARD */}
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-2xl transition"
                >
                  <LayoutDashboard size={20} />

                  <span>Dashboard</span>
                </button>

                {/* JOBS */}
                <button
                  onClick={() => {
                    navigate("/jobs");
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-2xl transition"
                >
                  <Briefcase size={20} />

                  <span>Jobs</span>
                </button>

                {/* PROFILE ACTIVE */}
                <button className="w-full flex items-center gap-3 bg-blue-600 px-4 py-3 rounded-2xl">
                  <User size={20} />

                  <span>Profile</span>
                </button>
              </div>
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-2xl font-semibold transition flex items-center justify-center gap-2"
            >
              <LogOut size={18} />

              <span>Logout</span>
            </button>
          </div>
        </>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 md:ml-[270px] min-h-screen">
        {/* ================= MOBILE TOPBAR ================= */}
        <div className="md:hidden bg-gray-900 text-white px-4 py-4 flex items-center justify-between sticky top-0 z-30 shadow-lg">
          {/* MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(true)}
            className="bg-gray-800 p-2 rounded-xl"
          >
            <Menu size={24} />
          </button>

          {/* TITLE */}
          <h1 className="text-2xl font-bold text-blue-400">Profile</h1>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-2 rounded-xl text-sm"
          >
            Logout
          </button>
        </div>

        {/* ================= PAGE CONTENT ================= */}
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {/* LOADING */}
          {loading ? (
            <div className="h-[70vh] flex items-center justify-center">
              <p className="text-lg text-gray-500">Loading profile...</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* HEADER */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-36 md:h-44 relative">
                {/* PROFILE ICON */}
                <div className="absolute left-1/2 md:left-10 transform -translate-x-1/2 md:translate-x-0 -bottom-14">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white bg-white shadow-xl flex items-center justify-center text-4xl md:text-5xl font-bold text-blue-600">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="pt-20 md:pt-24 px-5 md:px-10 pb-8">
                {/* TOP INFO */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* USER INFO */}
                  <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                      {user?.name}
                    </h1>

                    <p className="text-gray-500 mt-2 text-sm md:text-base break-all">
                      {user?.email}
                    </p>

                    <span className="inline-block mt-4 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold capitalize">
                      {user?.role}
                    </span>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => navigate("/edit-profile")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition shadow-md"
                    >
                      Edit Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-medium transition shadow-md"
                    >
                      Logout
                    </button>
                  </div>
                </div>

                {/* INFO CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                  {/* EMAIL */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
                    <p className="text-sm text-gray-500 mb-2">Email Address</p>

                    <h2 className="text-lg font-semibold text-gray-800 break-all">
                      {user?.email}
                    </h2>
                  </div>

                  {/* ROLE */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
                    <p className="text-sm text-gray-500 mb-2">Account Role</p>

                    <h2 className="text-lg font-semibold text-gray-800 capitalize">
                      {user?.role}
                    </h2>
                  </div>

                  {/* USER ID */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:col-span-2 hover:shadow-md transition">
                    <p className="text-sm text-gray-500 mb-2">User ID</p>

                    <h2 className="text-sm font-medium text-gray-700 break-all">
                      {user?._id}
                    </h2>
                  </div>
                </div>

                {/* EXTRA SECTION */}
                <div className="mt-10 bg-blue-50 border border-blue-100 rounded-3xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-blue-700 mb-3">
                    Welcome to JobPulse 🚀
                  </h2>

                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    Manage your profile, track your job applications, and
                    explore career opportunities all in one place.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
