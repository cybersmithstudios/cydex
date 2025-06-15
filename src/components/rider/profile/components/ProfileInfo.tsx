
import React from 'react';

interface ProfileInfoProps {
  profile: any;
}

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  return (
    <div className="text-center space-y-1">
      <h2 className="text-lg sm:text-xl font-bold">{profile.name}</h2>
      <p className="text-xs sm:text-sm text-gray-500">Rider ID: #R-{profile.id.slice(-6)}</p>
    </div>
  );
};

export default ProfileInfo;
