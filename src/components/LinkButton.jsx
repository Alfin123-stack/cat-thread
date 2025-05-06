import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function LinkButton({ to, icon: Icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive
        ? 'flex items-center text-base text-blue-500 w-full bg-gray-700 p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105'
        : 'flex items-center text-base text-gray-300 w-full hover:text-blue-500 hover:bg-gray-700 hover:scale-105 transition-all duration-300 ease-in-out p-2 rounded-lg')}
    >
      {Icon && <Icon className="mr-3 text-xl" />}
      <span>{text}</span>
    </NavLink>
  );
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType, // karena Icon adalah komponen, bukan elemen
  text: PropTypes.string.isRequired,
};

export default LinkButton;
