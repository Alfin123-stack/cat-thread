/**
 * skenario test
 *
 * - threadsThunks
 *  - fetchThreads
 *    - should return threads on success
 *  - fetchThreadById
 *    - should return thread data on success
 *  - createNewThread
 *    - should return new thread data on success
 *    - should handle error
 *  - createNewComment
 *    - should return comment data on success
 *    - should handle error
 *  - Thread voting actions
 *    - upvoteThreadAction success
 *    - downvoteThreadAction failure
 *    - neutralVoteThreadAction success
 *  - Comment voting actions
 *    - upvoteCommentAction success
 *    - downvoteCommentAction failure
 *    - neutralVoteCommentAction success
 */

import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import * as api from '../../../utils/api';

import {
  fetchThreads,
  fetchThreadById,
  createNewThread,
  createNewComment,
  upvoteThreadAction,
  downvoteThreadAction,
  neutralVoteThreadAction,
  upvoteCommentAction,
  downvoteCommentAction,
  neutralVoteCommentAction,
} from '../threadThunks';

vi.mock('../../../utils/api');

describe('threadsThunks', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  const rejectHelper = { rejectWithValue: (v) => v };

  describe('fetchThreads', () => {
    it('should return threads on success', async () => {
      const threads = [{ id: 'thread-1' }];
      api.getAllThreads.mockResolvedValue(threads);

      const thunk = fetchThreads();
      const result = await thunk(dispatch, () => {}, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getAllThreads).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual(threads);
    });
  });

  describe('fetchThreadById', () => {
    it('should return thread data on success', async () => {
      const thread = { id: 'thread-1' };
      api.getThread.mockResolvedValue(thread);

      const thunk = fetchThreadById('thread-1');
      const result = await thunk(dispatch, () => {}, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getThread).toHaveBeenCalledWith('thread-1');
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual(thread);
    });
  });

  describe('createNewThread', () => {
    it('should return new thread data on success', async () => {
      const thread = { id: 'thread-1' };
      api.createThread.mockResolvedValue(thread);

      const thunk = createNewThread({
        title: 'test',
        body: 'desc',
        category: 'cat',
      });
      const result = await thunk(dispatch, () => {}, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.createThread).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual(thread);
    });

    it('should handle error', async () => {
      api.createThread.mockResolvedValue(null);

      const thunk = createNewThread({ title: 'x', body: 'y', category: 'z' });
      const result = await thunk(dispatch, () => {}, rejectHelper);

      expect(result.payload).toBe('Failed to create thread');
    });
  });

  describe('createNewComment', () => {
    it('should return comment data on success', async () => {
      const comment = { id: 'comment-1' };
      api.createComment.mockResolvedValue(comment);

      const thunk = createNewComment({ threadId: 't1', content: 'abc' });
      const result = await thunk(dispatch, () => {}, undefined);

      expect(api.createComment).toHaveBeenCalledWith('t1', { content: 'abc' });
      expect(result.payload).toEqual(comment);
    });

    it('should handle error', async () => {
      api.createComment.mockResolvedValue(null);

      const thunk = createNewComment({ threadId: 't1', content: 'abc' });
      const result = await thunk(dispatch, () => {}, rejectHelper);

      expect(result.payload).toBe('Failed to create comment');
    });
  });

  describe('Thread voting actions', () => {
    it('upvoteThreadAction success', async () => {
      const vote = { upVotesBy: ['user-1'] };
      api.upvoteThread.mockResolvedValue(vote);

      const thunk = upvoteThreadAction('thread-1');
      const result = await thunk(dispatch, () => {}, undefined);

      expect(api.upvoteThread).toHaveBeenCalledWith('thread-1');
      expect(result.payload).toEqual(vote);
    });

    it('downvoteThreadAction failure', async () => {
      api.downvoteThread.mockResolvedValue(null);

      const thunk = downvoteThreadAction('thread-1');
      const result = await thunk(dispatch, () => {}, rejectHelper);

      expect(result.payload).toBe('Failed to downvote thread');
    });

    it('neutralVoteThreadAction success', async () => {
      const vote = { upVotesBy: [] };
      api.neutralVoteThread.mockResolvedValue(vote);

      const thunk = neutralVoteThreadAction('thread-1');
      const result = await thunk(dispatch, () => {}, undefined);

      expect(result.payload).toEqual(vote);
    });
  });

  describe('Comment voting actions', () => {
    it('upvoteCommentAction success', async () => {
      const vote = { upVotesBy: ['user-1'] };
      api.upvoteComment.mockResolvedValue(vote);

      const thunk = upvoteCommentAction({ threadId: 't1', commentId: 'c1' });
      const result = await thunk(dispatch, () => {}, undefined);

      expect(result.payload).toEqual(vote);
    });

    it('downvoteCommentAction failure', async () => {
      api.downvoteComment.mockResolvedValue(null);

      const thunk = downvoteCommentAction({ threadId: 't1', commentId: 'c1' });
      const result = await thunk(dispatch, () => {}, rejectHelper);

      expect(result.payload).toBe('Failed to downvote comment');
    });

    it('neutralVoteCommentAction success', async () => {
      const vote = { upVotesBy: [] };
      api.neutralVoteComment.mockResolvedValue(vote);

      const thunk = neutralVoteCommentAction({
        threadId: 't1',
        commentId: 'c1',
      });
      const result = await thunk(dispatch, () => {}, undefined);

      expect(result.payload).toEqual(vote);
    });
  });
});
