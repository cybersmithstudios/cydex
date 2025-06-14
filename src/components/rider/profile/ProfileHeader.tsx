
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Upload, Star, Calendar, MapPin } from 'lucide-react';

interface ProfileHeaderProps {
  profile: any;
  editing: boolean;
}

const ProfileHeader = ({ profile, editing }: ProfileHeaderProps) => {
  if (!profile) return null;

  return (
    <div className="flex flex-col items-center space-y-3 sm:space-y-4">
      <div className="relative">
        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24">
          {profile.avatar ? (
            <AvatarImage src={profile.avatar} alt={profile.name} />
          ) : (
            <AvatarFallback className="text-lg sm:text-xl bg-primary-light text-primary">
              {profile.name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          )}
        </Avatar>
        {editing && (
          <Button size="sm" variant="secondary" className="absolute -bottom-1 -right-1 rounded-full h-6 w-6 sm:h-8 sm:w-8 p-0">
            <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-lg sm:text-xl font-bold">{profile.name}</h2>
        <p className="text-xs sm:text-sm text-gray-500">Rider ID: #R-{profile.id.slice(-6)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge className="bg-green-500 text-xs">Active</Badge>
        <Badge variant="outline" className="text-xs">Verified</Badge>
      </div>
      
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
      
      <Separator className="my-3 sm:my-4" />
      
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
      
      <Separator className="my-3 sm:my-4" />
      
      <div className="w-full space-y-2 sm:space-y-3">
        <div className="flex items-center">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
          <span className="ml-2 text-xs sm:text-sm">Joined {profile.joinDate}</span>
        </div>
        <div className="flex items-start">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mt-1" />
          <span className="ml-2 text-xs sm:text-sm">{profile.address}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
