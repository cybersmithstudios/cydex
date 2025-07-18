
import React from 'react';
import { Star } from 'lucide-react';

interface ProfileRatingProps {
  profile: any;
}

const ProfileRating = ({ profile }: ProfileRatingProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center">
        <Star className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
        <div className="ml-2 flex-1">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Rating</span>
            <span className="text-sm font-bold">{profile.stats.rating}/5.0</span>
          </div>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(profile.stats.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
              />
            ))}
            <span className="ml-2 text-xs text-gray-500">
              ({profile.stats.reviews} reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileRating;
