import PropTypes from 'prop-types';
import { HiOutlineThumbUp, HiOutlineThumbDown } from 'react-icons/hi';

function VoteButton({
  upVoteCount,
  downVoteCount,
  hasUpVoted,
  hasDownVoted,
  onUpVote,
  onDownVote,
  onNeutralVote,
  className = '',
}) {
  return (
    <div className={`flex space-x-4 text-gray-400 ${className}`} data-cy="vote-buttons">
      <div
        onClick={hasUpVoted ? onNeutralVote : onUpVote}
        className={`flex items-center space-x-2 cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out ${
          hasUpVoted ? 'text-blue-500' : 'text-gray-400'
        }`}
      >
        <HiOutlineThumbUp size={20} />
        <p>
          {upVoteCount}
          {' '}
          Upvotes
        </p>
      </div>
      <div
        onClick={hasDownVoted ? onNeutralVote : onDownVote}
        className={`flex items-center space-x-2 cursor-pointer hover:text-red-500 transition-all duration-300 ease-in-out ${
          hasDownVoted ? 'text-red-500' : 'text-gray-400'
        }`}
      >
        <HiOutlineThumbDown size={20} />
        <p>
          {downVoteCount}
          {' '}
          Downvotes
        </p>
      </div>
    </div>
  );
}

VoteButton.propTypes = {
  upVoteCount: PropTypes.number.isRequired,
  downVoteCount: PropTypes.number.isRequired,
  hasUpVoted: PropTypes.bool.isRequired,
  hasDownVoted: PropTypes.bool.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralVote: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default VoteButton;
