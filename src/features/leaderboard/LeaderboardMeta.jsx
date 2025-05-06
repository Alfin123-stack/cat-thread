import { HiOutlineTrophy } from 'react-icons/hi2';
import PropTypes from 'prop-types';

function LeaderboardMeta({ score, rank }) {
  return (
    <div className="space-y-2 mb-4">
      {/* Score */}
      <div className="flex items-center space-x-2">
        <HiOutlineTrophy className="text-yellow-400" size={24} />
        <p className="text-2xl font-semibold text-gray-300">
          Score:
          {score}
        </p>
      </div>

      {/* Rank */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <p>
          Rank: #
          {rank}
        </p>
      </div>
    </div>
  );
}

LeaderboardMeta.propTypes = {
  score: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
};

export default LeaderboardMeta;
