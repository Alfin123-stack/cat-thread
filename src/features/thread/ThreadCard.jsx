import PropTypes from 'prop-types';
import { HiOutlineFolder } from 'react-icons/hi';
import ThreadContent from './ThreadContent';
import IconText from '../../components/IconText';
import ThreadMetaInfo from './ThreadMetaInfo';
import TextLink from '../../components/TextLink';
import UserInfoHeader from '../../components/UserInfoHeader';
import VoteButton from '../../components/VoteButton';

function ThreadCard({
  thread,
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
    <div className={`bg-gray-800 p-6 rounded-xl shadow-lg ${className}`} data-cy="thread-card">
      <UserInfoHeader
        user={thread.owner}
        subtitle={thread.createdAt}
        useDateFormat
      />
      {!thread.comments ? (
        <ThreadContent
          title={thread.title}
          body={thread.body}
          titleClassName="text-2xl font-semibold text-blue-400 mb-2"
          bodyLimit={50}
          showEllipsis
        />
      ) : (
        <ThreadContent title={thread.title} body={thread.body} />
      )}
      {thread.comments ? (
        <IconText icon={HiOutlineFolder} text={thread.category} />
      ) : (
        <ThreadMetaInfo
          totalVotes={thread.upVotesBy.length + thread.downVotesBy.length}
          category={thread.category}
          totalComments={thread.totalComments}
        />
      )}
      {thread.comments && (
        <VoteButton
          upVoteCount={upVoteCount}
          downVoteCount={downVoteCount}
          hasUpVoted={hasUpVoted}
          hasDownVoted={hasDownVoted}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onNeutralVote={onNeutralVote}
          className="mt-4"
        />
      )}

      {!thread.comments && (
        <TextLink
          to={`/thread/${thread.id}`}
          linkText="View Details"
          align="right"
          text=""
          linkClassName="text-blue-400 hover:underline text-sm"
        />
      )}
    </div>
  );
}

ThreadCard.propTypes = {
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
  upVoteCount: PropTypes.number,
  downVoteCount: PropTypes.number,
  hasUpVoted: PropTypes.bool,
  hasDownVoted: PropTypes.bool,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  onNeutralVote: PropTypes.func,
  className: PropTypes.string,
};

export default ThreadCard;
