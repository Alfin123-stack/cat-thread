import React from 'react';
import PropTypes from 'prop-types';
import ThreadCard from './ThreadCard'; // Reusing the ThreadCard component

function ThreadListItem({ thread }) {
  return (
    <ThreadCard
      thread={thread}
      className="hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
    />
  );
}

ThreadListItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number,
    comments: PropTypes.array,
  }).isRequired,
};

export default ThreadListItem;
