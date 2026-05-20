import JobActions from "./JobActions";

const JobCard = ({ job, navigate, deleteJob }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300 border border-gray-100 hover:-translate-y-1">
      {/* TOP */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>

          <p className="text-gray-500 mt-1">{job.company}</p>
        </div>

        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap">
          Active
        </span>
      </div>

      {/* INFO */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2 text-gray-600">
          <span>📍</span>

          <p>{job.location}</p>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <span>💰</span>

          <p>₹{job.salary}</p>
        </div>

        <div className="flex items-start gap-2 text-gray-600">
          <span>📝</span>

          <p className="line-clamp-3">{job.description}</p>
        </div>
      </div>

      {/* ACTIONS */}
      <JobActions job={job} navigate={navigate} deleteJob={deleteJob} />
    </div>
  );
};

export default JobCard;
