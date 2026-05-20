import { useState, useEffect } from "react";
import API from "../api/axios";

import JobInfo from "../components/recruiter/JobInfo";
import ApplicantsTable from "../components/recruiter/ApplicantsTable";
import EmptyState from "../components/recruiter/EmptyState";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const token = localStorage.getItem("token");

  // ================= FETCH JOBS =================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs/myjobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(res.data);

        // FIRST JOB AUTO SELECT
        if (res.data.length > 0) {
          setSelectedJob(res.data[0]);
          fetchApplicants(res.data[0]._id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  // ================= FETCH APPLICANTS =================
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

  // ================= UPDATE STATUS =================
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

      setApplications((prev) =>
        prev.map((app) => (app._id === appId ? { ...app, status } : app)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ================= DELETE APPLICANT =================
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

      setApplications((prev) => prev.filter((app) => app._id !== appId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* JOB LIST */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Recruiter Dashboard
        </h1>

        <p className="text-gray-500 mt-1">Manage your jobs and applicants</p>
      </div>

      {/* JOB CARDS */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {jobs.map((job) => (
          <button
            key={job._id}
            onClick={() => {
              setSelectedJob(job);
              fetchApplicants(job._id);
            }}
            className={`min-w-[250px] rounded-2xl p-5 text-left transition border ${
              selectedJob?._id === job._id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white border-gray-200 hover:border-blue-400"
            }`}
          >
            <h3 className="font-bold text-lg">{job.title}</h3>

            <p
              className={`text-sm mt-1 ${
                selectedJob?._id === job._id ? "text-blue-100" : "text-gray-500"
              }`}
            >
              {job.company}
            </p>

            <div className="mt-4">
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  selectedJob?._id === job._id ? "bg-white/20" : "bg-gray-100"
                }`}
              >
                {job.location}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      {!selectedJob ? (
        <EmptyState text="Select a job to view applicants" />
      ) : (
        <>
          {/* JOB INFO */}
          <JobInfo selectedJob={selectedJob} applications={applications} />

          {/* APPLICANTS */}
          {applications.length === 0 ? (
            <EmptyState text="No applicants yet" />
          ) : (
            <ApplicantsTable
              applications={applications}
              updateStatus={updateStatus}
              deleteApplicant={deleteApplicant}
            />
          )}
        </>
      )}
    </div>
  );
};

export default RecruiterDashboard;
