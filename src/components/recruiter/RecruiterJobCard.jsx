const JobCard = ({ job, selectedJob, setSelectedJob, fetchApplicants }) => {
  return (
    <div
      onClick={() => {
        setSelectedJob(job);
        fetchApplicants(job._id);
      }}
      className={`p-4 rounded-2xl cursor-pointer transition border ${
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
  );
};

export default JobCard;
