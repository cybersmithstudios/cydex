
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface RiderProfileHeaderProps {
  editing: boolean;
  onEditToggle: () => void;
  onSave: () => void;
}

const RiderProfileHeader = ({ editing, onEditToggle, onSave }: RiderProfileHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 md:mb-6 gap-3 sm:gap-4">
      <div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">My Profile</h1>
        <p className="text-sm sm:text-base text-gray-600">Manage your account information and settings</p>
      </div>
      {editing ? (
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={() => onEditToggle()} className="text-xs sm:text-sm h-8 sm:h-9">Cancel</Button>
          <Button className="bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9" onClick={onSave}>
            Save Changes
          </Button>
        </div>
      ) : (
        <Button className="bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9 w-full sm:w-auto" onClick={onEditToggle}>
          <Edit className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Edit Profile
        </Button>
      )}
    </div>
  );
};

export default RiderProfileHeader;
