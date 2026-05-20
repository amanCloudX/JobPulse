const PrimaryButton = ({ text, loading, type = "submit" }) => {
  return (
    <button
      type={type}
      disabled={loading}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white py-3 md:py-4 rounded-2xl font-semibold transition duration-200 shadow-lg"
    >
      {loading ? "Please wait..." : text}
    </button>
  );
};

export default PrimaryButton;
