// components/PageHeader.js
import React from 'react';
import PropTypes from 'prop-types';

function PageHeader({ title, className = '' }) {
  return (
    <h1
      className={`text-4xl font-bold text-center text-blue-400 mb-8 ${className}`}
    >
      {title}
    </h1>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default PageHeader;
