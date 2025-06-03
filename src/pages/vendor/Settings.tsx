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
      <div className="p-3 sm:p-4 md:p-6 max-w-full mx-auto space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage your store settings and profile information
            </p>
          </div>
          <Button 
            onClick={() => setIsEditing(true)} 
            disabled={isEditing}
            className="w-full sm:w-auto text-xs sm:text-sm"
          >
            <SettingsIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Edit Profile
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">Store Information</CardTitle>
            <CardDescription className="text-sm">View and update your store details</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="mb-3 sm:mb-4 w-full grid grid-cols-3 sm:w-auto sm:flex">
                <TabsTrigger value="account" className="text-xs sm:text-sm">Account</TabsTrigger>
                <TabsTrigger value="security" className="text-xs sm:text-sm">Security</TabsTrigger>
                <TabsTrigger value="preferences" className="text-xs sm:text-sm">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="mt-3 sm:mt-4">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                  <div className="lg:w-1/3 flex flex-col items-center">
                    <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                      <AvatarImage src="https://api.dicebear.com/7.x/pixel-art/svg?seed=GreenFoods" />
                      <AvatarFallback className="text-lg sm:text-xl">GF</AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" size="sm" className="mt-2 text-xs sm:text-sm">
                      <Camera className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Change Logo
                    </Button>
                  </div>

                  <div className="lg:w-2/3 space-y-3 sm:space-y-4">
                    <FormField
                      id="name"
                      label="Store Name"
                      placeholder="Your Store Name"
                      value={profileData.name}
                      onChange={(value) => handleInputChange('name', value)}
                      disabled={!isEditing}
                    />
                    
                    <FormField
                      id="email"
                      label="Email Address"
                      placeholder="Your Email"
                      value={profileData.email}
                      onChange={(value) => handleInputChange('email', value)}
                      disabled={!isEditing}
                    />
                    
                    <FormField
                      id="phone"
                      label="Phone Number"
                      placeholder="Your Phone"
                      value={profileData.phone}
                      onChange={(value) => handleInputChange('phone', value)}
                      disabled={!isEditing}
                    />
                    
                    <FormField
                      id="address"
                      label="Address"
                      placeholder="Your Address"
                      value={profileData.address}
                      onChange={(value) => handleInputChange('address', value)}
                      disabled={!isEditing}
                    />
                    
                    <FormField
                      id="description"
                      label="Description"
                      placeholder="Your Store Description"
                      value={profileData.description}
                      onChange={(value) => handleInputChange('description', value)}
                      disabled={!isEditing}
                      isTextarea
                    />
                    
                    <FormField
                      id="businessLicense"
                      label="Business License"
                      placeholder="Your Business License"
                      value={profileData.businessLicense}
                      onChange={(value) => handleInputChange('businessLicense', value)}
                      disabled={!isEditing}
                    />
                    
                    <FormField
                      id="category"
                      label="Category"
                      placeholder="Your Category"
                      value={profileData.category}
                      onChange={(value) => handleInputChange('category', value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-0 mt-4 sm:mt-6">
                    <Button 
                      variant="secondary" 
                      onClick={() => setIsEditing(false)} 
                      className="w-full sm:w-auto sm:mr-2 text-xs sm:text-sm"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSave}
                      className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="security" className="mt-3 sm:mt-4">
                <div className="space-y-3 sm:space-y-4">
                  <SecurityCard
                    title="Password"
                    description="Change your password to keep your account secure."
                    action={<Button className="text-xs sm:text-sm">Change Password</Button>}
                  />

                  <SecurityCard
                    title="Two-Factor Authentication"
                    description="Add an extra layer of security to your account."
                    action={
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm sm:text-base">Enable Two-Factor Authentication</span>
                        <Switch id="2fa" />
                      </div>
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="mt-3 sm:mt-4">
                <div className="space-y-3 sm:space-y-4">
                  <PreferenceCard
                    title="Notification Preferences"
                    description="Manage your notification settings."
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm sm:text-base">Email Notifications</span>
                        <Switch id="email-notifications" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm sm:text-base">Push Notifications</span>
                        <Switch id="push-notifications" />
                      </div>
                    </div>
                  </PreferenceCard>

                  <PreferenceCard
                    title="Appearance"
                    description="Customize the look and feel of your account."
                  >
                    <Button className="text-xs sm:text-sm">Change Theme</Button>
                  </PreferenceCard>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">Store Summary</CardTitle>
              <CardDescription className="text-sm">Your store activity at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <SummaryItem
                icon={<Store className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />}
                title="125 Products"
                description="Total products in your store"
              />
              <SummaryItem
                icon={<Package className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />}
                title="450 Orders"
                description="Orders completed this month"
              />
              <SummaryItem
                icon={<CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />}
                title="₦1,500,000 Revenue"
                description="Total revenue this month"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
              <CardDescription className="text-sm">Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <ActivityItem
                icon={<Bell className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />}
                title="New order received!"
                description="Order #12345 placed by John Doe"
              />
              <ActivityItem
                icon={<FileText className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />}
                title="Product updated"
                description="Eco-friendly water bottle updated"
              />
              <ActivityItem
                icon={<HelpCircle className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />}
                title="Support request"
                description="New support request from Jane Smith"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

const FormField = ({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange, 
  disabled, 
  isTextarea = false 
}) => (
  <div className="space-y-1 sm:space-y-2">
    <Label htmlFor={id} className="text-sm sm:text-base">{label}</Label>
    {isTextarea ? (
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="text-sm sm:text-base"
      />
    ) : (
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="text-sm sm:text-base"
      />
    )}
  </div>
);

const SecurityCard = ({ title, description, action }) => (
  <Card className="shadow-none">
    <CardHeader className="pb-2 sm:pb-4">
      <CardTitle className="text-sm sm:text-base">{title}</CardTitle>
      <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      {action}
    </CardContent>
  </Card>
);

const PreferenceCard = ({ title, description, children }) => (
  <Card className="shadow-none">
    <CardHeader className="pb-2 sm:pb-4">
      <CardTitle className="text-sm sm:text-base">{title}</CardTitle>
      <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

const SummaryItem = ({ icon, title, description }) => (
  <div className="flex items-center space-x-3 sm:space-x-4">
    {icon}
    <div>
      <h3 className="text-base sm:text-lg font-medium">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

const ActivityItem = ({ icon, title, description }) => (
  <div className="flex items-start space-x-3 sm:space-x-4">
    <div className="flex-shrink-0 mt-0.5">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <h3 className="text-sm sm:text-base font-medium">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-500 truncate">{description}</p>
    </div>
  </div>
);

export default VendorSettingsPage;
