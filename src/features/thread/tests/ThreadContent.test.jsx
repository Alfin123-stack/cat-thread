/**
 * test scenarios
 *
 * - ThreadContent component
 *   - should display title with correct class name
 *   - should display body with correct class name
 *   - should limit body text length if bodyLimit is set
 *   - should show ellipsis if bodyLimit is set and showEllipsis is true
 *   - should not show ellipsis if bodyLimit is set but showEllipsis is false
 */

import React from 'react';
import {
  describe, it, expect, afterEach,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import ThreadContent from '../ThreadContent';

describe('ThreadContent component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display title with correct class name', () => {
    // Arrange
    render(<ThreadContent title="Test Title" body="Test Body" />);

    // Assert
    const titleElement = screen.getByText('Test Title');
    expect(titleElement.classList.contains('text-3xl')).toBe(true);
    expect(titleElement.classList.contains('font-semibold')).toBe(true);
    expect(titleElement.classList.contains('text-blue-400')).toBe(true);
    expect(titleElement.classList.contains('mb-2')).toBe(true);
  });

  it('should display body with correct class name', () => {
    // Arrange
    render(<ThreadContent title="Test Title" body="Test Body" />);

    // Assert
    const bodyElement = screen.getByText('Test Body');
    expect(bodyElement.classList.contains('text-gray-300')).toBe(true);
    expect(bodyElement.classList.contains('text-sm')).toBe(true);
    expect(bodyElement.classList.contains('mb-4')).toBe(true);
  });

  it('should limit body text length if bodyLimit is set', () => {
    // Arrange
    const longBody = 'This is a long body of text that exceeds the limit';
    render(<ThreadContent title="Test Title" body={longBody} bodyLimit={20} />);

    // Assert
    const bodyElement = screen.getByText('This is a long body');
    expect(bodyElement).toBeTruthy(); // Checks if the element exists
  });

  it('should show ellipsis if bodyLimit is set and showEllipsis is true', () => {
    // Arrange
    const longBody = 'This is a long body of text that exceeds the limit';
    render(<ThreadContent title="Test Title" body={longBody} bodyLimit={20} showEllipsis />);

    // Assert
    const bodyElement = screen.getByText(/This is a long body.*\.\.\./);
    expect(bodyElement).toBeTruthy(); // Checks if the element exists with the ellipsis
  });

  it('should not show ellipsis if bodyLimit is set but showEllipsis is false', () => {
    // Arrange
    const longBody = 'This is a long body of text that exceeds the limit';
    render(<ThreadContent title="Test Title" body={longBody} bodyLimit={20} showEllipsis={false} />);

    // Assert
    const bodyElement = screen.getByText('This is a long body');
    expect(bodyElement).toBeTruthy(); // Checks if the element exists without the ellipsis
  });
});
