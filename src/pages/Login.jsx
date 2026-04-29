import { useState } from "react";
import Logo from "../components/logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");
    if (!form.email || !form.password) {
      setError("All Fields Are Required");
      return;
    }

    try {
      const response = await API.post("/login", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;

      localStorage.setItem("token", data.token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.log(err);

      if (err.response) {
        // server responded with error
        setError("Invalid Email or Password");
      } else {
        // network or other error
        setError("Something went wrong");
      }
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-pink-300">
        {/* Main Card */}
        <div className="w-[900px] h-[500px] bg-white rounded-2xl shadow-2xl flex overflow-hidden">
          {/* LEFT SIDE - FORM */}

          <div className="w-1/2 p-10 flex flex-col justify-center">
            <Logo className="mb-5" />

            <h2 className="text-sm font-semibold mt-9 mb-2">Welcome 👋</h2>
            <h1 className="text-3xl font-bold mb-6">Log In</h1>

            {/* Email */}
            <div className="mb-4">
              <label className="text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Enter Email Here"
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                placeholder="Enter Password Here"
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* ❌ Error Message */}
            {error && (
              <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
            )}

            {/* Button */}
            <button className="bg-pink-400 text-white py-2 rounded-md hover:bg-pink-500 transition">
              LOGIN →
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm">
                New User?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Register Here
                </span>
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className="w-1/2 bg-blue-100 relative flex items-center justify-center rounded-2xl overflow-hidden">
            {/* Girl Image */}
            <img
              src="/girl.png"
              alt="girl"
              className="absolute bottom-0 left-0 w-[85%] max-h-full  object-contain z-1"
            />

            {/* Cactus Image */}
            <img
              src="/cactus1.png"
              alt="cactus"
              className="absolute bottom-0 right-0 left-45 w-[70%] object-contain"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
