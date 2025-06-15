
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Upload, Star, Calendar, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ProfileHeaderProps {
  profile: any;
  editing: boolean;
  onStatusToggle?: (isOnline: boolean) => void;
  onAvatarUpdate?: (avatarUrl: string) => void;
}

const ProfileHeader = ({ profile, editing, onStatusToggle, onAvatarUpdate }: ProfileHeaderProps) => {
  const [uploading, setUploading] = useState(false);

  if (!profile) return null;

  const handleStatusChange = (checked: boolean) => {
    if (onStatusToggle) {
      onStatusToggle(checked);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setUploading(true);
    
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
      
      // For now, we'll use a simple data URL approach
      // In a production app, you'd upload to Supabase Storage
      const reader = new FileReader();
      reader.onload = async (e) => {
        const avatarUrl = e.target?.result as string;
        
        // Update profile with new avatar
        const { error } = await supabase
          .from('profiles')
          .update({ avatar: avatarUrl })
          .eq('id', profile.id);

        if (error) {
          console.error('Error updating avatar:', error);
          toast.error('Failed to update profile photo');
        } else {
          toast.success('Profile photo updated successfully');
          if (onAvatarUpdate) {
            onAvatarUpdate(avatarUrl);
          }
        }
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload profile photo');
    } finally {
      setUploading(false);
    }
  };

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
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              style={{ display: 'none' }}
              id="avatar-upload"
              disabled={uploading}
            />
            <label htmlFor="avatar-upload">
              <Button 
                size="sm" 
                variant="secondary" 
                className="absolute -bottom-1 -right-1 rounded-full h-6 w-6 sm:h-8 sm:w-8 p-0 cursor-pointer"
                disabled={uploading}
                asChild
              >
                <span>
                  <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                </span>
              </Button>
            </label>
          </>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-lg sm:text-xl font-bold">{profile.name}</h2>
        <p className="text-xs sm:text-sm text-gray-500">Rider ID: #R-{profile.id.slice(-6)}</p>
      </div>
      
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
