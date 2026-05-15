import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Addjobs = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await API.post("/jobs/job", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job Created Successfully");
      navigate("/recruiter/dashboard");
    } catch (error) {
      console.log(error);
      alert("Error creating job");
    }
  };
  return (
    <>
      <div className="h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-indigo-100 flex items-center justify-center px-4 overflow-hidden">
  
  {/* MAIN CARD */}
  <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">
    
    {/* HEADER */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
      <h1 className="text-2xl font-bold">
        Create New Job
      </h1>

      <p className="text-blue-100 text-sm mt-1">
        Post a new opportunity for candidates
      </p>
    </div>

    {/* FORM */}
    <form
      onSubmit={submitHandler}
      className="p-6 space-y-4"
    >
      {/* JOB TITLE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Title
        </label>

        <input
          type="text"
          name="title"
          placeholder="Full Stack Developer"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      {/* COMPANY + LOCATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* COMPANY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>

          <input
            type="text"
            name="company"
            placeholder="Microsoft"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>

          <input
            type="text"
            name="location"
            placeholder="USA"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>
      </div>

      {/* SALARY */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Salary
        </label>

        <input
          type="number"
          name="salary"
          placeholder="120000"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>

        <textarea
          name="description"
          rows="4"
          placeholder="Describe the role and requirements..."
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-200 shadow-md"
      >
        Create Job
      </button>
    </form>
  </div>
</div>    </>
  );
};

export default Addjobs;
