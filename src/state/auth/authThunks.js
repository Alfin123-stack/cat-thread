import { createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { login, register, getUserLogged } from '../../utils/api';

// Login user
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await login({ email, password });
      if (response.error) {
        return rejectWithValue(response.message || 'Login failed. Please try again.');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed. Please try again.');
    } finally {
      dispatch(hideLoading());
    }
  },
);

// Register user
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await register({ name, email, password });
      if (response.error) {
        return rejectWithValue(response.message || 'Registration failed. Please try again.');
      }
      return { message: 'Registration successful' };
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed. Please try again.');
    } finally {
      dispatch(hideLoading());
    }
  },
);

// Fetch logged-in user
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await getUserLogged();
      if (response.error) {
        return rejectWithValue(response.message || 'Failed to fetch user profile');
      }
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch user profile');
    } finally {
      dispatch(hideLoading());
    }
  },
);
