import React from 'react';
import Spinner from '../../components/Spinner';
import LeaderboardList from './LeaderboardList';
import useLeaderboards from '../../hooks/useLeaderboards';

function Leaderboard() {
  const { leaderboards, status, error } = useLeaderboards();

  if (status === 'loading') return <Spinner />;
  if (status === 'failed') {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return <LeaderboardList leaderboards={leaderboards} />;
}

export default Leaderboard;
