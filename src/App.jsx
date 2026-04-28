import { Route, Routes } from "react-router-dom";
import Logo from "./components/logo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Jobs from "./pages/Jobs";

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
      </Routes>
    </>
  );
};

export default App;
