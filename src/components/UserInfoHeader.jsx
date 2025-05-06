import PropTypes from 'prop-types';
import { formatDate } from '../utils/helper';

function UserInfoHeader({
  user,
  subtitle,
  useDateFormat = false,
  className = '',
}) {
  return (
    <div className={`flex items-center space-x-4 mb-4 ${className}`}>
      <img
        src={user?.avatar}
        alt={user?.name || 'User Avatar'}
        className="w-12 h-12 rounded-full border-2 border-blue-500"
      />
      <div>
        <p className="font-semibold text-gray-200">{user?.name}</p>
        <p className="text-sm text-gray-400">
          {useDateFormat && subtitle ? formatDate(subtitle) : subtitle}
        </p>
      </div>
    </div>
  );
}

UserInfoHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  subtitle: PropTypes.string, // Can be email or createdAt
  useDateFormat: PropTypes.bool, // If true, format subtitle as date
  className: PropTypes.string,
};

export default UserInfoHeader;
