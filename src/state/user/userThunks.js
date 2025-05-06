import { createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { getAllUsers } from '../../utils/api';

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await getAllUsers();
      if (response.error) {
        return rejectWithValue(response.message || 'Failed to fetch users');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    } finally {
      dispatch(hideLoading());
    }
  },
);
