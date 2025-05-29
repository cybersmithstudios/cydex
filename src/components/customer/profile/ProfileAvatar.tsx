
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

interface ProfileAvatarProps {
  name: string;
}

const ProfileAvatar = ({ name }: ProfileAvatarProps) => {
  return (
    <div className="md:w-1/3 flex flex-col items-center">
      <Avatar className="h-32 w-32">
        <AvatarImage src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Sarah" />
        <AvatarFallback>SJ</AvatarFallback>
      </Avatar>
      <Button variant="ghost" size="sm" className="mt-2">
        <Camera className="mr-2 h-4 w-4" />
        Change Avatar
      </Button>
    </div>
  );
};

export default ProfileAvatar;
