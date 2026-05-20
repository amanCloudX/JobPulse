import { useState } from "react";
import Logo from "../components/logo";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================
  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("All Fields Are Required");
      return;
    }

    try {
      const response = await API.post("/auth/login", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ROLE BASED REDIRECT
      if (data.user.role === "recruiter") {
        navigate("/recruiter/dashboard", { replace: true });
      } else if (data.user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.log(err);

      if (err.response) {
        setError("Invalid Email or Password");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-200 to-pink-300 flex items-center justify-center px-4 py-8">
      {/* MAIN CARD */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* ================= LEFT SIDE ================= */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          {/* LOGO */}
          <div className="mb-6">
            <Logo />
          </div>

          {/* HEADING */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              Welcome Back 👋
            </h2>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Login to JobPulse
            </h1>

            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Find jobs, manage applications and grow your career.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={submitHandler} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full mt-2 p-3 sm:p-4 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full mt-2 p-3 sm:p-4 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-600 text-sm p-3 rounded-xl">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:scale-[1.01] hover:shadow-lg text-white py-3 sm:py-4 rounded-2xl font-semibold transition duration-300"
            >
              LOGIN →
            </button>
          </form>

          {/* REGISTER */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New User?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Register Here
              </span>
            </p>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-100 relative items-center justify-center overflow-hidden">
          {/* BACKGROUND CIRCLE */}
          <div className="absolute w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-40"></div>

          {/* GIRL IMAGE */}
          <img
            src="/girl.png"
            alt="girl"
            className="absolute bottom-0 left-0 w-[80%] object-contain z-10"
          />

          {/* CACTUS */}
          <img
            src="/cactus1.png"
            alt="cactus"
            className="absolute bottom-0 right-0 w-[45%] object-contain z-0"
          />

          {/* TEXT */}
          <div className="absolute top-12 right-10 text-right z-20">
            <h2 className="text-4xl font-bold text-gray-800 leading-tight">
              Your Dream Job <br /> Starts Here 🚀
            </h2>

            <p className="text-gray-600 mt-4 max-w-sm">
              Connect with recruiters, explore opportunities and build your
              future with JobPulse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
