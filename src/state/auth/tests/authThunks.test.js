/**
 * skenario test
 *
 * - authThunks
 *  - loginUser
 *    - should dispatch loading and return user on success
 *    - should handle login failure from API (error=true)
 *    - should handle exception during login
 *
 *  - registerUser
 *    - should register user successfully
 *    - should handle registration failure from API (error=true)
 *    - should handle exception during registration
 *
 *  - fetchUserProfile
 *    - should fetch logged-in user successfully
 *    - should handle API failure when fetching profile
 *    - should handle exception during profile fetch
 */

import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import {
  loginUser,
  registerUser,
  fetchUserProfile,
} from '../authThunks';
import * as api from '../../../utils/api';

vi.mock('../../../utils/api');

describe('authThunks', () => {
  let dispatch;
  let thunk;
  let mockUser;

  beforeEach(() => {
    dispatch = vi.fn();
    mockUser = { id: 'user-1', name: 'John Doe' };
  });

  describe('loginUser', () => {
    it('should dispatch loading and return user on success', async () => {
      api.login.mockResolvedValue({
        error: false,
        data: mockUser,
      });

      thunk = loginUser({ email: 'test@example.com', password: 'password' });
      const result = await thunk(dispatch, () => {}, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual(mockUser);
    });

    it('should handle login failure from API (error=true)', async () => {
      api.login.mockResolvedValue({
        error: true,
        message: 'Invalid credentials',
      });

      thunk = loginUser({ email: 'test@example.com', password: 'password' });
      const result = await thunk(dispatch, () => {}, { rejectWithValue: (v) => v });

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.login).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual('Invalid credentials');
    });

    it('should handle exception during login', async () => {
      api.login.mockRejectedValue(new Error('Network error'));

      thunk = loginUser({ email: 'test@example.com', password: 'password' });
      const result = await thunk(dispatch, () => {}, { rejectWithValue: (v) => v });

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.login).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual('Network error');
    });
  });

  describe('registerUser', () => {
    it('should register user successfully', async () => {
      api.register.mockResolvedValue({
        error: false,
        data: { id: 'user-2' },
      });

      thunk = registerUser({
        name: 'John',
        email: 'john@example.com',
        password: 'password',
      });
      const result = await thunk(dispatch, () => {}, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.register).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@example.com',
        password: 'password',
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual({ message: 'Registration successful' });
    });

    it('should handle registration failure from API (error=true)', async () => {
      api.register.mockResolvedValue({
        error: true,
        message: 'Email already used',
      });

      thunk = registerUser({
        name: 'John',
        email: 'john@example.com',
        password: 'password',
      });
      const result = await thunk(dispatch, () => {}, { rejectWithValue: (v) => v });

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.register).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual('Email already used');
    });

    it('should handle exception during registration', async () => {
      api.register.mockRejectedValue(new Error('Server error'));

      thunk = registerUser({
        name: 'John',
        email: 'john@example.com',
        password: 'password',
      });
      const result = await thunk(dispatch, () => {}, { rejectWithValue: (v) => v });

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.register).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual('Server error');
    });
  });

  describe('fetchUserProfile', () => {
    it('should fetch logged-in user successfully', async () => {
      api.getUserLogged.mockResolvedValue({
        error: false,
        data: { user: mockUser },
      });

      thunk = fetchUserProfile();
      const result = await thunk(dispatch, () => {}, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getUserLogged).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual(mockUser);
    });

    it('should handle API failure when fetching profile', async () => {
      api.getUserLogged.mockResolvedValue({
        error: true,
        message: 'Token expired',
      });

      thunk = fetchUserProfile();
      const result = await thunk(dispatch, () => {}, { rejectWithValue: (v) => v });

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getUserLogged).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual('Token expired');
    });

    it('should handle exception during profile fetch', async () => {
      api.getUserLogged.mockRejectedValue(new Error('Fetch failed'));

      thunk = fetchUserProfile();
      const result = await thunk(dispatch, () => {}, { rejectWithValue: (v) => v });

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getUserLogged).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual('Fetch failed');
    });
  });
});
