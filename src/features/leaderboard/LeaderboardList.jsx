import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardList({ leaderboards }) {
  return (
    <div className="space-y-6 w-[70%] mx-auto">
      {leaderboards && leaderboards.length > 0 ? (
        leaderboards.map((entry, index) => (
          <LeaderboardItem key={entry.user.id} entry={entry} rank={index + 1} />
        ))
      ) : (
        <p className="text-gray-400 text-center">No leaderboards available.</p>
      )}
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};

export default LeaderboardList;
