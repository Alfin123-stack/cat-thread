/**
 * skenario test
 *
 * - userThunks
 *   - fetchAllUsers
 *     - should dispatch loading and return users on success
 *     - should handle API failure (error=true)
 *     - should handle exception during fetching users
 */

import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { fetchAllUsers } from '../userThunks';
import * as api from '../../../utils/api';

vi.mock('../../../utils/api');

describe('userThunks', () => {
  let dispatch;
  let thunk;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  describe('fetchAllUsers', () => {
    it('should dispatch loading and return users on success', async () => {
      const mockUsers = [{ id: 'user-1', name: 'John Doe' }];
      api.getAllUsers.mockResolvedValue({
        error: false,
        data: mockUsers,
      });

      thunk = fetchAllUsers();
      const result = await thunk(dispatch, () => {}, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getAllUsers).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual(mockUsers);
    });

    it('should handle API failure (error=true)', async () => {
      api.getAllUsers.mockResolvedValue({
        error: true,
        message: 'Failed to fetch users',
      });

      thunk = fetchAllUsers();
      const result = await thunk(dispatch, () => {}, {
        rejectWithValue: (v) => v,
      });

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getAllUsers).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual('Failed to fetch users');
    });

    it('should handle exception during fetching users', async () => {
      api.getAllUsers.mockRejectedValue(new Error('Network error'));

      thunk = fetchAllUsers();
      const result = await thunk(dispatch, () => {}, {
        rejectWithValue: (v) => v,
      });

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getAllUsers).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual('Network error');
    });
  });
});
