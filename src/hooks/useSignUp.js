import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { registerUser } from '../state/auth/authThunks';
import { selectAuthStatus, selectAuthError } from '../state/auth/authSelectors';

function useSignUp() {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const register = useCallback(
    (userData) => dispatch(registerUser(userData)),
    [dispatch],
  );

  return {
    register,
    status,
    error,
  };
}

export default useSignUp;
