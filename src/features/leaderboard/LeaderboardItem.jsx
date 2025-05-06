import React from 'react';
import PropTypes from 'prop-types';
import UserInfoHeader from '../../components/UserInfoHeader';
import LeaderboardMeta from './LeaderboardMeta';

function LeaderboardItem({ entry, rank }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
      {/* User Avatar and Info */}
      <UserInfoHeader user={entry.user} subtitle={entry.user.email} />

      {/* Score and Rank */}
      <LeaderboardMeta score={entry.score} rank={rank} />
    </div>
  );
}

LeaderboardItem.propTypes = {
  entry: PropTypes.shape({
    score: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  rank: PropTypes.number.isRequired,
};

export default LeaderboardItem;
