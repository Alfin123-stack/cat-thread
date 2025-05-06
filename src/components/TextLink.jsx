import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Alignment styling based on props
const Container = styled.div`
  margin-top: 1rem;
  text-align: ${({ align }) => align || 'center'};
`;

const Text = styled.p`
  font-size: 0.875rem;
  color: #9ca3af; /* text-gray-400 */
`;

const StyledLink = styled(Link)`
  color: #3b82f6; /* blue-500 */
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function TextLink({
  text, linkText, to, align = 'center',
}) {
  return (
    <Container align={align}>
      <Text>
        {text && `${text} `}
        <StyledLink to={to}>{linkText}</StyledLink>
      </Text>
    </Container>
  );
}

TextLink.propTypes = {
  text: PropTypes.string,
  linkText: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

export default TextLink;
