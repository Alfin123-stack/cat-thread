import { createSelector } from '@reduxjs/toolkit';
import { getVotesCount, sortByCreatedAt } from '../../utils/helper';

// Refactored selectors

const rawThreads = (state) => state.threads.threads;

export const selectAllThreads = createSelector([rawThreads], (threads) => sortByCreatedAt(threads));
export const selectSelectedThread = (state) => state.threads.selectedThread;
export const selectThreadsStatus = (state) => state.threads.status;
export const selectThreadsError = (state) => state.threads.error;
export const selectNewlyCreatedThread = (state) => state.threads.thread;

const rawComments = (state) => state.threads.comments;

export const selectComments = createSelector([rawComments], (comments) => sortByCreatedAt(comments));

export const selectCommentsStatus = (state) => state.threads.status;

export const selectUpVotes = (state) => state.threads.upVotes;
export const selectDownVotes = (state) => state.threads.downVotes;

export const selectUpVoteCount = (state) => getVotesCount(state, 'upVotes');
export const selectDownVoteCount = (state) => getVotesCount(state, 'downVotes');

export const selectCommentUpVotes = (state) => state.threads.commentUpVotes;
export const selectCommentDownVotes = (state) => state.threads.commentDownVotes;

export const selectCommentUpVoteCount = (state) => getVotesCount(state, 'commentUpVotes');
export const selectCommentDownVoteCount = (state) => getVotesCount(state, 'commentDownVotes');
