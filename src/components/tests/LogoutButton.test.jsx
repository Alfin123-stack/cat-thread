/**
 * Test scenarios
 *
 * - LogoutButton component
 *   - should dispatch logout and navigate to /sign-in on click
 */

import React from 'react';
import {
  describe, it, expect, vi, afterEach,
} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as reactRedux from 'react-redux';
import * as reactRouter from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
import LogoutButton from '../LogoutButton';
import { logout } from '../../state/auth/authReducer';

// Mock action

// Extend matchers
expect.extend(matchers);

// Mocks
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

// Optional: mock logout action
vi.mock('../state/auth/authReducer', () => ({
  logout: vi.fn(() => ({ type: 'LOGOUT' })),
}));

describe('LogoutButton component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should dispatch logout and navigate to /sign-in on click', async () => {
    const mockDispatch = vi.fn();
    const mockNavigate = vi.fn();

    // Setup mocks
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    reactRouter.useNavigate.mockReturnValue(mockNavigate);

    render(<LogoutButton />);

    const button = screen.getByRole('button', { name: /logout/i });
    await userEvent.click(button);

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith(logout());
    expect(mockNavigate).toHaveBeenCalledWith('/sign-in', { replace: true });
  });
});
