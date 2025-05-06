/**
 * test scenarios
 *
 * - SignInForm component
 *   - should handle email input correctly
 *   - should handle password input correctly
 *   - should call login function with correct data on submit
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom';
import SignInForm from '../SignInForm';

// Buat mock login function di luar supaya bisa diuji
const mockLogin = vi.fn(() => ({ type: 'auth/login/fulfilled' }));

// Mock module useSignIn
vi.mock('../../../hooks/useSignIn.js', () => ({
  default: () => ({
    login: mockLogin,
    status: 'idle',
    error: null,
  }),
}));

expect.extend(matchers);

function Wrapper({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

describe('SignInForm component', () => {
  afterEach(() => {
    cleanup();
    mockLogin.mockClear();
  });

  it('should handle email typing correctly', async () => {
    render(<SignInForm />, { wrapper: Wrapper });

    const emailInput = await screen.getByPlaceholderText('Enter your email');
    await userEvent.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    render(<SignInForm />, { wrapper: Wrapper });

    const passwordInput = await screen.getByPlaceholderText('Enter your password');
    await userEvent.type(passwordInput, 'mypassword');

    expect(passwordInput).toHaveValue('mypassword');
  });

  it('should call login function with correct data on submit', async () => {
    render(<SignInForm />, { wrapper: Wrapper });

    const emailInput = await screen.getByPlaceholderText('Enter your email');
    const passwordInput = await screen.getByPlaceholderText('Enter your password');
    const submitButton = await screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'mypassword');
    await userEvent.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'mypassword',
    });
  });
});
