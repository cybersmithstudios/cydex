
import React from 'react';

interface ProfileStatsProps {
  profile: any;
}

const ProfileStats = ({ profile }: ProfileStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
      <div className="text-center">
        <p className="text-lg sm:text-xl md:text-2xl font-bold">{profile.stats.completedDeliveries}</p>
        <p className="text-xs sm:text-sm text-gray-500">Deliveries</p>
      </div>
      <div className="text-center">
        <p className="text-lg sm:text-xl md:text-2xl font-bold">{profile.stats.totalDistance} km</p>
        <p className="text-xs sm:text-sm text-gray-500">Distance</p>
      </div>
      <div className="text-center">
        <p className="text-lg sm:text-xl md:text-2xl font-bold">{profile.stats.carbonSaved} kg</p>
        <p className="text-xs sm:text-sm text-gray-500">CO₂ Saved</p>
      </div>
      <div className="text-center">
        <p className="text-lg sm:text-xl md:text-2xl font-bold">{profile.stats.sustainabilityScore}</p>
        <p className="text-xs sm:text-sm text-gray-500">Eco Score</p>
      </div>
    </div>
  );
};

export default ProfileStats;
