import React from 'react';
import { formatDate } from '../../utils/helper';
import Spinner from '../../components/Spinner';
import ProfileAvatar from './ProfileAvatar';
import ProfileSection from './ProfileSection';
import ProfileInfo from './ProfileInfo';
import useUserProfile from '../../hooks/useUserProfile';

function Profile() {
  const { user, status, error } = useUserProfile();

  if (status === 'loading') return <Spinner />;
  if (status === 'failed') {
    return (
      <p>
        Error:
        {error}
      </p>
    );
  }
  if (!user) return <p>No user found. Please log in.</p>;

  const today = formatDate(new Date());

  return (
    <div className="space-y-6 w-[70%] mx-auto">
      <ProfileSection>
        <ProfileAvatar
          avatar={user.avatar}
          name={user.name}
          email={user.email}
          date={today}
        />

        <div className="space-y-4">
          <ProfileInfo label="Name" value={user.name} />
          <ProfileInfo label="Email" value={user.email} />
          <ProfileInfo label="Joined At" value={today} />
        </div>
      </ProfileSection>
    </div>
  );
}

export default Profile;
