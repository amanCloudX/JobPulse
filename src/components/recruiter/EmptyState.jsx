const EmptyState = ({ text }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-10 text-center">
      <p className="text-gray-500 text-lg">{text}</p>
    </div>
  );
};

export default EmptyState;
