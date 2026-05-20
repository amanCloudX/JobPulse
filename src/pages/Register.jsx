import React, { useState } from "react";
import { Mail, User, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Logo from "../components/logo";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await API.post("/auth/register", formData);

      console.log(response.data);

      setError("");

      alert("User Registered Successfully");

      navigate("/");
    } catch (error) {
      console.log(error);

      const backendError =
        error.response?.data?.message || error.response?.data?.error;

      setError(backendError || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-4 py-6 overflow-hidden">
      {/* CARD */}
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
        {/* TOP STRIP */}
        <div className="h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

        <div className="p-6 sm:p-8 md:p-10">
          {/* LOGO */}
          <div className="flex justify-center mb-5">
            <Logo />
          </div>

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
            Create Account
          </h1>

          <p className="text-center text-gray-500 mt-3 text-sm md:text-base">
            Join JobPulse and explore new opportunities 🚀
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* NAME */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <div className="flex items-center mt-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <User size={20} className="text-blue-500" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full ml-3 outline-none bg-transparent text-gray-700"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>

              <div className="flex items-center mt-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <Mail size={20} className="text-blue-500" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full ml-3 outline-none bg-transparent text-gray-700"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="flex items-center mt-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <LockKeyhole size={20} className="text-blue-500" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full ml-3 outline-none bg-transparent text-gray-700"
                />
              </div>
            </div>

            {/* ROLE */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Select Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="">Choose role</option>
                <option value="user">User</option>
                <option value="recruiter">Recruiter</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm text-center font-medium">
                {error}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition duration-300"
            >
              Sign Up
            </button>

            {/* LOGIN */}
            <div className="text-center pt-2">
              <p className="text-gray-600 text-sm md:text-base">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/")}
                  className="text-blue-600 font-semibold cursor-pointer hover:underline"
                >
                  Sign In
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
