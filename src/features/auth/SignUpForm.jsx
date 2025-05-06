import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import FormWrapper from '../../components/FormWrapper';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import TextLink from '../../components/TextLink';
import useSignUp from '../../hooks/useSignUp';

function SignUpForm() {
  const {
    register: formRegister,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const { register, status, error } = useSignUp();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const userData = {
      name: data.fullname,
      email: data.email,
      password: data.password,
    };

    const result = register(userData);

    if (result.type === 'auth/register/fulfilled') {
      navigate('/sign-in');
    }
  };

  return (
    <FormWrapper title="Sign Up">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id="fullname"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          required
          {...formRegister('fullname', { required: true })}
        />

        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
          {...formRegister('email', { required: true })}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
          {...formRegister('password', { required: true })}
        />

        <InputField
          id="confirm-password"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          required
          {...formRegister('confirmPassword', { required: true })}
        />

        {status === 'failed' && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        <Button
          type="submit"
          fullWidth
          loading={status === 'loading' || isSubmitting}
          loadingText="Signing Up..."
          disabled={status === 'loading' || isSubmitting}
        >
          Sign Up
        </Button>
      </form>

      <TextLink
        text="Already have an account?"
        linkText="Sign in"
        to="/sign-in"
        align="center"
      />
    </FormWrapper>
  );
}

export default SignUpForm;
