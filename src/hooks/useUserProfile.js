import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthError,
  selectAuthStatus,
  selectCurrentUser,
} from '../state/auth/authSelectors';
import { fetchUserProfile } from '../state/auth/authThunks';

function useUserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return {
    user,
    status,
    error,
  };
}

export default useUserProfile;
