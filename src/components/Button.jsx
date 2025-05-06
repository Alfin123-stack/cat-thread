import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// Shared button styles
const buttonStyles = css`
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-weight: 500;
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }

  ${({ $fullWidth }) => $fullWidth
    && css`
      width: 100%;
    `}

  ${({ disabled }) => disabled
    && css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

const StyledButton = styled.button`${buttonStyles}`;
const StyledLink = styled(Link)`${buttonStyles}`;

function Button({
  onClick,
  children,
  loading = false,
  loadingText = 'Loading...',
  disabled = false,
  fullWidth = false,
  type = 'button',
  to,
}) {
  const content = loading ? loadingText : children;

  if (to) {
    return (
      <StyledLink to={to} $fullWidth={fullWidth} disabled={disabled || loading}>
        {content}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      $fullWidth={fullWidth}
    >
      {content}
    </StyledButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  to: PropTypes.string,
};

export default Button;
