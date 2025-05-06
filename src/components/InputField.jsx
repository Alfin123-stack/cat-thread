import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

function InputFieldComponent(
  {
    id,
    label,
    type = 'text',
    placeholder,
    required = false,
    ...props
  },
  ref,
) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block font-medium text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        ref={ref}
        required={required}
        className="w-full px-4 py-2 bg-gray-700 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        {...props}
      />
    </div>
  );
}

const InputField = forwardRef(InputFieldComponent);

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default InputField;
