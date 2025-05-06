/* eslint-disable no-unused-vars */
// components/ThreadContent.js
import PropTypes from 'prop-types';
import { removeHtmlTags } from '../../utils/helper';

function ThreadContent({
  title,
  body,
  titleClassName = 'text-3xl font-semibold text-blue-400 mb-2',
  bodyClassName = 'text-gray-300 text-sm mb-4',
  bodyLimit,
  showEllipsis = false,
  headingTag: HeadingTag = 'h2',
}) {
  const cleanBody = removeHtmlTags(body);
  const limitedBody = bodyLimit ? cleanBody.slice(0, bodyLimit) : cleanBody;

  return (
    <>
      <HeadingTag className={titleClassName}>{title}</HeadingTag>
      <p className={bodyClassName}>
        {limitedBody}
        {bodyLimit && showEllipsis && cleanBody.length > bodyLimit && '...'}
      </p>
    </>
  );
}

ThreadContent.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  titleClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  bodyLimit: PropTypes.number,
  showEllipsis: PropTypes.bool,
  headingTag: PropTypes.elementType,
};

export default ThreadContent;
