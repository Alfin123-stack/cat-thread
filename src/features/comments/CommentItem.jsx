import PropTypes from 'prop-types';
import UserInfoHeader from '../../components/UserInfoHeader';
import VoteButton from '../../components/VoteButton';
import CommentContent from './CommentContent';

function CommentItem({
  comment,
  user,
  handleUpvoteComment,
  handleDownvoteComment,
  handleNeutralVoteComment,
}) {
  const hasUpVoted = comment.upVotesBy.includes(user.id);
  const hasDownVoted = comment.downVotesBy.includes(user.id);

  return (
    <div className="bg-gray-700 p-4 rounded-xl mb-4">
      <UserInfoHeader
        user={comment.owner}
        subtitle={comment.createdAt}
        useDateFormat
        className="mb-2 space-x-3 [&>img]:w-10 [&>img]:h-10"
      />

      <CommentContent content={comment.content} />

      <VoteButton
        upVoteCount={comment.upVotesBy.length}
        downVoteCount={comment.downVotesBy.length}
        hasUpVoted={hasUpVoted}
        hasDownVoted={hasDownVoted}
        onUpVote={() => handleUpvoteComment(comment.id)}
        onDownVote={() => handleDownvoteComment(comment.id)}
        onNeutralVote={() => handleNeutralVoteComment(comment.id)}
        className="mt-2"
      />
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  handleUpvoteComment: PropTypes.func.isRequired,
  handleDownvoteComment: PropTypes.func.isRequired,
  handleNeutralVoteComment: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  removeHtmlTags: PropTypes.func.isRequired,
};

export default CommentItem;
