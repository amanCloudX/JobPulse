const EmptyState = ({ title, subtitle, buttonText, buttonAction }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 md:p-14 text-center">
      <h2 className="text-2xl font-bold text-gray-700">{title}</h2>

      <p className="text-gray-500 mt-3">{subtitle}</p>

      {buttonText && (
        <button
          onClick={buttonAction}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition shadow-md"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
