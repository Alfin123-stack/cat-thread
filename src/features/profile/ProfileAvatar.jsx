import React from 'react';
import PropTypes from 'prop-types';

const avatarPlaceholder = 'https://www.w3schools.com/w3images/avatar2.png';

function ProfileAvatar({
  avatar, name, email, date,
}) {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <img
        src={avatar || avatarPlaceholder}
        alt={name}
        className="w-24 h-24 rounded-full border-2 border-blue-500"
      />
      <div>
        <p className="text-2xl font-semibold text-gray-200">{name}</p>
        <p className="text-sm text-gray-400">{email}</p>
        <p className="text-sm text-gray-400">{date}</p>
      </div>
    </div>
  );
}

ProfileAvatar.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default ProfileAvatar;
