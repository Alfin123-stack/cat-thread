import PropTypes from 'prop-types';

function IconText({
  icon: Icon,
  text,
  iconSize = 20,
  iconClassName = 'text-blue-400',
  textClassName = 'text-gray-500',
  containerClassName = 'flex items-center space-x-2',
}) {
  return (
    <div className={containerClassName} data-cy="thread-category">
      {Icon && <Icon className={iconClassName} size={iconSize} />}
      <p className={textClassName}>{text}</p>
    </div>
  );
}

IconText.propTypes = {
  icon: PropTypes.elementType,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  iconSize: PropTypes.number,
  iconClassName: PropTypes.string,
  textClassName: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default IconText;
