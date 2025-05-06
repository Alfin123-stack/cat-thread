import { createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar'; // Tambahkan ini
import { getLeaderboards } from '../../utils/api';

// Async Thunks untuk mengambil leaderboard
export const fetchLeaderboards = createAsyncThunk(
  'leaderboards/fetchLeaderboards',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const { error, data } = await getLeaderboards();
      if (error) throw new Error('Failed to fetch leaderboards');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);
