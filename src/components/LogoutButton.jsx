import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../state/auth/authReducer';

// Wrapper for spacing
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
`;

// Styled logout button
const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  color: #d1d5db; /* text-gray-300 */
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    color: #ef4444; /* red-500 */
    background-color: #374151; /* bg-gray-700 */
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }

  svg {
    margin-right: 0.75rem;
    font-size: 1.25rem; /* text-xl */
  }
`;

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in', { replace: true });
  };

  return (
    <ButtonWrapper>
      <LogoutBtn onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </LogoutBtn>
    </ButtonWrapper>
  );
}

export default LogoutButton;
