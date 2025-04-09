
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  User, Mail, Phone, MapPin, Building, Calendar, 
  Shield, Bell, Globe, CreditCard, Settings, Lock,
  CheckCircle, ExternalLink, ChevronRight, Edit
} from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();
  const [formState, setFormState] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+234 801 234 5678',
    address: '123 Green Street, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    birthdate: '1990-05-15',
    gender: 'male'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: false,
    riderLocation: true,
    appUpdates: true,
    emailNotifications: false
  });
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (key) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const handleSaveChanges = () => {
    console.log('Saving profile changes:', formState);
    // In a real app, this would send the updated profile to the backend
  };
  
  const handleSaveNotifications = () => {
    console.log('Saving notification settings:', notificationSettings);
    // In a real app, this would send the updated notification settings to the backend
  };

  return (
    <DashboardLayout userRole="customer">
      <div className="p-2 sm:p-4 md:p-6 max-w-full mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <p className="text-gray-600">
              Manage your account details and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <Card className="lg:col-span-1">
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                  <AvatarFallback className="text-lg">{user?.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{user?.name || 'John Doe'}</h3>
                <p className="text-gray-500 text-sm">Customer</p>
                
                <div className="mt-2 flex items-center">
                  <Badge className="bg-green-500">Verified Account</Badge>
                </div>
                
                <Button className="mt-4 w-full flex items-center justify-center" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4 text-left">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <p className="text-sm truncate">{formState.email}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <p className="text-sm">{formState.phone}</p>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <p className="text-sm truncate">{formState.address}</p>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <p className="text-sm">Member since Jun 2023</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h4 className="font-medium mb-3 text-left">Account Level</h4>
                <div className="bg-primary-light p-3 rounded-lg text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Green Champion</span>
                    <Badge variant="outline">Tier 2</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">240 points • Next tier: 300</p>
                  <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="mt-4 w-full">
                View Rewards Program
              </Button>
            </CardContent>
          </Card>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="mb-4 grid grid-cols-3 md:w-auto md:inline-flex">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formState.fullName}
                          onChange={handleFormChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleFormChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleFormChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="birthdate">Date of Birth</Label>
                        <Input
                          id="birthdate"
                          name="birthdate"
                          type="date"
                          value={formState.birthdate}
                          onChange={handleFormChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          value={formState.gender}
                          onValueChange={(value) => 
                            setFormState(prev => ({ ...prev, gender: value }))
                          }
                        >
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="non-binary">Non-binary</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  
                  <Separator />
                  
                  <CardHeader>
                    <CardTitle>Address Information</CardTitle>
                    <CardDescription>
                      Update your delivery addresses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formState.address}
                          onChange={handleFormChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formState.city}
                          onChange={handleFormChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formState.state}
                          onChange={handleFormChange}
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="country">Country</Label>
                        <Select
                          value={formState.country}
                          onValueChange={(value) => 
                            setFormState(prev => ({ ...prev, country: value }))
                          }
                        >
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Nigeria">Nigeria</SelectItem>
                            <SelectItem value="Ghana">Ghana</SelectItem>
                            <SelectItem value="Kenya">Kenya</SelectItem>
                            <SelectItem value="South Africa">South Africa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="md:col-span-2 flex items-center justify-between py-2 border-t border-dashed">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-medium">Saved Addresses</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                      
                      <div className="md:col-span-2 p-3 border rounded-lg flex justify-between items-center">
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">Home</span>
                            <Badge className="ml-2 bg-primary text-black">Default</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{formState.address}, {formState.city}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="md:col-span-2 p-3 border rounded-lg flex justify-between items-center">
                        <div>
                          <span className="font-medium">Work</span>
                          <p className="text-sm text-gray-500 mt-1">45 Business Avenue, Victoria Island, Lagos</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button 
                      className="bg-primary hover:bg-primary-hover text-black"
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg divide-y">
                      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <div className="flex items-center">
                            <Lock className="h-4 w-4 text-primary mr-2" />
                            <h3 className="font-medium">Password</h3>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Last changed 30 days ago</p>
                        </div>
                        <Button variant="outline">Change Password</Button>
                      </div>
                      
                      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-primary mr-2" />
                            <h3 className="font-medium">Two-Factor Authentication</h3>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Add an extra layer of security</p>
                        </div>
                        <div className="flex items-center">
                          <Badge className="mr-2 bg-yellow-500">Recommended</Badge>
                          <Button variant="outline">Enable</Button>
                        </div>
                      </div>
                      
                      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 text-primary mr-2" />
                            <h3 className="font-medium">Active Sessions</h3>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Manage your active sessions</p>
                        </div>
                        <Button variant="outline">View</Button>
                      </div>
                      
                      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 text-primary mr-2" />
                            <h3 className="font-medium">Connected Apps</h3>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Manage third-party access</p>
                        </div>
                        <Button variant="outline">Manage</Button>
                      </div>
                      
                      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 text-primary mr-2" />
                            <h3 className="font-medium">Login Activity</h3>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">View recent login attempts</p>
                        </div>
                        <Button variant="outline">View</Button>
                      </div>
                    </div>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Privacy Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Profile Visibility</h4>
                            <p className="text-sm text-gray-500">Control who can see your profile</p>
                          </div>
                          <Select defaultValue="friends">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="friends">Friends</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Location Sharing</h4>
                            <p className="text-sm text-gray-500">Share location with delivery riders</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Data Usage</h4>
                            <p className="text-sm text-gray-500">Allow data for app improvements</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset</Button>
                    <Button className="bg-primary hover:bg-primary-hover text-black">
                      Save Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg divide-y">
                        <div className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Order Updates</h3>
                            <p className="text-sm text-gray-500">Notifications about your orders</p>
                          </div>
                          <Switch
                            checked={notificationSettings.orderUpdates}
                            onCheckedChange={() => handleNotificationChange('orderUpdates')}
                          />
                        </div>
                        
                        <div className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Promotions & Offers</h3>
                            <p className="text-sm text-gray-500">New deals and special offers</p>
                          </div>
                          <Switch
                            checked={notificationSettings.promotions}
                            onCheckedChange={() => handleNotificationChange('promotions')}
                          />
                        </div>
                        
                        <div className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Rider Location Updates</h3>
                            <p className="text-sm text-gray-500">Real-time location of your delivery</p>
                          </div>
                          <Switch
                            checked={notificationSettings.riderLocation}
                            onCheckedChange={() => handleNotificationChange('riderLocation')}
                          />
                        </div>
                        
                        <div className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">App Updates</h3>
                            <p className="text-sm text-gray-500">New features and improvements</p>
                          </div>
                          <Switch
                            checked={notificationSettings.appUpdates}
                            onCheckedChange={() => handleNotificationChange('appUpdates')}
                          />
                        </div>
                      </div>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Communication Channels</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">Push Notifications</h4>
                              <p className="text-sm text-gray-500">Receive alerts on your device</p>
                            </div>
                            <Select defaultValue="all">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="important">Important</SelectItem>
                                <SelectItem value="none">None</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">Email Notifications</h4>
                              <p className="text-sm text-gray-500">Receive updates via email</p>
                            </div>
                            <Switch
                              checked={notificationSettings.emailNotifications}
                              onCheckedChange={() => handleNotificationChange('emailNotifications')}
                            />
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">SMS Notifications</h4>
                              <p className="text-sm text-gray-500">Receive text messages</p>
                            </div>
                            <Switch defaultChecked={false} />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
                        <Bell className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-amber-800">Delivery Notifications</h4>
                          <p className="text-sm text-amber-700">Delivery notifications cannot be disabled as they're essential for our service.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset to Default</Button>
                    <Button 
                      className="bg-primary hover:bg-primary-hover text-black"
                      onClick={handleSaveNotifications}
                    >
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
