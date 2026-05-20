const FormTextarea = ({
  label,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        rows="5"
        placeholder={placeholder}
        onChange={onChange}
        className="w-full p-3 md:p-4 border border-gray-300 rounded-2xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
      />
    </div>
  );
};

export default FormTextarea;