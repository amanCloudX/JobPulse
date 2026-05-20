import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/recruiter/EmptyState";
import LoadingSpinner from "../components/common/LoadingSpinner";

import JobCard from "../components/jobs/JobCard";

const MyJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ================= DELETE JOB =================
  const deleteJob = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this job?",
      );

      if (!confirmDelete) return;

      await API.delete(`/jobs/job/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // UI UPDATE
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-gray-100 to-indigo-100 min-h-screen p-4 md:p-6">
      {/* ================= PAGE HEADER ================= */}
      <PageHeader
        title="My Jobs"
        subtitle="Manage your posted jobs"
        buttonText="+ Add New Job"
        buttonAction={() => navigate("/add-job")}
      />

      {/* ================= LOADING ================= */}
      {loading ? (
        <LoadingSpinner text="Loading jobs..." />
      ) : jobs.length === 0 ? (
        /* ================= EMPTY STATE ================= */
        <EmptyState
          title="No Jobs Posted Yet"
          subtitle="Start posting jobs to attract candidates"
          buttonText="Create Job"
          buttonAction={() => navigate("/add-job")}
        />
      ) : (
        /* ================= JOB GRID ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              navigate={navigate}
              deleteJob={deleteJob}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
