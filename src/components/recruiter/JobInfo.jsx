const JobInfo = ({ selectedJob, applications }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 md:p-6 mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        {selectedJob.title}
      </h1>

      <p className="text-gray-600 mt-2 text-sm md:text-base">
        {selectedJob.company} • {selectedJob.location}
      </p>

      <div className="mt-4 inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
        {applications.length} Applicants
      </div>
    </div>
  );
};

export default JobInfo;
