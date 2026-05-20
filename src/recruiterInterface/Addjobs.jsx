import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import FormInput from "../components/form/FormInput";
import FormTextarea from "../components/form/FormTextarea";
import PrimaryButton from "../components/form/PrimaryButton";

const Addjobs = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const token = localStorage.getItem("token");

      await API.post("/jobs/job", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job Created Successfully 🚀");

      navigate("/recruiter/dashboard");
    } catch (error) {
      console.log(error);

      alert("Error creating job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-gray-100 to-indigo-100 min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 md:px-8 py-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">Create New Job</h1>

            <p className="text-blue-100 text-sm mt-2">
              Post opportunities and hire top talent 🚀
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={submitHandler} className="p-5 md:p-8 space-y-6">
            {/* TITLE */}
            <FormInput
              label="Job Title"
              name="title"
              placeholder="Frontend Developer"
              value={form.title}
              onChange={handleChange}
            />

            {/* COMPANY + LOCATION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Company"
                name="company"
                placeholder="Google"
                value={form.company}
                onChange={handleChange}
              />

              <FormInput
                label="Location"
                name="location"
                placeholder="Bangalore"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            {/* SALARY */}
            <FormInput
              label="Salary (₹ INR)"
              type="number"
              name="salary"
              placeholder="600000"
              value={form.salary}
              onChange={handleChange}
            />

            {/* DESCRIPTION */}
            <FormTextarea
              label="Job Description"
              name="description"
              placeholder="Describe responsibilities, requirements, skills..."
              value={form.description}
              onChange={handleChange}
            />

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <PrimaryButton text="Create Job" loading={loading} />

              <button
                type="button"
                onClick={() => navigate("/recruiter/dashboard")}
                className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-3 md:py-4 rounded-2xl font-semibold transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addjobs;
