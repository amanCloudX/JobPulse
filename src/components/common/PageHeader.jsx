const PageHeader = ({ title, subtitle, buttonText, buttonAction }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {title}
        </h1>

        <p className="text-gray-500 mt-1">{subtitle}</p>
      </div>

      <button
        onClick={buttonAction}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-5 py-3 rounded-2xl font-medium shadow-lg transition"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PageHeader;
