import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./userInterface/Dashboard";
import Jobs from "./userInterface/Jobs";
import Profile from "./userInterface/Profile";

import RecruiterDashboard from "./recruiterInterface/RecruiterDashboard";
import Addjobs from "./recruiterInterface/Addjobs";
import MyJobs from "./recruiterInterface/MyJobs";
import RecruiterProfile from "./recruiterInterface/RecruiterProfile";

import ProtectedRoutes from "./components/ProtectedRoutes";

import RecruiterLayout from "./layouts/RecruiterLayout";

const App = () => {
  return (
    <Routes>
      {/* ================= AUTH ================= */}

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* ================= USER ROUTES ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoutes>
            <Jobs />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
      />

      {/* ================= RECRUITER LAYOUT ROUTES ================= */}

      <Route
        element={
          <ProtectedRoutes>
            <RecruiterLayout />
          </ProtectedRoutes>
        }
      >
        {/* RECRUITER DASHBOARD */}
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />

        {/* ADD JOB */}
        <Route path="/add-job" element={<Addjobs />} />

        {/* MY JOBS */}
        <Route path="/my-jobs" element={<MyJobs />} />

        {/* RECRUITER PROFILE */}
        <Route path="/recruiter-profile" element={<RecruiterProfile />} />
      </Route>
    </Routes>
  );
};

export default App;
