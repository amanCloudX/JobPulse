import { Route, Routes } from "react-router-dom";
import Logo from "./components/logo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./userInterface/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Jobs from "./userInterface/Jobs";
import RecruiterDashboard from "./recruiterInterface/RecruiterDashboard";
import Addjobs from "./recruiterInterface/Addjobs";
import MyJobs from "./recruiterInterface/MyJobs";
import Profile from "./userInterface/Profile";
import RecruiterProfile from "./recruiterInterface/RecruiterProfile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
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

        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoutes>
              <RecruiterDashboard />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/add-job"
          element={
            <ProtectedRoutes>
              <Addjobs />
            </ProtectedRoutes>
          }
        />
        <Route path="/my-jobs" element={<MyJobs />} />
        <Route path="/recruiter-profile" element={<RecruiterProfile />} />
      </Routes>
    </>
  );
};

export default App;
