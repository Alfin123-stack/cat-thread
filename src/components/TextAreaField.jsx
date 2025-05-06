import PropTypes from 'prop-types';

function TextAreaField({
  label, value, onChange, placeholder, rows = 4,
}) {
  return (
    <div className="w-full">
      {label && (
      <label className="block text-medium font-medium text-gray-300 mb-2">
        {label}
      </label>
      )}
      <textarea
        className="w-full p-4 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

TextAreaField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
};

export default TextAreaField;
