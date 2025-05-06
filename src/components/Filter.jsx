import PropTypes from 'prop-types';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

function Filter({ filterField, options, onFilterChange }) {
  const [search, setSearch] = useSearchParams();
  const filterParams = search.get(filterField) || options[0].value;

  function handleClick(value) {
    search.set(filterField, value);
    setSearch(search);
    onFilterChange(value); // Memperbarui filter kategori di Home
  }

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md mb-6 w-full sm:w-[70%] mx-auto">
      <h3 className="text-xl font-semibold text-gray-200 mb-4">
        Filter by Category
      </h3>
      <div className="flex flex-wrap gap-2 overflow-x-auto sm:overflow-hidden">
        {options.map((item) => (
          <button
            key={item.value}
            onClick={() => handleClick(item.value)}
            className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition-all duration-300 ${
              item.value === filterParams
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

Filter.propTypes = {
  filterField: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
