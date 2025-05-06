/**
 * skenario test
 *
 * - threadsReducer
 *  - should return the initial state
 *  - should handle clearSelectedThread
 *  - should handle clearComments
 *  - should handle fetchThreads.* (pending, fulfilled, rejected)
 *  - should handle fetchThreadById.* (pending, fulfilled, rejected)
 *  - should handle createNewThread.* (pending, fulfilled, rejected)
 *  - should handle createNewComment.* (fulfilled, rejected)
 *  - should handle voteThreadOptimistic
 *  - should handle voteCommentOptimistic
 */

import { describe, it, expect } from 'vitest';
import threadsReducer, {
  clearSelectedThread,
  clearComments,
  voteThreadOptimistic,
  voteCommentOptimistic,
} from '../threadReducer';
import {
  fetchThreads,
  fetchThreadById,
  createNewThread,
  createNewComment,
} from '../threadThunks';

describe('threadsReducer', () => {
  const initialState = {
    threads: [],
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

  it('should return the initial state', () => {
    expect(threadsReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle clearSelectedThread', () => {
    const prevState = { ...initialState, selectedThread: { id: '1' } };
    const nextState = threadsReducer(prevState, clearSelectedThread());
    expect(nextState.selectedThread).toBeNull();
  });

  it('should handle clearComments', () => {
    const prevState = { ...initialState, comments: [{ id: 'c1' }] };
    const nextState = threadsReducer(prevState, clearComments());
    expect(nextState.comments).toEqual([]);
  });

  // fetchThreads
  it('should handle fetchThreads.pending', () => {
    const nextState = threadsReducer(initialState, {
      type: fetchThreads.pending.type,
    });
    expect(nextState.status).toBe('loading');
  });

  it('should handle fetchThreads.fulfilled', () => {
    const threads = [{ id: 't1', title: 'First Thread' }];
    const nextState = threadsReducer(initialState, {
      type: fetchThreads.fulfilled.type,
      payload: threads,
    });
    expect(nextState.status).toBe('succeeded');
    expect(nextState.threads).toEqual(threads);
  });

  it('should handle fetchThreads.rejected', () => {
    const nextState = threadsReducer(initialState, {
      type: fetchThreads.rejected.type,
      payload: 'Failed to fetch threads',
    });
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe('Failed to fetch threads');
  });

  // fetchThreadById
  it('should handle fetchThreadById.pending', () => {
    const nextState = threadsReducer(initialState, {
      type: fetchThreadById.pending.type,
    });
    expect(nextState.status).toBe('loading');
  });

  it('should handle fetchThreadById.fulfilled', () => {
    const thread = {
      id: 't1',
      upVotesBy: ['user-1'],
      downVotesBy: [],
      comments: [{ id: 'c1', upVotesBy: [], downVotesBy: [] }],
    };
    const nextState = threadsReducer(initialState, {
      type: fetchThreadById.fulfilled.type,
      payload: thread,
    });

    expect(nextState.status).toBe('succeeded');
    expect(nextState.selectedThread).toEqual(thread);
    expect(nextState.upVotes).toEqual(['user-1']);
    expect(nextState.comments).toEqual(thread.comments);
  });

  it('should handle fetchThreadById.rejected', () => {
    const nextState = threadsReducer(initialState, {
      type: fetchThreadById.rejected.type,
      payload: 'Thread not found',
    });
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe('Thread not found');
  });

  // createNewThread
  it('should handle createNewThread.pending', () => {
    const nextState = threadsReducer(initialState, {
      type: createNewThread.pending.type,
    });
    expect(nextState.status).toBe('loading');
  });

  it('should handle createNewThread.fulfilled', () => {
    const newThread = { id: 't2', title: 'New Thread' };
    const nextState = threadsReducer(initialState, {
      type: createNewThread.fulfilled.type,
      payload: newThread,
    });
    expect(nextState.status).toBe('succeeded');
    expect(nextState.threads).toContainEqual(newThread);
    expect(nextState.thread).toEqual(newThread);
  });

  it('should handle createNewThread.rejected', () => {
    const nextState = threadsReducer(initialState, {
      type: createNewThread.rejected.type,
      payload: 'Failed to create thread',
    });
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe('Failed to create thread');
  });

  // createNewComment
  it('should handle createNewComment.fulfilled', () => {
    const comment = {
      id: 'c1',
      content: 'Hello world',
      upVotesBy: [],
      downVotesBy: [],
    };
    const nextState = threadsReducer(initialState, {
      type: createNewComment.fulfilled.type,
      payload: comment,
    });
    expect(nextState.status).toBe('succeeded');
    expect(nextState.comments).toContainEqual(comment);
  });

  it('should handle createNewComment.rejected', () => {
    const nextState = threadsReducer(initialState, {
      type: createNewComment.rejected.type,
      payload: 'Failed to comment',
    });
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe('Failed to comment');
  });

  // voteThreadOptimistic
  it('should handle voteThreadOptimistic for upvote', () => {
    const prevState = { ...initialState, upVotes: [], downVotes: ['user-1'] };
    const nextState = threadsReducer(
      prevState,
      voteThreadOptimistic({ userId: 'user-1', type: 'up' }),
    );
    expect(nextState.upVotes).toContain('user-1');
    expect(nextState.downVotes).not.toContain('user-1');
  });

  // voteCommentOptimistic
  it('should handle voteCommentOptimistic for downvote', () => {
    const comment = { id: 'c1', upVotesBy: ['user-1'], downVotesBy: [] };
    const prevState = { ...initialState, comments: [comment] };

    const nextState = threadsReducer(
      prevState,
      voteCommentOptimistic({ commentId: 'c1', userId: 'user-1', type: 'down' }),
    );

    const updatedComment = nextState.comments.find((c) => c.id === 'c1');
    expect(updatedComment.downVotesBy).toContain('user-1');
    expect(updatedComment.upVotesBy).not.toContain('user-1');
  });
});
