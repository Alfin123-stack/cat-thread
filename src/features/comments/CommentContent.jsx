import PropTypes from 'prop-types';
import { removeHtmlTags } from '../../utils/helper';

function CommentContent({ content, className = '' }) {
  return (
    <p className={`text-gray-300 ${className}`}>{removeHtmlTags(content)}</p>
  );
}

CommentContent.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CommentContent;
