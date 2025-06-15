
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { User, Bell, MapPin, Save } from 'lucide-react';
import { toast } from 'sonner';

interface PersonalInfoTabProps {
  editing: boolean;
  profile: any;
  onSaveProfile?: (updatedData?: any) => Promise<void>;
}

const PersonalInfoTab = ({ editing, profile, onSaveProfile }: PersonalInfoTabProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [preferences, setPreferences] = useState({
    deliveryPreferences: {
      maxDistance: 15,
      preferredZones: [],
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    notifications: {
      app: true,
      email: true,
      sms: false,
      marketing: false
    }
  });

  // Initialize form data only when profile.id changes (not on every profile change)
  useEffect(() => {
    if (profile?.id) {
      console.log('[PersonalInfoTab] Initializing form with profile:', profile.id);
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
      });
      
      if (profile.preferences) {
        setPreferences(profile.preferences);
      }
    }
  }, [profile?.id]); // Only depend on profile.id to avoid constant resets

  const handleInputChange = (field: string, value: string) => {
    console.log('[PersonalInfoTab] Input change:', field, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!onSaveProfile) {
      toast.error('Save function not available');
      return;
    }

    console.log('[PersonalInfoTab] Saving profile data:', { formData, preferences });
    
    try {
      await onSaveProfile({
        ...formData,
        preferences
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('[PersonalInfoTab] Save error:', error);
      toast.error('Failed to save profile');
    }
  };

  const handleDistanceChange = (value: number[]) => {
    const newDistance = value[0];
    console.log('[PersonalInfoTab] Distance change:', newDistance);
    setPreferences(prev => ({
      ...prev,
      deliveryPreferences: { 
        ...prev.deliveryPreferences, 
        maxDistance: newDistance 
      }
    }));
  };

  const handleNotificationChange = (field: string, checked: boolean) => {
    console.log('[PersonalInfoTab] Notification change:', field, checked);
    setPreferences(prev => ({
      ...prev,
      notifications: { 
        ...prev.notifications, 
        [field]: checked 
      }
    }));
  };

  const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <User className="h-5 w-5 mr-2" />
            Personal Information
          </CardTitle>
          <CardDescription>Update your basic profile information</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!editing}
                className={!editing ? "bg-gray-50" : ""} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!editing}
                className={!editing ? "bg-gray-50" : ""} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!editing}
                className={!editing ? "bg-gray-50" : ""} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!editing}
                className={!editing ? "bg-gray-50" : ""} 
              />
            </div>
          </div>
          
          {editing && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} className="bg-primary hover:bg-primary-hover text-black">
                <Save className="h-4 w-4 mr-2" />
                Save Personal Info
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Delivery Preferences
          </CardTitle>
          <CardDescription>Configure your delivery operation settings</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Maximum Delivery Distance: {preferences.deliveryPreferences.maxDistance} km</Label>
              <Slider
                value={[preferences.deliveryPreferences.maxDistance]}
                onValueChange={handleDistanceChange}
                max={50}
                min={5}
                step={5}
                className="w-full"
                disabled={!editing}
              />
            </div>

            <div className="space-y-3">
              <Label>Preferred Delivery Zones</Label>
              <Input 
                placeholder="No preferred zones set"
                disabled
                className="bg-gray-50"
                value=""
              />
              <p className="text-xs text-gray-500">Preferred zones will be configured by administrators based on demand</p>
            </div>

            <div className="space-y-3">
              <Label>Available Days</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableDays.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={day}
                      checked={preferences.deliveryPreferences.availableDays.includes(day)}
                      disabled={true}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={day} className="text-sm">{day.slice(0, 3)}</Label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">Available days are currently fixed. Contact support to modify.</p>
            </div>
          </div>

          {editing && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} className="bg-primary hover:bg-primary-hover text-black">
                <Save className="h-4 w-4 mr-2" />
                Save Delivery Preferences
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">App Notifications</p>
                <p className="text-sm text-gray-500">Receive push notifications in the app</p>
              </div>
              <Switch 
                checked={preferences.notifications.app}
                onCheckedChange={(checked) => handleNotificationChange('app', checked)}
                disabled={!editing}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive important updates via email</p>
              </div>
              <Switch 
                checked={preferences.notifications.email}
                onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                disabled={!editing}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive SMS for urgent delivery updates</p>
              </div>
              <Switch 
                checked={preferences.notifications.sms}
                onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                disabled={!editing}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Communications</p>
                <p className="text-sm text-gray-500">Receive promotional offers and news</p>
              </div>
              <Switch 
                checked={preferences.notifications.marketing}
                onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                disabled={!editing}
              />
            </div>
          </div>

          {editing && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} className="bg-primary hover:bg-primary-hover text-black">
                <Save className="h-4 w-4 mr-2" />
                Save Notification Preferences
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PersonalInfoTab;
