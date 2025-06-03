import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

import ProfileAvatar from '@/components/customer/profile/ProfileAvatar';
import ProfileForm from '@/components/customer/profile/ProfileForm';
import SecuritySettings from '@/components/customer/profile/SecuritySettings';
import PreferencesSettings from '@/components/customer/profile/PreferencesSettings';
import AccountSummary from '@/components/customer/profile/AccountSummary';
import RecentActivity from '@/components/customer/profile/RecentActivity';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+234 803 123 4567',
    address: '15 Green Avenue, Victoria Island, Lagos',
    dateJoined: 'March 2023',
    carbonCredits: 450,
    ordersCompleted: 127,
    sustainabilityScore: 8.7
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="p-2 sm:p-4 md:p-6 max-w-full mx-auto space-y-3 sm:space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">My Profile</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage your profile information and settings
            </p>
          </div>
          <Button 
            onClick={() => setIsEditing(true)} 
            disabled={isEditing}
            className="text-sm sm:text-base w-full sm:w-auto"
          >
            <Settings className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Edit Profile
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Profile Information</CardTitle>
            <CardDescription className="text-sm">View and update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="mb-3 sm:mb-4 w-full">
                <TabsTrigger value="account" className="text-xs sm:text-sm flex-1">Account</TabsTrigger>
                <TabsTrigger value="security" className="text-xs sm:text-sm flex-1">Security</TabsTrigger>
                <TabsTrigger value="preferences" className="text-xs sm:text-sm flex-1">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                  <ProfileAvatar name={profileData.name} />
                  <ProfileForm 
                    profileData={profileData}
                    isEditing={isEditing}
                    handleInputChange={handleInputChange}
                    handleSave={handleSave}
                    setIsEditing={setIsEditing}
                  />
                </div>
              </TabsContent>

              <TabsContent value="security">
                <SecuritySettings />
              </TabsContent>

              <TabsContent value="preferences">
                <PreferencesSettings />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <AccountSummary profileData={profileData} />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
