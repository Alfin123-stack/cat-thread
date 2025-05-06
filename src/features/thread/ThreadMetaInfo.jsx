import PropTypes from 'prop-types';
import { HiOutlineFolder, HiOutlineChat } from 'react-icons/hi';
import { MdOutlineThumbsUpDown } from 'react-icons/md';
import IconText from '../../components/IconText';

function ThreadMetaInfo({
  category,
  totalVotes,
  totalComments,
  iconSize = 20,
  iconColor = 'text-blue-400',
  textColor = 'text-gray-400',
  fontSize = 'text-sm',
}) {
  return (
    <div className={`flex justify-between items-center ${textColor} ${fontSize}`} data-testid="thread-meta-info">
      <IconText
        icon={HiOutlineFolder}
        text={category}
        iconSize={iconSize}
        iconClassName={iconColor}
      />
      <div className="flex gap-4">
        <IconText
          icon={MdOutlineThumbsUpDown}
          text={`${totalVotes} Votes`}
          iconSize={iconSize}
          iconClassName={iconColor}
        />
        <IconText
          icon={HiOutlineChat}
          text={`${totalComments} Comments`}
          iconSize={iconSize}
          iconClassName={iconColor}
        />
      </div>
    </div>
  );
}

ThreadMetaInfo.propTypes = {
  category: PropTypes.string.isRequired,
  totalVotes: PropTypes.number.isRequired,
  totalComments: PropTypes.number.isRequired,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  textColor: PropTypes.string,
  fontSize: PropTypes.string,
};

export default ThreadMetaInfo;
