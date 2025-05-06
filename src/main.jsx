import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Menambahkan PersistGate untuk mengontrol waktu loading
import App from './App.jsx';
import { store, persistor } from './store.js'; // Pastikan sudah mengonfigurasi store dan persistor

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {' '}
      {/* Menyediakan Redux store */}
      <PersistGate loading={null} persistor={persistor}>
        {' '}
        {/* Membungkus dengan PersistGate */}
        <App />
        {' '}
        {/* Aplikasi Anda */}
      </PersistGate>
    </Provider>
  </StrictMode>,
);
