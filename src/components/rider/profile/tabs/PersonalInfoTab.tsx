
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Smartphone, Mail, MessageSquare, Bell } from 'lucide-react';

interface PersonalInfoTabProps {
  editing: boolean;
  profile: any;
}

const PersonalInfoTab = ({ editing, profile }: PersonalInfoTabProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
          <CardDescription>Your basic profile details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={profile.name} 
                  readOnly={!editing} 
                  className={editing ? "" : "bg-gray-50"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  value={profile.email} 
                  readOnly={!editing} 
                  className={editing ? "" : "bg-gray-50"}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={profile.phone || ''} 
                  readOnly={!editing} 
                  className={editing ? "" : "bg-gray-50"}
                  placeholder="Add your phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alternatePhone">Alternate Phone (Optional)</Label>
                <Input 
                  id="alternatePhone" 
                  placeholder="Add alternate number" 
                  readOnly={!editing} 
                  className={editing ? "" : "bg-gray-50"}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                value={profile.address || ''} 
                readOnly={!editing} 
                className={editing ? "" : "bg-gray-50"}
                placeholder="Add your address"
              />
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <h3 className="font-medium">Delivery Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="maxDistance">Maximum Delivery Distance</Label>
                  <div className="flex items-center">
                    <Input 
                      id="maxDistance" 
                      type="number"
                      value={profile.preferences.deliveryPreferences.maxDistance} 
                      readOnly={!editing} 
                      className={`w-20 ${editing ? "" : "bg-gray-50"}`}
                    />
                    <span className="ml-2">km</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Preferred Delivery Zones</Label>
                  <div className="p-3 border rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-500">No preferred zones set. All zones available.</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Available Days (Read-only)</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <Badge 
                        key={day} 
                        variant={profile.preferences.deliveryPreferences.availableDays.includes(day) ? "default" : "outline"}
                        className={!profile.preferences.deliveryPreferences.availableDays.includes(day) ? "text-gray-400" : ""}
                      >
                        {day}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Contact support to modify your availability</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Control how and when you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="app-notifications" className="flex items-center">
                <Smartphone className="h-5 w-5 mr-2 text-gray-500" />
                App Notifications
              </Label>
              <Switch 
                id="app-notifications" 
                checked={profile.preferences.notifications.app} 
                disabled={!editing}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-500" />
                Email Notifications
              </Label>
              <Switch 
                id="email-notifications" 
                checked={profile.preferences.notifications.email} 
                disabled={!editing}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications" className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-gray-500" />
                SMS Notifications
              </Label>
              <Switch 
                id="sms-notifications" 
                checked={profile.preferences.notifications.sms} 
                disabled={!editing}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing-notifications" className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-gray-500" />
                  Marketing & Promotions
                </Label>
                <p className="text-xs text-gray-500 ml-7">Receive updates about promotions and special offers</p>
              </div>
              <Switch 
                id="marketing-notifications" 
                checked={profile.preferences.notifications.marketing} 
                disabled={!editing}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PersonalInfoTab;
