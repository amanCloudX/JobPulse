import { useNavigate, useLocation } from "react-router-dom";
import { X, LogOut } from "lucide-react";

const RecruiterSidebar = ({ closeMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/recruiter/dashboard",
      icon: "📊",
    },
    {
      name: "Add Job",
      path: "/add-job",
      icon: "➕",
    },
    {
      name: "My Jobs",
      path: "/my-jobs",
      icon: "💼",
    },
    {
      name: "Profile",
      path: "/recruiter-profile",
      icon: "👤",
    },
  ];

  return (
    <div className="w-[280px] h-screen bg-gray-900 text-white flex flex-col p-6 shadow-2xl">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-blue-400">Recruiter Panel</h2>

          <p className="text-gray-400 text-sm mt-1">Manage jobs & applicants</p>
        </div>

        {/* MOBILE CLOSE */}
        <button
          onClick={closeMenu}
          className="md:hidden bg-gray-800 p-2 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      {/* MENU */}
      <div className="space-y-3 mt-10">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => {
              navigate(item.path);

              if (closeMenu) closeMenu();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
              location.pathname === item.path
                ? "bg-blue-500 text-white"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <span>{item.icon}</span>

            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </div>

      {/* LOGOUT BUTTON */}
      <div className="mt-auto pt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition"
        >
          <LogOut size={20} />

          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default RecruiterSidebar;
