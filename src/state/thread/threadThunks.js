import { createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar'; // ⬅️ Tambahkan ini
import {
  getAllThreads,
  getThread,
  createThread,
  createComment,
  upvoteThread,
  downvoteThread,
  neutralVoteThread,
  upvoteComment,
  downvoteComment,
  neutralVoteComment,
} from '../../utils/api';

// COMMENT VOTES
export const upvoteCommentAction = createAsyncThunk(
  'comments/upvoteComment',
  async ({ threadId, commentId }, { rejectWithValue, dispatch }) => {
    dispatch(showLoading());
    try {
      const vote = await upvoteComment(threadId, commentId);
      if (!vote) throw new Error('Failed to upvote comment');
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const downvoteCommentAction = createAsyncThunk(
  'comments/downvoteComment',
  async ({ threadId, commentId }, { rejectWithValue, dispatch }) => {
    dispatch(showLoading());
    try {
      const vote = await downvoteComment(threadId, commentId);
      if (!vote) throw new Error('Failed to downvote comment');
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const neutralVoteCommentAction = createAsyncThunk(
  'comments/neutralVoteComment',
  async ({ threadId, commentId }, { rejectWithValue, dispatch }) => {
    dispatch(showLoading());
    try {
      const vote = await neutralVoteComment(threadId, commentId);
      if (!vote) throw new Error('Failed to neutralize comment vote');
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

// FETCH ALL THREADS
export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      const threads = await getAllThreads();
      return threads;
    } finally {
      dispatch(hideLoading());
    }
  },
);

// FETCH THREAD BY ID
export const fetchThreadById = createAsyncThunk(
  'threads/fetchThreadById',
  async (id, { dispatch }) => {
    dispatch(showLoading());
    try {
      const thread = await getThread(id);
      return thread;
    } finally {
      dispatch(hideLoading());
    }
  },
);

// CREATE NEW THREAD
export const createNewThread = createAsyncThunk(
  'threads/createThread',
  async ({ title, body, category }, { rejectWithValue, dispatch }) => {
    dispatch(showLoading());
    try {
      const newThread = await createThread({ title, body, category });
      if (!newThread) throw new Error('Failed to create thread');
      return newThread;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

// CREATE NEW COMMENT
export const createNewComment = createAsyncThunk(
  'comments/createComment',
  async ({ threadId, content }, { rejectWithValue, dispatch }) => {
    dispatch(showLoading());
    try {
      const newComment = await createComment(threadId, { content });
      if (!newComment) throw new Error('Failed to create comment');
      return newComment;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

// THREAD VOTES
export const upvoteThreadAction = createAsyncThunk(
  'threads/upvoteThread',
  async (threadId, { rejectWithValue, dispatch }) => {
    dispatch(showLoading());
    try {
      const vote = await upvoteThread(threadId);
      if (!vote) throw new Error('Failed to upvote thread');
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const downvoteThreadAction = createAsyncThunk(
  'threads/downvoteThread',
  async (threadId, { rejectWithValue, dispatch }) => {
    dispatch(showLoading());
    try {
      const vote = await downvoteThread(threadId);
      if (!vote) throw new Error('Failed to downvote thread');
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const neutralVoteThreadAction = createAsyncThunk(
  'threads/neutralVoteThread',
  async (threadId, { rejectWithValue, dispatch }) => {
    dispatch(showLoading());
    try {
      const vote = await neutralVoteThread(threadId);
      if (!vote) throw new Error('Failed to neutralize thread vote');
      return vote;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);
