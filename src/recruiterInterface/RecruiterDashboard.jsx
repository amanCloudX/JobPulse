import axios from "axios";
import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const token = localStorage.getItem("token");

  // FETCH RECRUITER JOBS
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs/myjobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  // FETCH APPLICANTS
  const fetchApplicants = async (jobId) => {
    try {
      const res = await API.get(`/applications/applicantsforjob/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (appId, status) => {
    try {
      await API.put(
        `/applications/updateapplicationstatus/${appId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // UI UPDATE
      setApplications((prev) =>
        prev.map((app) => (app._id === appId ? { ...app, status } : app)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE APPLICANT
  const deleteApplicant = async (appId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this applicant?",
      );

      if (!confirmDelete) return;

      await API.delete(`/applications/deleteapplicant/${appId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // UI UPDATE
      setApplications((prev) => prev.filter((app) => app._id !== appId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex h-screen">
        {/* LEFT SIDEBAR */}
        <div className="w-[280px] bg-gray-900 text-white flex flex-col p-6 shadow-2xl">
          {/* HEADER */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-400">
              Recruiter Panel
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Manage jobs & applicants
            </p>
          </div>

          {/* MENU */}
          <div className="space-y-3 mb-8">
            {/* DASHBOARD */}
            <button className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl bg-gray-800 hover:bg-blue-500 transition duration-200">
              <span className="text-lg">📊</span>

              <span className="font-medium">Dashboard</span>
            </button>

            {/* ADD JOB */}
            <button
              onClick={() => navigate("/add-job")}
              className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl bg-gray-800 hover:bg-blue-500 transition duration-200"
            >
              <span className="text-lg">➕</span>

              <span className="font-medium">Add Job</span>
            </button>

            {/* MY JOBS */}
            <button
              onClick={() => navigate("/my-jobs")}
              className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl bg-gray-800 hover:bg-blue-500 transition duration-200"
            >
              <span className="text-lg">💼</span>

              <span className="font-medium">My Jobs</span>
            </button>

            <button
              onClick={() => navigate("/recruiter-profile")}
              className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl bg-gray-800 hover:bg-blue-500 transition duration-200"
            >
              <span className="text-lg">👤</span>
              <span className="font-medium">Profile</span>
            </button>
          </div>

          {/* JOB LIST */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">My Jobs</h3>

              <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
                {jobs.length}
              </span>
            </div>

            {/* JOBS */}
            <div className="overflow-y-auto pr-1 space-y-3">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() => {
                    setSelectedJob(job);
                    fetchApplicants(job._id);
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition duration-200 border ${
                    selectedJob?._id === job._id
                      ? "bg-blue-500 border-blue-400 shadow-lg"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  <h4 className="font-semibold text-white">{job.title}</h4>

                  <p className="text-sm text-gray-300 mt-1">{job.company}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                      {job.location}
                    </span>

                    <span className="text-xs text-gray-300">View</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {!selectedJob ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500 text-lg">
                Select a job to view applicants
              </p>
            </div>
          ) : (
            <>
              {/* JOB INFO */}
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                  {selectedJob.title}
                </h1>

                <p className="text-gray-600 mt-2">
                  {selectedJob.company} • {selectedJob.location}
                </p>

                <div className="mt-4 inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
                  {applications.length} Applicants
                </div>
              </div>

              {/* NO APPLICANTS */}
              {applications.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                  <p className="text-gray-500 text-lg">No applicants yet</p>
                </div>
              ) : (
                /* TABLE */
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-900 text-white">
                      <tr>
                        <th className="p-4 text-left">Applicant</th>

                        <th className="text-left">Email</th>

                        <th className="text-center">Status</th>

                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {applications.map((app) => (
                        <tr
                          key={app._id}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          {/* NAME */}
                          <td className="p-4 font-medium text-gray-800">
                            {app.applicant?.name}
                          </td>

                          {/* EMAIL */}
                          <td className="text-gray-600">
                            {app.applicant?.email}
                          </td>

                          {/* STATUS */}
                          <td className="text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                                app.status === "applied"
                                  ? "bg-yellow-500"
                                  : app.status === "interview"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>

                          {/* ACTIONS */}
                          <td className="p-4">
                            <div className="flex justify-center items-center gap-2">
                              {/* INTERVIEW */}
                              <button
                                onClick={() =>
                                  updateStatus(app._id, "interview")
                                }
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                                  app.status === "interview"
                                    ? "bg-green-600 text-white"
                                    : "bg-green-100 text-green-700 hover:bg-green-200"
                                }`}
                              >
                                Interview
                              </button>

                              {/* REJECT */}
                              <button
                                onClick={() =>
                                  updateStatus(app._id, "rejected")
                                }
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                                  app.status === "rejected"
                                    ? "bg-red-600 text-white"
                                    : "bg-red-100 text-red-700 hover:bg-red-200"
                                }`}
                              >
                                Reject
                              </button>

                              {/* DELETE */}
                              <button
                                onClick={() => deleteApplicant(app._id)}
                                className="w-9 h-9 ml-5 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-red-600 text-white transition duration-200"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RecruiterDashboard;
