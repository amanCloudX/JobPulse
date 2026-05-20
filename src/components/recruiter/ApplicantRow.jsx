import { Trash2 } from "lucide-react";

const ApplicantRow = ({ app, updateStatus, deleteApplicant }) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      {/* NAME */}
      <td className="p-3 md:p-4 font-medium text-gray-800 whitespace-nowrap">
        {app.applicant?.name}
      </td>

      {/* EMAIL */}
      <td className="p-3 md:p-4 text-gray-600 break-all text-sm md:text-base">
        {app.applicant?.email}
      </td>

      {/* STATUS */}
      <td className="p-3 md:p-4 text-center">
        <span
          className={`px-3 py-1 rounded-full text-white text-xs md:text-sm font-medium whitespace-nowrap ${
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
      <td className="p-3 md:p-4">
        <div className="flex flex-wrap justify-center items-center gap-2">
          <button
            onClick={() => updateStatus(app._id, "interview")}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition whitespace-nowrap ${
              app.status === "interview"
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            Interview
          </button>

          <button
            onClick={() => updateStatus(app._id, "rejected")}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition whitespace-nowrap ${
              app.status === "rejected"
                ? "bg-red-600 text-white"
                : "bg-red-100 text-red-700 hover:bg-red-200"
            }`}
          >
            Reject
          </button>

          <button
            onClick={() => deleteApplicant(app._id)}
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-red-600 text-white transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ApplicantRow;
