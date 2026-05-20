const JobActions = ({ job, navigate, deleteJob }) => {
  return (
    <div className="mt-6 flex gap-3">
      {/* EDIT */}
      <button
        onClick={() => navigate(`/edit-job/${job._id}`)}
        className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-2.5 rounded-2xl font-medium transition"
      >
        Edit
      </button>

      {/* DELETE */}
      <button
        onClick={() => deleteJob(job._id)}
        className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2.5 rounded-2xl font-medium transition"
      >
        Delete
      </button>
    </div>
  );
};

export default JobActions;
