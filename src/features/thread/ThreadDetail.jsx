import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import ThreadCard from './ThreadCard';
import TextAreaField from '../../components/TextAreaField';
import Button from '../../components/Button';
import FormWrapper from '../../components/FormWrapper';
import CommentsList from '../comments/CommentsList';
import { formatDate, removeHtmlTags } from '../../utils/helper';
import useInput from '../../hooks/useInput';
import useDetailThread from '../../hooks/useDetailThread';

function ThreadDetail() {
  const { id } = useParams();
  const [commentContent, setCommentContent] = useInput('');
  const {
    thread,
    threadStatus,
    threadError,
    commentStatus,
    comments,
    user,
    upVoteCount,
    downVoteCount,
    hasUpVoted,
    hasDownVoted,
    postComment,
    upvoteThread,
    downvoteThread,
    neutralVoteThread,
    upvoteComment,
    downvoteComment,
    neutralVoteComment,
  } = useDetailThread(id);

  const handlePostComment = () => {
    if (commentContent.trim()) {
      postComment(commentContent);
      setCommentContent('');
    }
  };

  if (threadStatus === 'loading') return <Spinner />;
  if (threadStatus === 'failed') {
    return (
      <p>
        Error:
        {threadError}
      </p>
    );
  }
  if (!thread) return null;

  return (
    <div className="space-y-6 w-[70%] mx-auto">
      <ThreadCard
        thread={thread}
        upVoteCount={upVoteCount}
        downVoteCount={downVoteCount}
        hasUpVoted={hasUpVoted}
        hasDownVoted={hasDownVoted}
        onUpVote={upvoteThread}
        onDownVote={downvoteThread}
        onNeutralVote={neutralVoteThread}
      />

      <FormWrapper
        className="bg-gray-800 p-6 rounded-xl shadow-lg"
        title="Add a Comment"
      >
        <TextAreaField
          value={commentContent}
          onChange={setCommentContent}
          placeholder="Write your comment here..."
        />
        <Button
          className="mt-4"
          onClick={handlePostComment}
          loading={commentStatus === 'loading'}
        >
          Post Comment
        </Button>
      </FormWrapper>

      <CommentsList
        comments={comments}
        user={user}
        handleUpvoteComment={upvoteComment}
        handleDownvoteComment={downvoteComment}
        handleNeutralVoteComment={neutralVoteComment}
        formatDate={formatDate}
        removeHtmlTags={removeHtmlTags}
      />
    </div>
  );
}

export default ThreadDetail;
