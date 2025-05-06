// leaderboardSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchLeaderboards } from './leaderboardThunks';
// Slice untuk Leaderboards
const leaderboardSlice = createSlice({
  name: 'leaderboards',
  initialState: {
    leaderboards: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearLeaderboards(state) {
      state.leaderboards = []; // Menghapus data leaderboard
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Leaderboards
      .addCase(fetchLeaderboards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.leaderboards = action.payload; // Menyimpan data leaderboard
      })
      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearLeaderboards } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
