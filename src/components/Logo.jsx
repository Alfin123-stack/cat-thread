import styled, { keyframes } from 'styled-components';
import { FaCat } from 'react-icons/fa';

// Bounce animation
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.5rem);
  }
`;

// Wrapper for the logo
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

// Animated cat icon
const CatIcon = styled(FaCat)`
  color: #3b82f6; /* blue-500 */
  font-size: 2.25rem; /* text-4xl */
  animation: ${bounce} 1.5s infinite;
`;

// Gradient text
const LogoText = styled.h1`
  font-size: 1.5rem; /* text-2xl */
  font-weight: 800; /* font-extrabold */
  background: linear-gradient(to right, #3b82f6, #d1d5db); /* from blue-500 to gray-300 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

function Logo() {
  return (
    <Header>
      <CatIcon />
      <LogoText>Cat Thread App</LogoText>
    </Header>
  );
}

export default Logo;
