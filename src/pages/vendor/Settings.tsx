import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  Lock,
  CreditCard,
  Store,
  Package,
  Settings as SettingsIcon,
  Camera,
  FileText,
  HelpCircle
} from 'lucide-react';

const VendorSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Green Foods Market',
    email: 'vendor@greenfoods.com',
    phone: '+234 803 123 4567',
    address: '123 Eco Street, Victoria Island, Lagos',
    description: 'Your one-stop shop for organic and sustainable products. We are committed to providing high-quality eco-friendly items that help protect our environment.',
    businessLicense: 'BL-2023-12345',
    category: 'Grocery & Organic Foods'
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
    <DashboardLayout userRole="VENDOR">
      <div className="p-2 sm:p-4 md:p-6 max-w-full mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-gray-600">
              Manage your store settings and profile information
            </p>
          </div>
          <Button onClick={() => setIsEditing(true)} disabled={isEditing}>
            <SettingsIcon className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
            <CardDescription>View and update your store details</CardDescription>
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
                      <AvatarImage src="https://api.dicebear.com/7.x/pixel-art/svg?seed=GreenFoods" />
                      <AvatarFallback>GF</AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" size="sm" className="mt-2">
                      <Camera className="mr-2 h-4 w-4" />
                      Change Logo
                    </Button>
                  </div>

                  <div className="md:w-2/3 space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="name">Store Name</Label>
                      <Input
                        id="name"
                        placeholder="Your Store Name"
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
                    <div className="space-y-1">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Your Store Description"
                        value={profileData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="businessLicense">Business License</Label>
                      <Input
                        id="businessLicense"
                        placeholder="Your Business License"
                        value={profileData.businessLicense}
                        onChange={(e) => handleInputChange('businessLicense', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        placeholder="Your Category"
                        value={profileData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
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
              <CardTitle>Store Summary</CardTitle>
              <CardDescription>Your store activity at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Store className="h-6 w-6 text-green-500" />
                <div>
                  <h3 className="text-lg font-medium">125 Products</h3>
                  <p className="text-sm text-gray-500">Total products in your store</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Package className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="text-lg font-medium">450 Orders</h3>
                  <p className="text-sm text-gray-500">Orders completed this month</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <CreditCard className="h-6 w-6 text-amber-500" />
                <div>
                  <h3 className="text-lg font-medium">₦1,500,000 Revenue</h3>
                  <p className="text-sm text-gray-500">Total revenue this month</p>
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
                  <h3 className="text-lg font-medium">New order received!</h3>
                  <p className="text-sm text-gray-500">Order #12345 placed by John Doe</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-gray-500" />
                <div>
                  <h3 className="text-lg font-medium">Product updated</h3>
                  <p className="text-sm text-gray-500">Eco-friendly water bottle updated</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <HelpCircle className="h-6 w-6 text-gray-500" />
                <div>
                  <h3 className="text-lg font-medium">Support request</h3>
                  <p className="text-sm text-gray-500">New support request from Jane Smith</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorSettingsPage;
