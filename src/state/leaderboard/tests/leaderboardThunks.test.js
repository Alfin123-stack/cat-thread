/**
 * skenario test
 *
 * - fetchLeaderboards thunk
 *  - should dispatch showLoading and hideLoading and return leaderboard data on success
 *  - should return error if fetching leaderboards fails
 */

import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { fetchLeaderboards } from '../leaderboardThunks';
import * as api from '../../../utils/api';

vi.mock('../../../utils/api');

describe('leaderboardsThunks', () => {
  let dispatch;
  let thunk;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  describe('fetchLeaderboards', () => {
    it('should dispatch showLoading and hideLoading and return leaderboard data on success', async () => {
      const mockLeaderboards = [{ user: { id: 'user-1' }, score: 100 }];

      api.getLeaderboards.mockResolvedValue({
        data: mockLeaderboards,
      });

      thunk = fetchLeaderboards();
      const result = await thunk(dispatch, () => {}, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getLeaderboards).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual(mockLeaderboards);
    });

    it('should return error if fetching leaderboards fails', async () => {
      api.getLeaderboards.mockRejectedValue(new Error('Failed to fetch leaderboards'));

      thunk = fetchLeaderboards();
      const result = await thunk(dispatch, () => {}, {
        rejectWithValue: (v) => v,
      });

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getLeaderboards).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result.payload).toEqual('Failed to fetch leaderboards');
    });
  });
});
