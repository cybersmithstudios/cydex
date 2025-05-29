
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Lock,
  CreditCard,
  Leaf,
  Award,
  Settings,
  Camera,
  Package
} from 'lucide-react';

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
      <div className="p-2 sm:p-4 md:p-6 max-w-full mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-gray-600">
              Manage your profile information and settings
            </p>
          </div>
          <Button onClick={() => setIsEditing(true)} disabled={isEditing}>
            <Settings className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>View and update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <div className="flex flex-col md:flex-row gap-6">
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
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end mt-4">
                    <Button variant="secondary" onClick={() => setIsEditing(false)} className="mr-2">
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="security">
                <div className="space-y-4">
                  <Card className="shadow-none">
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>Change your password to keep your account secure.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button>Change Password</Button>
                    </CardContent>
                  </Card>

                  <Card className="shadow-none">
                    <CardHeader>
                      <CardTitle>Two-Factor Authentication</CardTitle>
                      <CardDescription>Add an extra layer of security to your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span>Enable Two-Factor Authentication</span>
                        <Switch id="2fa" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="preferences">
                <div className="space-y-4">
                  <Card className="shadow-none">
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Manage your notification settings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span>Email Notifications</span>
                        <Switch id="email-notifications" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Push Notifications</span>
                        <Switch id="push-notifications" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-none">
                    <CardHeader>
                      <CardTitle>Appearance</CardTitle>
                      <CardDescription>Customize the look and feel of your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button>Change Theme</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
              <CardDescription>Your account activity at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Leaf className="h-6 w-6 text-green-500" />
                <div>
                  <h3 className="text-lg font-medium">{profileData.carbonCredits} Carbon Credits</h3>
                  <p className="text-sm text-gray-500">Earn more by recycling and making eco-friendly choices</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Award className="h-6 w-6 text-amber-500" />
                <div>
                  <h3 className="text-lg font-medium">{profileData.sustainabilityScore} Sustainability Score</h3>
                  <p className="text-sm text-gray-500">Based on your eco-friendly actions</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Package className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="text-lg font-medium">{profileData.ordersCompleted} Orders Completed</h3>
                  <p className="text-sm text-gray-500">Since joining in {profileData.dateJoined}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Bell className="h-6 w-6 text-gray-500" />
                <div>
                  <h3 className="text-lg font-medium">New badge earned!</h3>
                  <p className="text-sm text-gray-500">You've earned the "Eco-Warrior" badge</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <CreditCard className="h-6 w-6 text-gray-500" />
                <div>
                  <h3 className="text-lg font-medium">Payment method added</h3>
                  <p className="text-sm text-gray-500">You've added a new credit card</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Lock className="h-6 w-6 text-gray-500" />
                <div>
                  <h3 className="text-lg font-medium">Password changed</h3>
                  <p className="text-sm text-gray-500">You've successfully changed your password</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
