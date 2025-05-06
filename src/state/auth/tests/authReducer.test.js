/**
 * skenario test
 *
 * - authSlice reducer
 *  - should return the initial state
 *  - should handle logout
 *  - should handle clearError
 *
 * - loginUser thunk
 *  - should set status to loading when pending
 *  - should update user and status when fulfilled
 *  - should set error and status when rejected
 *
 * - registerUser thunk
 *  - should set status to loading when pending
 *  - should set status to succeeded when fulfilled
 *  - should set error and status when rejected
 *
 * - fetchUserProfile thunk
 *  - should set status to loading when pending
 *  - should set user and status when fulfilled
 *  - should set error and status when rejected
 */

import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import authReducer, { logout, clearError } from '../authReducer';
import {
  loginUser,
  registerUser,
  fetchUserProfile,
} from '../authThunks';

describe('authSlice', () => {
  const initialState = {
    user: null,
    status: 'idle',
    error: null,
  };

  beforeEach(() => {
    global.localStorage = {
      removeItem: vi.fn(),
      setItem: vi.fn(),
      getItem: vi.fn(),
    };
  });

  // reducer: initial state
  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  // reducer: logout
  it('should handle logout', () => {
    const previousState = {
      user: { id: 'user-1', name: 'John Doe' },
      status: 'succeeded',
      error: null,
    };

    const nextState = authReducer(previousState, logout());

    expect(global.localStorage.removeItem).toHaveBeenCalledWith('accessToken');
    expect(nextState.user).toBeNull();
    expect(nextState.status).toBe('idle');
    expect(nextState.error).toBeNull();
  });

  // reducer: clearError
  it('should handle clearError', () => {
    const previousState = {
      ...initialState,
      error: 'Some error',
    };

    const nextState = authReducer(previousState, clearError());
    expect(nextState.error).toBeNull();
  });

  // loginUser thunk
  it('should handle loginUser.pending', () => {
    const nextState = authReducer(initialState, { type: loginUser.pending.type });
    expect(nextState.status).toBe('loading');
  });

  it('should handle loginUser.fulfilled', () => {
    const user = { id: 'user-1', name: 'John Doe' };
    const nextState = authReducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: user,
    });
    expect(nextState.status).toBe('succeeded');
    expect(nextState.user).toEqual(user);
    expect(nextState.error).toBeNull();
  });

  it('should handle loginUser.rejected', () => {
    const nextState = authReducer(initialState, {
      type: loginUser.rejected.type,
      payload: 'Invalid credentials',
    });
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe('Invalid credentials');
  });

  // registerUser thunk
  it('should handle registerUser.pending', () => {
    const nextState = authReducer(initialState, { type: registerUser.pending.type });
    expect(nextState.status).toBe('loading');
  });

  it('should handle registerUser.fulfilled', () => {
    const nextState = authReducer(initialState, { type: registerUser.fulfilled.type });
    expect(nextState.status).toBe('succeeded');
    expect(nextState.error).toBeNull();
  });

  it('should handle registerUser.rejected', () => {
    const nextState = authReducer(initialState, {
      type: registerUser.rejected.type,
      payload: 'Registration failed',
    });
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe('Registration failed');
  });

  // fetchUserProfile thunk
  it('should handle fetchUserProfile.pending', () => {
    const nextState = authReducer(initialState, { type: fetchUserProfile.pending.type });
    expect(nextState.status).toBe('loading');
  });

  it('should handle fetchUserProfile.fulfilled', () => {
    const user = { id: 'user-1', name: 'John Doe' };
    const nextState = authReducer(initialState, {
      type: fetchUserProfile.fulfilled.type,
      payload: user,
    });
    expect(nextState.status).toBe('succeeded');
    expect(nextState.user).toEqual(user);
    expect(nextState.error).toBeNull();
  });

  it('should handle fetchUserProfile.rejected', () => {
    const nextState = authReducer(initialState, {
      type: fetchUserProfile.rejected.type,
      payload: 'Failed to fetch profile',
    });
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe('Failed to fetch profile');
  });
});
