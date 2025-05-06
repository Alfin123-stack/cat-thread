import { createSlice } from '@reduxjs/toolkit';
import {
  createNewComment,
  createNewThread,
  downvoteCommentAction,
  downvoteThreadAction,
  fetchThreadById,
  fetchThreads,
  neutralVoteCommentAction,
  neutralVoteThreadAction,
  upvoteCommentAction,
  upvoteThreadAction,
} from './threadThunks';

const initialState = {
  selectedThread: null,
  thread: null,
  comments: [],
  status: 'idle',
  error: null,
  upVotes: [],
  downVotes: [],
  commentUpVotes: [],
  commentDownVotes: [],
};

const setError = (state, action) => {
  state.status = 'failed';
  state.error = action.payload || action.error?.message;
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    clearSelectedThread: (state) => {
      state.selectedThread = null;
    },
    clearComments: (state) => {
      state.comments = [];
    },
    voteCommentOptimistic: (state, action) => {
      const { commentId, userId, type } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);

      if (!comment) return;

      if (type === 'up') {
        if (!comment.upVotesBy.includes(userId)) {
          comment.upVotesBy.push(userId);
          comment.downVotesBy = comment.downVotesBy.filter(
            (id) => id !== userId,
          );
        }
      } else if (type === 'down') {
        if (!comment.downVotesBy.includes(userId)) {
          comment.downVotesBy.push(userId);
          comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
        }
      } else if (type === 'neutral') {
        comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
        comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
      }
    },
    voteThreadOptimistic: (state, action) => {
      const { userId, type } = action.payload;
      if (type === 'up') {
        if (!state.upVotes.includes(userId)) {
          state.upVotes.push(userId);
          state.downVotes = state.downVotes.filter((id) => id !== userId);
        }
      } else if (type === 'down') {
        if (!state.downVotes.includes(userId)) {
          state.downVotes.push(userId);
          state.upVotes = state.upVotes.filter((id) => id !== userId);
        }
      } else if (type === 'neutral') {
        state.upVotes = state.upVotes.filter((id) => id !== userId);
        state.downVotes = state.downVotes.filter((id) => id !== userId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.threads = action.payload;
      })
      .addCase(fetchThreads.rejected, setError)

      .addCase(fetchThreadById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchThreadById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedThread = action.payload;
        state.upVotes = action.payload.upVotesBy || [];
        state.downVotes = action.payload.downVotesBy || [];
        state.comments = action.payload.comments || [];
        state.commentUpVotes = action.payload.comments?.upVotesBy || [];
        state.commentDownVotes = action.payload.comments?.downVotesBy || [];
      })
      .addCase(fetchThreadById.rejected, setError)

      .addCase(createNewThread.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewThread.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.threads.push(action.payload);
        state.thread = action.payload;
      })
      .addCase(createNewThread.rejected, setError)

      .addCase(createNewComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments.push(action.payload);
      })
      .addCase(createNewComment.rejected, setError)

      .addMatcher(
        (action) => [
          upvoteThreadAction.rejected.type,
          downvoteThreadAction.rejected.type,
          neutralVoteThreadAction.rejected.type,
          upvoteCommentAction.rejected.type,
          downvoteCommentAction.rejected.type,
          neutralVoteCommentAction.rejected.type,
        ].includes(action.type),
        setError,
      );
  },
});

export const {
  clearSelectedThread,
  clearComments,
  voteThreadOptimistic,
  voteCommentOptimistic,
} = threadsSlice.actions;

export default threadsSlice.reducer;
