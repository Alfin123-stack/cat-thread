/**
 * skenario test
 *
 * - usersSlice
 *  - should return the initial state
 *  - fetchAllUsers
 *    - should handle fetchAllUsers.pending
 *    - should handle fetchAllUsers.fulfilled
 *    - should handle fetchAllUsers.rejected
 */

import {
  describe, it, expect, beforeEach,
} from 'vitest';
import usersReducer from '../userReducer';
import { fetchAllUsers } from '../userThunks';

describe('usersSlice', () => {
  const initialState = {
    allUsers: [],
    status: 'idle',
    error: null,
  };

  beforeEach(() => {
    // Reset any global mocks here
  });

  it('should return the initial state', () => {
    expect(usersReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  // fetchAllUsers
  it('should handle fetchAllUsers.pending', () => {
    const nextState = usersReducer(initialState, { type: fetchAllUsers.pending.type });
    expect(nextState.status).toBe('loading');
  });

  it('should handle fetchAllUsers.fulfilled', () => {
    const users = [{ id: 'user-1' }, { id: 'user-2' }];
    const nextState = usersReducer(initialState, {
      type: fetchAllUsers.fulfilled.type,
      payload: users,
    });
    expect(nextState.status).toBe('succeeded');
    expect(nextState.allUsers).toEqual(users);
    expect(nextState.error).toBeNull();
  });

  it('should handle fetchAllUsers.rejected', () => {
    const nextState = usersReducer(initialState, {
      type: fetchAllUsers.rejected.type,
      payload: 'Failed to fetch users',
    });
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe('Failed to fetch users');
  });
});
