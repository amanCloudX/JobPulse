import React from "react";
import Logo from "../components/logo";
import { Mail, User, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../api/axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleSubmit = async (e) => {
      e.preventDefault();

      // ✅ FRONTEND VALIDATION (VERY IMPORTANT)
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
        const response = await API.post("/register", formData);

        console.log(response.data);

        setError("");
        alert("User Registered Successfully");
      } catch (error) {
        console.log(error.response?.data || error.message);

        const backendError =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.response?.data?.msg;

        setError(backendError || "Something went wrong");
      }
    };
  };
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-cover bg-[url('https://wallpapers.com/images/hd/professional-photo-background-1920-x-1229-e3s6g0zxa6qx502x.jpg')]">
        <div className="bg-transparent p-8 rounded-lg shadow-md w-100 ">
          <h2
            className="text-xl  bg-gradient-to-r 
from-blue-500 to-purple-600 
bg-clip-text text-transparent font-bold text-center mb-6"
          >
            Register Here
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex items-center border px-2 py-2 rounded">
              <User size={20} color="#8e8585" />
              <input
                onChange={handleChange}
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter Name"
                className="outline-none w-full ml-2"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border px-2 py-2 rounded">
              <Mail size={20} color="#8e8585" />
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter Email"
                className="outline-none w-full ml-2"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border px-2 py-2 rounded">
              <LockKeyhole size={20} color="#8e8585" />
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter Password"
                className="outline-none w-full ml-2"
              />
            </div>

            {/* Role */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border p-2 rounded "
            >
              <option value="select your role">Select your role</option>
              <option value="user">User</option>
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>

            {/* Button */}
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded hover:bg-blue-600 active:scale-95">
              Sign Up
            </button>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="text-center mt-2">
              <p className="text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/")}
                  className="text-blue-500 cursor-pointer hover:underline font-semibold"
                >
                  Sign In
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
