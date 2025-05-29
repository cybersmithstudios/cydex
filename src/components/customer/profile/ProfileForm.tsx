
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ProfileFormProps {
  profileData: ProfileData;
  isEditing: boolean;
  handleInputChange: (field: string, value: string) => void;
  handleSave: () => void;
  setIsEditing: (editing: boolean) => void;
}

const ProfileForm = ({ 
  profileData, 
  isEditing, 
  handleInputChange, 
  handleSave, 
  setIsEditing 
}: ProfileFormProps) => {
  return (
    <div className="md:w-2/3 space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          placeholder="Your Name" 
          value={profileData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          disabled={!isEditing} 
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          placeholder="Your Email" 
          value={profileData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          disabled={!isEditing} 
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="phone">Phone Number</Label>
        <Input 
          id="phone" 
          placeholder="Your Phone" 
          value={profileData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          disabled={!isEditing} 
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="address">Address</Label>
        <Input 
          id="address" 
          placeholder="Your Address" 
          value={profileData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          disabled={!isEditing} 
        />
      </div>
      
      {isEditing && (
        <div className="flex justify-end mt-4">
          <Button variant="secondary" onClick={() => setIsEditing(false)} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
