import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineUser } from 'react-icons/hi';

function ProfileSection({ children }) {
  return (
    <section className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <HiOutlineUser className="text-blue-400" size={20} />
        <p className="font-semibold">User Profile</p>
      </div>
      {children}
    </section>
  );
}

ProfileSection.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProfileSection;
