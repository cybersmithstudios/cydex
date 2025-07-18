
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface ProfileStatusProps {
  profile: any;
  onStatusToggle?: (isOnline: boolean) => void;
}

const ProfileStatus = ({ profile, onStatusToggle }: ProfileStatusProps) => {
  const handleStatusChange = (checked: boolean) => {
    if (onStatusToggle) {
      onStatusToggle(checked);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm">Offline</span>
          <Switch 
            checked={profile.isOnline} 
            onCheckedChange={handleStatusChange}
            className="data-[state=checked]:bg-green-500"
          />
          <span className="text-xs sm:text-sm">Online</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge className={profile.isOnline ? "bg-green-500" : "bg-gray-500"} variant="default">
          {profile.isOnline ? 'Online' : 'Offline'}
        </Badge>
        <Badge variant="outline" className={`text-xs ${profile.isVerified ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600'}`}>
          {profile.isVerified ? 'Verified' : 'Not Verified'}
        </Badge>
      </div>
    </div>
  );
};

export default ProfileStatus;
