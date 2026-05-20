const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <p className="mt-4 text-gray-500 text-lg">{text}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
