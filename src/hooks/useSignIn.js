import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { loginUser } from '../state/auth/authThunks';
import { selectAuthError, selectAuthStatus } from '../state/auth/authSelectors';

function useSignIn() {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const login = useCallback(
    (credentials) => dispatch(loginUser(credentials)),
    [dispatch],
  );

  return {
    login,
    status,
    error,
  };
}

export default useSignIn;
