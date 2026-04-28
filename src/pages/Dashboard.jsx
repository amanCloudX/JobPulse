import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  //Fetch User Apllications

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/myapplications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setApplications(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  //logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  //stats calculation

  const applied =
    applications.filter((a) => a.status === "Applied").length || 0;
  const interview =
    applications.filter((a) => a.status === "Interview").length || 0;
  const rejected =
    applications.filter((a) => a.status === "Rejected").length || 0;

  return (
    <>
      <div className="flex h-screen">
        {/* sidebar */}
        <div className="w-64 bg-gray-900 text-white p-5 ">
          <h1 className="text-xl font-bold mb-6">Job Pulse</h1>
          <ul className="space-y-4">
            <li  onClick={() => navigate("/dashboard")} className="cursor-pointer hover:text-blue-400">Dashboard</li>
            <li  onClick={() => navigate("/jobs")} className="cursor-pointer hover:text-blue-400">Jobs</li>
            <li  onClick={() => navigate("/myapplications")} className="cursor-pointer hover:text-blue-400">Applications</li>
            <li  onClick={() => navigate("/profile")} className="cursor-pointer hover:text-blue-400">Profile</li>
          </ul>

          <button
            onClick={handleLogout}
            className="mt-10 bg-red-500 px-3 py-2 rounded w-full  "
          >
            Logout
          </button>
        </div>

        {/* Mian Content */}
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {/* loading */}
          {loading ? (
            <p>Loading....</p>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow">
                  <h2 className="text-gray-500">Applied</h2>
                  <p className="text-xl font-bold">{applied}</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                  <h2 className="text-gray-500">Interview</h2>
                  <p className="text-xl font-bold">{interview}</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                  <h2 className="text-gray-500">Rejected</h2>
                  <p className="text-xl font-bold">{rejected}</p>
                </div>
              </div>

              {/* 🔥 Applications Table */}
              <div className="bg-white p-5 rounded shadow">
                <h2 className="text-lg font-semibold mb-4">My Applications</h2>

                {applications.length === 0 ? (
                  <p>No applications yet</p>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2">Job Title</th>
                        <th>Company</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {applications.map((app) => (
                        <tr key={app._id} className="border-b hover:bg-gray-50">
                          <td className="py-2">{app.job.title}</td>
                          <td>{app.job.company}</td>
                          <td>
                            <span
                              className={`px-2 py-1 rounded text-white ${
                                app.status === "Applied"
                                  ? "bg-blue-500"
                                  : app.status === "Interview"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
