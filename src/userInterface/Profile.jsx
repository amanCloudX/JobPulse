import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // FETCH USER
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

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-indigo-100 p-6">
      {/* LOADING */}
      {loading ? (
        <div className="h-[80vh] flex items-center justify-center">
          <p className="text-lg text-gray-500">Loading profile...</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          {/* TOP CARD */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-40 relative">
              {/* PROFILE IMAGE */}
              <div className="absolute left-8 -bottom-14">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center text-4xl font-bold text-blue-600">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="pt-20 px-8 pb-8">
              {/* NAME */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {user?.name}
                  </h1>

                  <p className="text-gray-500 mt-1">{user?.email}</p>

                  <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium capitalize">
                    {user?.role}
                  </span>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-5 md:mt-0">
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition shadow-md"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-medium transition shadow-md"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* INFO GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {/* EMAIL */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Email Address</p>

                  <h2 className="text-lg font-semibold text-gray-800">
                    {user?.email}
                  </h2>
                </div>

                {/* ROLE */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Account Role</p>

                  <h2 className="text-lg font-semibold text-gray-800 capitalize">
                    {user?.role}
                  </h2>
                </div>

                {/* USER ID */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 md:col-span-2">
                  <p className="text-sm text-gray-500 mb-2">User ID</p>

                  <h2 className="text-sm font-medium text-gray-700 break-all">
                    {user?._id}
                  </h2>
                </div>
              </div>

              {/* EXTRA SECTION */}
              <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                  Welcome to Job Pulse 🚀
                </h2>

                <p className="text-gray-600 leading-relaxed">
                  Manage your profile, track your applications, and explore new
                  career opportunities all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
