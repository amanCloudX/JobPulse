import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import RecruiterSidebar from "../components/recruiter/RecruiterSideBar";

const RecruiterLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-[280px] z-40">
        <RecruiterSidebar />
      </div>

      {/* MOBILE TOPBAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-4 flex items-center justify-between shadow-lg">
        <h1 className="text-xl font-bold text-blue-400">JobPulse</h1>

        <button onClick={() => setMobileMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      {mobileMenuOpen && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* SIDEBAR */}
          <div className="fixed top-0 left-0 z-50 md:hidden">
            <RecruiterSidebar closeMenu={() => setMobileMenuOpen(false)} />
          </div>
        </>
      )}

      {/* MAIN CONTENT */}
      <main className="md:ml-[280px] min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-6 pb-6 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RecruiterLayout;
