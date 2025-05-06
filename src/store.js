// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from './state/auth/authReducer'; // Impor authSlice
import threadsReducer from './state/thread/threadReducer'; // Impor threadsSlice
import leaderboardReducer from './state/leaderboard/leaderboardReducer'; // Impor leaderboardSlice
import userReducer from './state/user/userReducer';

// Gabungkan reducer-reducer
const rootReducer = combineReducers({
  auth: authReducer,
  threads: threadsReducer,
  leaderboards: leaderboardReducer,
  loadingBar: loadingBarReducer,
  users: userReducer,
});

// Konfigurasi persist
const persistConfig = {
  key: 'root',
  storage, // Menyimpan state di localStorage
  whitelist: ['auth'], // Hanya persist auth slice
};

// Bungkus rootReducer dengan persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Konfigurasi store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  }),
});

// Ekspor persistor
export const persistor = persistStore(store);
