import React from 'react';
import PropTypes from 'prop-types';

function ProfileInfo({ label, value }) {
  return (
    <div className="flex gap-x-5 items-center text-gray-400">
      <p className="font-medium">
        {label}
        {' '}
        :
      </p>
      <p className="text-gray-300">{value}</p>
    </div>
  );
}

ProfileInfo.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ProfileInfo;
