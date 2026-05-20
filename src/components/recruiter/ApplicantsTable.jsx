import ApplicantRow from "./ApplicantRow";

const ApplicantsTable = ({ applications, updateStatus, deleteApplicant }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
      <table className="w-full min-w-[700px]">
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
            <ApplicantRow
              key={app._id}
              app={app}
              updateStatus={updateStatus}
              deleteApplicant={deleteApplicant}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
