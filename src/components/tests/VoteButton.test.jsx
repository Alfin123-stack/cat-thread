/**
 * Test scenarios
 *
 * - VoteButtons component
 *   - should render upvote and downvote counts correctly
 *   - should call onUpVote when user clicks upvote and hasn't upvoted
 *   - should call onNeutralVote when user clicks upvote and has upvoted
 *   - should call onDownVote when user clicks downvote and hasn't downvoted
 *   - should call onNeutralVote when user clicks downvote and has downvoted
 */
import React from 'react';
import {
  describe, it, expect, vi, afterEach,
} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import VoteButtons from '../VoteButton';

// Extend matchers
expect.extend(matchers);

describe('VoteButtons component', () => {
  const defaultProps = {
    upVoteCount: 10,
    downVoteCount: 2,
    hasUpVoted: false,
    hasDownVoted: false,
    onUpVote: vi.fn(),
    onDownVote: vi.fn(),
    onNeutralVote: vi.fn(),
  };

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should render vote counts correctly', () => {
    render(<VoteButtons {...defaultProps} />);

    expect(screen.getByText(/10 Upvotes/i)).toBeInTheDocument();
    expect(screen.getByText(/2 Downvotes/i)).toBeInTheDocument();
  });

  it('should call onUpVote when upvote button is clicked and user hasn\'t upvoted', async () => {
    render(<VoteButtons {...defaultProps} />);
    const upvoteButton = screen.getByText(/10 Upvotes/i).closest('div');

    await userEvent.click(upvoteButton);

    expect(defaultProps.onUpVote).toHaveBeenCalled();
    expect(defaultProps.onNeutralVote).not.toHaveBeenCalled();
  });

  it('should call onNeutralVote when upvote button is clicked and user has upvoted', async () => {
    render(<VoteButtons {...defaultProps} hasUpVoted />);
    const upvoteButton = screen.getByText(/10 Upvotes/i).closest('div');

    await userEvent.click(upvoteButton);

    expect(defaultProps.onNeutralVote).toHaveBeenCalled();
    expect(defaultProps.onUpVote).not.toHaveBeenCalled();
  });

  it('should call onDownVote when downvote button is clicked and user hasn\'t downvoted', async () => {
    render(<VoteButtons {...defaultProps} />);
    const downvoteButton = screen.getByText(/2 Downvotes/i).closest('div');

    await userEvent.click(downvoteButton);

    expect(defaultProps.onDownVote).toHaveBeenCalled();
    expect(defaultProps.onNeutralVote).not.toHaveBeenCalled();
  });

  it('should call onNeutralVote when downvote button is clicked and user has downvoted', async () => {
    render(<VoteButtons {...defaultProps} hasDownVoted />);
    const downvoteButton = screen.getByText(/2 Downvotes/i).closest('div');

    await userEvent.click(downvoteButton);

    expect(defaultProps.onNeutralVote).toHaveBeenCalled();
    expect(defaultProps.onDownVote).not.toHaveBeenCalled();
  });
});
