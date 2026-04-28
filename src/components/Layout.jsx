import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="flex gap-5">
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "text-red-500" : "")}
        >
          Login
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) => (isActive ? "text-red-500" : "")}
        >
          Register
        </NavLink>
      </nav>

      {/* Page Content */}
      <Outlet />
    </div>
  );
};

export default Layout;