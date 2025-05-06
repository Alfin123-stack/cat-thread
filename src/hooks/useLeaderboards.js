import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllLeaderboards,
  selectLeaderboardError,
  selectLeaderboardStatus,
} from '../state/leaderboard/leaderboardSelectors';
import { fetchLeaderboards } from '../state/leaderboard/leaderboardThunks';

function useLeaderboards() {
  const dispatch = useDispatch();
  const leaderboards = useSelector(selectAllLeaderboards);
  const status = useSelector(selectLeaderboardStatus);
  const error = useSelector(selectLeaderboardError);

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  return {
    leaderboards,
    status,
    error,
  };
}

export default useLeaderboards;
