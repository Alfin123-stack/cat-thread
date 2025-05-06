import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchThreadById,
  createNewComment,
  upvoteThreadAction,
  downvoteThreadAction,
  neutralVoteThreadAction,
  upvoteCommentAction,
  downvoteCommentAction,
  neutralVoteCommentAction,
} from '../state/thread/threadThunks';
import {
  voteCommentOptimistic,
  voteThreadOptimistic,
} from '../state/thread/threadReducer';
import {
  selectComments,
  selectCommentsStatus,
  selectDownVoteCount,
  selectDownVotes,
  selectSelectedThread,
  selectThreadsError,
  selectThreadsStatus,
  selectUpVoteCount,
  selectUpVotes,
} from '../state/thread/threadSelectors';
import { selectCurrentUser } from '../state/auth/authSelectors';
import { hasVoted } from '../utils/helper';
import { fetchUserProfile } from '../state/auth/authThunks';

function useDetailThread(threadId) {
  const dispatch = useDispatch();

  const thread = useSelector(selectSelectedThread);
  const threadStatus = useSelector(selectThreadsStatus);
  const threadError = useSelector(selectThreadsError);
  const commentStatus = useSelector(selectCommentsStatus);
  const comments = useSelector(selectComments);
  const upVotes = useSelector(selectUpVotes);
  const downVotes = useSelector(selectDownVotes);
  const user = useSelector(selectCurrentUser);
  const upVoteCount = useSelector(selectUpVoteCount);
  const downVoteCount = useSelector(selectDownVoteCount);

  const hasUpVoted = hasVoted(upVotes, user.id);
  const hasDownVoted = hasVoted(downVotes, user.id);

  useEffect(() => {
    dispatch(fetchThreadById(threadId));
    dispatch(fetchUserProfile());
  }, [dispatch, threadId]);

  const postComment = (content) => {
    dispatch(createNewComment({ threadId, content }));
  };

  const upvoteThread = () => {
    if (hasDownVoted) dispatch(neutralVoteThreadAction(threadId));
    dispatch(
      voteThreadOptimistic({ id: threadId, userId: user.id, type: 'up' }),
    );
    dispatch(upvoteThreadAction(threadId));
  };

  const downvoteThread = () => {
    if (hasUpVoted) dispatch(neutralVoteThreadAction(threadId));
    dispatch(
      voteThreadOptimistic({ id: threadId, userId: user.id, type: 'down' }),
    );
    dispatch(downvoteThreadAction(threadId));
  };

  const neutralVoteThread = () => {
    dispatch(
      voteThreadOptimistic({ id: threadId, userId: user.id, type: 'neutral' }),
    );
    dispatch(neutralVoteThreadAction(threadId));
  };

  const upvoteComment = (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment.downVotesBy.includes(user.id)) {
      dispatch(
        voteCommentOptimistic({ commentId, userId: user.id, type: 'neutral' }),
      );
      dispatch(neutralVoteCommentAction({ threadId, commentId }));
    }
    dispatch(voteCommentOptimistic({ commentId, userId: user.id, type: 'up' }));
    dispatch(upvoteCommentAction({ threadId, commentId }));
  };

  const downvoteComment = (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment.upVotesBy.includes(user.id)) {
      dispatch(
        voteCommentOptimistic({ commentId, userId: user.id, type: 'neutral' }),
      );
      dispatch(neutralVoteCommentAction({ threadId, commentId }));
    }
    dispatch(
      voteCommentOptimistic({ commentId, userId: user.id, type: 'down' }),
    );
    dispatch(downvoteCommentAction({ threadId, commentId }));
  };

  const neutralVoteComment = (commentId) => {
    dispatch(
      voteCommentOptimistic({ commentId, userId: user.id, type: 'neutral' }),
    );
    dispatch(neutralVoteCommentAction({ threadId, commentId }));
  };

  return {
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
  };
}

export default useDetailThread;
