import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormWrapper from '../../components/FormWrapper';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import TextLink from '../../components/TextLink';
import useSignIn from '../../hooks/useSignIn';

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const { login, status, error } = useSignIn();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const result = login(data);
    if (result.type === 'auth/login/fulfilled') {
      navigate('/');
    }
  };

  return (
    <FormWrapper title="Sign In">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
          {...register('email', { required: true })}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
          {...register('password', { required: true })}
        />

        {status === 'failed' && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        <Button
          type="submit"
          fullWidth
          loading={status === 'loading' || isSubmitting}
          loadingText="Signing In..."
          disabled={status === 'loading' || isSubmitting}
        >
          Sign In
        </Button>
      </form>

      <TextLink
        text="Don't have an account?"
        linkText="Sign Up"
        to="/sign-up"
        align="center"
      />
    </FormWrapper>
  );
}

export default SignInForm;
