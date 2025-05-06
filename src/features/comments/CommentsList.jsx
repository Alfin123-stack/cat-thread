import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import NoCommentsItem from './NoCommentsItem';

function CommentsList({
  comments,
  user,
  handleUpvoteComment,
  handleDownvoteComment,
  handleNeutralVoteComment,
  formatDate,
  removeHtmlTags,
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-semibold text-blue-400 mb-4">Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            user={user}
            handleUpvoteComment={handleUpvoteComment}
            handleDownvoteComment={handleDownvoteComment}
            handleNeutralVoteComment={handleNeutralVoteComment}
            formatDate={formatDate}
            removeHtmlTags={removeHtmlTags}
          />
        ))
      ) : (
        <NoCommentsItem />
      )}
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      owner: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  handleUpvoteComment: PropTypes.func.isRequired,
  handleDownvoteComment: PropTypes.func.isRequired,
  handleNeutralVoteComment: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  removeHtmlTags: PropTypes.func.isRequired,
};

export default CommentsList;
