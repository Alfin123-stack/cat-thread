import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AuthLayout from '../features/auth/AuthLayout';
import SignUpForm from '../features/auth/SignUpForm';
import { selectCurrentUser } from '../state/auth/authSelectors';

const backgroundUrl = 'https://images.unsplash.com/photo-1594998713977-d34a6ec00015?w=500&auto=format&fit=crop&q=60';

function SignUpPage() {
  const hasLogin = useSelector(selectCurrentUser);

  if (hasLogin) {
    return <Navigate to="/" replace />;
  }
  return (
    <AuthLayout imageUrl={backgroundUrl}>
      <SignUpForm />
    </AuthLayout>
  );
}

export default SignUpPage;
