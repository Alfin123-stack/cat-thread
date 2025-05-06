/**
 * skenario test
 *
 * - leaderboardReducer
 *  - should return the initial state when given an unknown action
 *  - should set status to "loading" when fetchLeaderboards is pending
 *  - should store leaderboards and set status to "succeeded" when fetchLeaderboards is fulfilled
 *  - should set status to "failed" and store error when fetchLeaderboards is rejected
 *  - should clear leaderboards when clearLeaderboards is dispatched
 */

import { describe, it, expect } from 'vitest';
import leaderboardReducer, { clearLeaderboards } from '../leaderboardReducer';
import { fetchLeaderboards } from '../leaderboardThunks';

describe('leaderboardReducer function', () => {
  const initialState = {
    leaderboards: [],
    status: 'idle',
    error: null,
  };

  it('should return the initial state when given an unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const nextState = leaderboardReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should set status to "loading" when fetchLeaderboards is pending', () => {
    const action = { type: fetchLeaderboards.pending.type };
    const nextState = leaderboardReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should store leaderboards and set status to "succeeded" when fetchLeaderboards is fulfilled', () => {
    const fakeLeaderboards = [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 10,
      },
    ];
    const action = {
      type: fetchLeaderboards.fulfilled.type,
      payload: fakeLeaderboards,
    };
    const nextState = leaderboardReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      status: 'succeeded',
      leaderboards: fakeLeaderboards,
    });
  });

  it('should set status to "failed" and store error when fetchLeaderboards is rejected', () => {
    const action = {
      type: fetchLeaderboards.rejected.type,
      error: { message: 'Failed to fetch leaderboards' },
    };
    const nextState = leaderboardReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      status: 'failed',
      error: 'Failed to fetch leaderboards',
    });
  });

  it('should clear leaderboards when clearLeaderboards is dispatched', () => {
    const stateWithData = {
      leaderboards: [
        {
          user: {
            id: 'users-1', name: 'John Doe', email: 'john@example.com', avatar: 'avatar.jpg',
          },
          score: 10,
        },
      ],
      status: 'succeeded',
      error: null,
    };
    const action = clearLeaderboards();
    const nextState = leaderboardReducer(stateWithData, action);
    expect(nextState).toEqual({
      ...stateWithData,
      leaderboards: [],
    });
  });
});
