
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Settings, Save, User, Store, MapPin, Bell, Shield, 
  CreditCard, Truck, Leaf, Lock, Mail, Eye, EyeOff,
  Camera, Upload, Pencil, CheckCircle, ChevronRight
} from 'lucide-react';

// Mock data for vendor settings
const vendorData = {
  name: 'Eco Grocery Store',
  email: 'contact@ecogrocery.com',
  phone: '+234 800 123 4567',
  address: '123 Green Street, Victoria Island, Lagos',
  logo: null,
  coverImage: null,
  storeDescription: 'We provide organic and locally sourced products with eco-friendly packaging and delivery.',
  businessHours: [
    { day: 'Monday', open: '08:00', close: '18:00' },
    { day: 'Tuesday', open: '08:00', close: '18:00' },
    { day: 'Wednesday', open: '08:00', close: '18:00' },
    { day: 'Thursday', open: '08:00', close: '18:00' },
    { day: 'Friday', open: '08:00', close: '18:00' },
    { day: 'Saturday', open: '09:00', close: '17:00' },
    { day: 'Sunday', open: 'closed', close: 'closed' }
  ],
  categories: ['Grocery', 'Organic', 'Local Produce', 'Eco-Friendly'],
  paymentMethods: ['Bank Transfer', 'Credit Card', 'Cash'],
  deliveryZones: [
    { name: 'Victoria Island', fee: 1000, minOrder: 5000 },
    { name: 'Lekki Phase 1', fee: 1500, minOrder: 5000 },
    { name: 'Ikoyi', fee: 2000, minOrder: 7500 }
  ]
};

const notifications = {
  newOrder: true,
  orderUpdates: true,
  customerMessages: true,
  marketingUpdates: false,
  dailySummary: true,
  riderAlerts: true
};

const integrations = [
  {
    name: 'Payment Gateway',
    status: 'connected',
    provider: 'Paystack',
    lastConnected: '2 weeks ago'
  },
  {
    name: 'Inventory Management',
    status: 'disconnected',
    provider: null,
    lastConnected: null
  },
  {
    name: 'Delivery Tracking',
    status: 'connected',
    provider: 'Cydex API',
    lastConnected: '1 day ago'
  }
];

const VendorSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState(notifications);
  const [showPassword, setShowPassword] = useState(false);
  const [vendorProfile, setVendorProfile] = useState(vendorData);
  
  const toggleNotification = (key) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setVendorProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <DashboardLayout userRole="vendor">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-gray-600">
              Manage your vendor account, store, and preferences
            </p>
          </div>
        </div>

        {/* Settings Tabs */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Vendor Settings</CardTitle>
            <CardDescription>Configure your store and account preferences</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="profile" onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-6">
                <TabsTrigger value="profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="store" className="flex items-center">
                  <Store className="mr-2 h-4 w-4" />
                  <span>Store</span>
                </TabsTrigger>
                <TabsTrigger value="delivery" className="flex items-center">
                  <Truck className="mr-2 h-4 w-4" />
                  <span>Delivery</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger value="integrations" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Integrations</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium">Profile Information</h2>
                    <Button 
                      variant="outline"
                      onClick={() => setEditing(!editing)}
                    >
                      {editing ? (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex flex-col items-center">
                            <div className="relative">
                              <Avatar className="h-24 w-24">
                                <AvatarFallback className="text-xl">
                                  {vendorProfile.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              {editing && (
                                <Button 
                                  variant="secondary" 
                                  size="icon" 
                                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                                >
                                  <Camera className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <h3 className="font-medium mt-4">{vendorProfile.name}</h3>
                            <Badge className="mt-2 bg-primary text-black">Vendor</Badge>
                            
                            {editing ? (
                              <Button variant="outline" className="w-full mt-4">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Logo
                              </Button>
                            ) : (
                              <p className="text-sm text-gray-500 text-center mt-4">
                                Member since August 2023
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="md:w-2/3">
                      <Card>
                        <CardContent className="pt-6 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="store-name">Store Name</Label>
                              <Input 
                                id="store-name" 
                                name="name"
                                value={vendorProfile.name} 
                                onChange={handleProfileChange}
                                disabled={!editing}
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input 
                                id="email" 
                                name="email"
                                value={vendorProfile.email} 
                                onChange={handleProfileChange}
                                disabled={!editing}
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input 
                                id="phone" 
                                name="phone"
                                value={vendorProfile.phone} 
                                onChange={handleProfileChange}
                                disabled={!editing}
                              />
                            </div>
                            <div>
                              <Label htmlFor="address">Address</Label>
                              <Input 
                                id="address" 
                                name="address"
                                value={vendorProfile.address} 
                                onChange={handleProfileChange}
                                disabled={!editing}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Label htmlFor="description">Store Description</Label>
                              <Input 
                                id="description" 
                                name="storeDescription"
                                value={vendorProfile.storeDescription} 
                                onChange={handleProfileChange}
                                disabled={!editing}
                              />
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="font-medium mb-2">Business Categories</h3>
                            <div className="flex flex-wrap gap-2">
                              {vendorProfile.categories.map((category, index) => (
                                <Badge key={index} variant="secondary">
                                  {category}
                                </Badge>
                              ))}
                              {editing && (
                                <Button variant="outline" size="sm" className="h-6">
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Store Tab */}
              <TabsContent value="store">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Store Information</CardTitle>
                      <CardDescription>Manage your store details and appearance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Store Cover Image */}
                      <div className="relative h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                        {vendorProfile.coverImage ? (
                          <img 
                            src={vendorProfile.coverImage} 
                            alt="Store Cover" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center text-gray-500">
                            <Upload className="h-8 w-8 mx-auto mb-2" />
                            <p>Upload a cover image</p>
                          </div>
                        )}
                        <Button 
                          variant="secondary"
                          size="sm"
                          className="absolute bottom-2 right-2"
                        >
                          <Camera className="h-4 w-4 mr-1" />
                          Change Cover
                        </Button>
                      </div>
                      
                      {/* Business Hours */}
                      <div>
                        <h3 className="font-medium mb-3">Business Hours</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {vendorProfile.businessHours.map((hours, index) => (
                            <div key={index} className="flex justify-between p-2 border-b">
                              <span className="font-medium">{hours.day}</span>
                              <span className="text-gray-600">
                                {hours.open === 'closed' ? 
                                  'Closed' : 
                                  `${hours.open} - ${hours.close}`
                                }
                              </span>
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" size="sm" className="mt-3">
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit Hours
                        </Button>
                      </div>
                      
                      {/* Payment Methods */}
                      <div>
                        <h3 className="font-medium mb-3">Payment Methods</h3>
                        <div className="flex flex-wrap gap-2">
                          {vendorProfile.paymentMethods.map((method, index) => (
                            <Badge key={index} variant="outline">
                              {method}
                            </Badge>
                          ))}
                          <Button variant="outline" size="sm" className="h-6">
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-primary hover:bg-primary-hover text-black">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* SEO Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">SEO Settings</CardTitle>
                      <CardDescription>Optimize your store for search engines</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="meta-title">Meta Title</Label>
                        <Input id="meta-title" placeholder="Enter meta title" />
                      </div>
                      <div>
                        <Label htmlFor="meta-description">Meta Description</Label>
                        <Input id="meta-description" placeholder="Enter meta description" />
                      </div>
                      <div>
                        <Label htmlFor="keywords">Keywords</Label>
                        <Input id="keywords" placeholder="Enter keywords separated by commas" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">
                        Save SEO Settings
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              {/* Delivery Tab */}
              <TabsContent value="delivery">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Delivery Zones</CardTitle>
                      <CardDescription>Manage areas where you offer delivery services</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {vendorProfile.deliveryZones.map((zone, index) => (
                        <div key={index} className="border rounded-md p-4 hover:bg-gray-50">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <h3 className="font-medium">{zone.name}</h3>
                              <div className="text-sm text-gray-600 mt-1">
                                <span className="flex items-center">
                                  <Truck className="h-3 w-3 mr-1" />
                                  Delivery Fee: ₦{zone.fee.toLocaleString()}
                                </span>
                                <span className="flex items-center mt-1">
                                  <CreditCard className="h-3 w-3 mr-1" />
                                  Min. Order: ₦{zone.minOrder.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex mt-3 md:mt-0">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="ml-2 text-red-600">
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button className="w-full flex items-center justify-center">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Delivery Zone
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* Delivery Options */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Delivery Options</CardTitle>
                      <CardDescription>Configure your delivery settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Eco-Friendly Delivery</h3>
                          <p className="text-sm text-gray-600">Use only green transportation options</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Express Delivery</h3>
                          <p className="text-sm text-gray-600">Offer express delivery option (30 min)</p>
                        </div>
                        <Switch checked={false} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Free Delivery Threshold</h3>
                          <p className="text-sm text-gray-600">Minimum order amount for free delivery</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">₦15,000</span>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Default Preparation Time</h3>
                          <p className="text-sm text-gray-600">Estimated time to prepare orders</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">20 minutes</span>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-primary hover:bg-primary-hover text-black">
                        Save Delivery Settings
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Notification Preferences</CardTitle>
                    <CardDescription>Control what notifications you receive</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Order Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">New Orders</p>
                              <p className="text-sm text-gray-600">Get notified when you receive a new order</p>
                            </div>
                            <Switch 
                              checked={notificationSettings.newOrder} 
                              onCheckedChange={() => toggleNotification('newOrder')}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Order Updates</p>
                              <p className="text-sm text-gray-600">Get notified about order status changes</p>
                            </div>
                            <Switch 
                              checked={notificationSettings.orderUpdates} 
                              onCheckedChange={() => toggleNotification('orderUpdates')}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Communication</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Customer Messages</p>
                              <p className="text-sm text-gray-600">Get notified when customers send you messages</p>
                            </div>
                            <Switch 
                              checked={notificationSettings.customerMessages} 
                              onCheckedChange={() => toggleNotification('customerMessages')}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Marketing Updates</p>
                              <p className="text-sm text-gray-600">Receive promotion and marketing tips</p>
                            </div>
                            <Switch 
                              checked={notificationSettings.marketingUpdates} 
                              onCheckedChange={() => toggleNotification('marketingUpdates')}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Reports & Riders</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Daily Summary</p>
                              <p className="text-sm text-gray-600">Receive daily summary of sales and orders</p>
                            </div>
                            <Switch 
                              checked={notificationSettings.dailySummary} 
                              onCheckedChange={() => toggleNotification('dailySummary')}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Rider Alerts</p>
                              <p className="text-sm text-gray-600">Get notified about rider pickups and deliveries</p>
                            </div>
                            <Switch 
                              checked={notificationSettings.riderAlerts} 
                              onCheckedChange={() => toggleNotification('riderAlerts')}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-primary hover:bg-primary-hover text-black">
                      Save Notification Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Change Password</CardTitle>
                      <CardDescription>Update your account password</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative">
                          <Input 
                            id="current-password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter your current password" 
                          />
                          <Button 
                            variant="ghost"
                            size="icon"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-0 h-10"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Input 
                            id="new-password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter new password" 
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <div className="relative">
                          <Input 
                            id="confirm-password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Confirm new password" 
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-primary hover:bg-primary-hover text-black">
                        <Lock className="mr-2 h-4 w-4" />
                        Update Password
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Two-Factor Authentication */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
                      <CardDescription>Add an extra layer of security to your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enable Two-Factor Authentication</p>
                          <p className="text-sm text-gray-600">
                            Secure your account with SMS verification codes
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="border rounded-md p-4 bg-gray-50">
                        <p className="text-sm text-gray-600">
                          When two-factor authentication is enabled, you'll be required to provide a verification code each time you sign in.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Session Management */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Account Sessions</CardTitle>
                      <CardDescription>View and manage your active sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="border rounded-md p-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-gray-600">
                              Chrome on Windows • Lagos, Nigeria
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Started: Today at 9:24 AM
                            </p>
                          </div>
                          <Badge className="bg-green-500">Active Now</Badge>
                        </div>
                        
                        <div className="border rounded-md p-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium">Safari on iPhone</p>
                            <p className="text-sm text-gray-600">
                              Mobile • Lagos, Nigeria
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Last active: Yesterday at 6:30 PM
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            End Session
                          </Button>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="mt-4 w-full">
                        Sign Out of All Sessions
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Integrations Tab */}
              <TabsContent value="integrations">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Connected Services</CardTitle>
                      <CardDescription>Manage services integrated with your store</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {integrations.map((integration, index) => (
                        <div 
                          key={index}
                          className="border rounded-md p-4 hover:bg-gray-50"
                        >
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h3 className="font-medium">{integration.name}</h3>
                              <div className="flex items-center mt-1">
                                {integration.status === 'connected' ? (
                                  <>
                                    <Badge className="bg-green-500">Connected</Badge>
                                    <span className="text-sm text-gray-600 ml-2">
                                      {integration.provider} • Updated {integration.lastConnected}
                                    </span>
                                  </>
                                ) : (
                                  <Badge variant="outline" className="text-amber-500 border-amber-500">
                                    Not Connected
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button 
                              variant={integration.status === 'connected' ? 'outline' : 'default'}
                              className={`mt-3 md:mt-0 ${
                                integration.status !== 'connected' ? 'bg-primary hover:bg-primary-hover text-black' : ''
                              }`}
                            >
                              {integration.status === 'connected' ? 'Manage' : 'Connect'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  
                  {/* API Access */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">API Access</CardTitle>
                      <CardDescription>Manage your API keys for developers</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Generate API Key</p>
                          <p className="text-sm text-gray-600">
                            Create API keys for external applications
                          </p>
                        </div>
                        <Button variant="outline">Generate Key</Button>
                      </div>
                      
                      <div className="border rounded-md p-4 bg-gray-50">
                        <p className="text-sm text-gray-600">
                          No API keys have been generated yet. API keys allow external applications to access your store data securely.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Sustainability Integration */}
                  <Card className="border-green-100 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Leaf className="mr-2 h-5 w-5 text-green-600" />
                        Sustainability Features
                      </CardTitle>
                      <CardDescription>Connect with eco-friendly partners and initiatives</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Carbon Offset Tracking</p>
                          <p className="text-sm text-gray-600">
                            Track and display your carbon offset with each order
                          </p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Green Packaging Program</p>
                          <p className="text-sm text-gray-600">
                            Connect with sustainable packaging partners
                          </p>
                        </div>
                        <Button variant="outline" className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                          Enrolled
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Recycling Partner API</p>
                          <p className="text-sm text-gray-600">
                            Connect with local recycling services
                          </p>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="text-green-600 flex items-center p-0">
                        Learn more about sustainability features
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VendorSettings;
