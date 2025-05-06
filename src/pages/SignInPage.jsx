import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AuthLayout from '../features/auth/AuthLayout';
import SignInForm from '../features/auth/SignInForm';
import { selectCurrentUser } from '../state/auth/authSelectors';

const backgroundUrl = 'https://images.unsplash.com/photo-1594998713977-d34a6ec00015?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhdCUyMGRhcmt8ZW58MHx8MHx8fDA%3D';

function SignInPage() {
  const hasLogin = useSelector(selectCurrentUser);

  if (hasLogin) {
    return <Navigate to="/" replace />;
  }
  return (
    <AuthLayout imageUrl={backgroundUrl}>
      <SignInForm />
    </AuthLayout>
  );
}

export default SignInPage;
