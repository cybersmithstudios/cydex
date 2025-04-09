
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  User, 
  Store, 
  CreditCard, 
  Bell, 
  Shield, 
  Key, 
  Users, 
  FileText,
  HelpCircle,
  Lock,
  Mail,
  Phone,
  Upload,
  CheckCircle,
  Info,
  AlertTriangle
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const businessHours = [
  { day: 'Monday', open: '08:00', close: '18:00', isOpen: true },
  { day: 'Tuesday', open: '08:00', close: '18:00', isOpen: true },
  { day: 'Wednesday', open: '08:00', close: '18:00', isOpen: true },
  { day: 'Thursday', open: '08:00', close: '18:00', isOpen: true },
  { day: 'Friday', open: '08:00', close: '18:00', isOpen: true },
  { day: 'Saturday', open: '10:00', close: '16:00', isOpen: true },
  { day: 'Sunday', open: '10:00', close: '14:00', isOpen: false }
];

const teamMembers = [
  { id: 1, name: 'John Smith', email: 'john@greengrocers.com', role: 'Owner', status: 'active' },
  { id: 2, name: 'Sarah Williams', email: 'sarah@greengrocers.com', role: 'Manager', status: 'active' },
  { id: 3, name: 'Michael Davis', email: 'michael@greengrocers.com', role: 'Staff', status: 'invited' }
];

const notificationSettings = [
  { id: 'new_order', title: 'New Orders', description: 'Get notified when a new order is placed', enabled: true, email: true, push: true, sms: false },
  { id: 'order_updates', title: 'Order Updates', description: 'Notification about order status changes', enabled: true, email: true, push: true, sms: false },
  { id: 'recycling_pickup', title: 'Recycling Pickups', description: 'Reminders about scheduled recycling pickups', enabled: true, email: true, push: true, sms: false },
  { id: 'payment_received', title: 'Payment Received', description: 'Get notified when payments are processed', enabled: true, email: true, push: false, sms: false },
  { id: 'sustainable_tips', title: 'Sustainability Tips', description: 'Weekly tips to improve your eco-footprint', enabled: true, email: true, push: false, sms: false },
  { id: 'marketing', title: 'Marketing Updates', description: 'News and promotional opportunities', enabled: false, email: false, push: false, sms: false }
];

const SettingsPage = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('profile');
  const [businessName, setBusinessName] = useState('Green Grocers');
  const [businessEmail, setBusinessEmail] = useState('contact@greengrocers.com');
  const [businessPhone, setBusinessPhone] = useState('+234 801 234 5678');
  const [businessDescription, setBusinessDescription] = useState('We provide eco-friendly organic produce and sustainable grocery items.');
  const [businessAddress, setBusinessAddress] = useState('123 Eco Street, Lagos, Nigeria');
  const [notifications, setNotifications] = useState(notificationSettings);

  const updateNotificationSetting = (id, field, value) => {
    setNotifications(notifications.map(notification => {
      if (notification.id === id) {
        return { ...notification, [field]: value };
      }
      return notification;
    }));
  };

  return (
    <DashboardLayout userRole="vendor">
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-gray-600">Manage your account and business preferences</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-0">
                <div className="space-y-1 py-2">
                  <Button 
                    variant={activeTab === 'profile' ? 'default' : 'ghost'} 
                    className="w-full justify-start pl-3" 
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button 
                    variant={activeTab === 'business' ? 'default' : 'ghost'} 
                    className="w-full justify-start pl-3" 
                    onClick={() => setActiveTab('business')}
                  >
                    <Store className="mr-2 h-4 w-4" />
                    Business Profile
                  </Button>
                  <Button 
                    variant={activeTab === 'team' ? 'default' : 'ghost'} 
                    className="w-full justify-start pl-3" 
                    onClick={() => setActiveTab('team')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Team Management
                  </Button>
                  <Button 
                    variant={activeTab === 'billing' ? 'default' : 'ghost'} 
                    className="w-full justify-start pl-3" 
                    onClick={() => setActiveTab('billing')}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing & Plans
                  </Button>
                  <Button 
                    variant={activeTab === 'notifications' ? 'default' : 'ghost'} 
                    className="w-full justify-start pl-3" 
                    onClick={() => setActiveTab('notifications')}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                  <Button 
                    variant={activeTab === 'security' ? 'default' : 'ghost'} 
                    className="w-full justify-start pl-3" 
                    onClick={() => setActiveTab('security')}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Security
                  </Button>
                  <Button 
                    variant={activeTab === 'legal' ? 'default' : 'ghost'} 
                    className="w-full justify-start pl-3" 
                    onClick={() => setActiveTab('legal')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Legal & Compliance
                  </Button>
                  <Button 
                    variant={activeTab === 'help' ? 'default' : 'ghost'} 
                    className="w-full justify-start pl-3" 
                    onClick={() => setActiveTab('help')}
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help & Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Mobile Tabs */}
          <div className="md:hidden w-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="more">More</TabsTrigger>
              </TabsList>
              
              <TabsContent value="more">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => setActiveTab('billing')}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Billing & Plans
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => setActiveTab('notifications')}
                      >
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => setActiveTab('security')}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Security
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => setActiveTab('legal')}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Legal & Compliance
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => setActiveTab('help')}
                      >
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Help & Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Content Area */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <Avatar className="w-20 h-20">
                        <AvatarFallback className="text-xl">JS</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="font-semibold">{user?.name || 'John Smith'}</h3>
                        <p className="text-sm text-gray-500">{user?.email || 'john@greengrocers.com'}</p>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Change Avatar
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input 
                            id="fullName"
                            placeholder="Your full name" 
                            defaultValue={user?.name || 'John Smith'}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email"
                            type="email" 
                            placeholder="Your email address" 
                            defaultValue={user?.email || 'john@greengrocers.com'}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone"
                            placeholder="Your phone number" 
                            defaultValue="+234 801 234 5678"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Input 
                            id="role"
                            placeholder="Your role" 
                            defaultValue="Owner"
                            disabled
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Button className="bg-primary hover:bg-primary-hover text-black mr-2">
                          Save Changes
                        </Button>
                        <Button variant="outline">Cancel</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'business' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Profile</CardTitle>
                    <CardDescription>Manage your business information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <Avatar className="w-20 h-20">
                          <AvatarFallback className="text-xl">GG</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <h3 className="font-semibold">{businessName}</h3>
                          <p className="text-sm text-gray-500">{businessEmail}</p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Update Logo
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="businessName">Business Name</Label>
                          <Input 
                            id="businessName"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="businessDescription">Business Description</Label>
                          <Textarea 
                            id="businessDescription"
                            value={businessDescription}
                            onChange={(e) => setBusinessDescription(e.target.value)}
                            rows={3}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="businessEmail">Business Email</Label>
                            <Input 
                              id="businessEmail"
                              type="email"
                              value={businessEmail}
                              onChange={(e) => setBusinessEmail(e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="businessPhone">Business Phone</Label>
                            <Input 
                              id="businessPhone"
                              value={businessPhone}
                              onChange={(e) => setBusinessPhone(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="businessAddress">Business Address</Label>
                          <Textarea 
                            id="businessAddress"
                            value={businessAddress}
                            onChange={(e) => setBusinessAddress(e.target.value)}
                            rows={2}
                          />
                        </div>
                        
                        <div>
                          <Button className="bg-primary hover:bg-primary-hover text-black mr-2">
                            Save Changes
                          </Button>
                          <Button variant="outline">Cancel</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Business Hours</CardTitle>
                    <CardDescription>Set your operating hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {businessHours.map((day, index) => (
                        <div key={day.day} className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Switch id={`day-${index}`} checked={day.isOpen} />
                            <Label htmlFor={`day-${index}`} className="w-24">{day.day}</Label>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Input 
                              type="time" 
                              value={day.open} 
                              className="w-28"
                              disabled={!day.isOpen}
                            />
                            <span>to</span>
                            <Input 
                              type="time" 
                              value={day.close} 
                              className="w-28"
                              disabled={!day.isOpen}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4">
                        <Button className="bg-primary hover:bg-primary-hover text-black mr-2">
                          Save Hours
                        </Button>
                        <Button variant="outline">Reset</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === 'team' && (
              <Card>
                <CardHeader>
                  <CardTitle>Team Management</CardTitle>
                  <CardDescription>Add and manage your team members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{member.name}</h3>
                              <p className="text-sm text-gray-500">{member.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row md:items-center gap-2 mt-3 md:mt-0">
                            <Badge variant="outline" className="mb-2 md:mb-0">
                              {member.role}
                            </Badge>
                            {member.status === 'active' ? (
                              <Badge className="bg-green-500 w-min">Active</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 w-min">
                                Invited
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm" className="ml-2">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="bg-primary hover:bg-primary-hover text-black">
                      <Users className="mr-2 h-4 w-4" />
                      Invite Team Member
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing & Subscription</CardTitle>
                    <CardDescription>Manage your subscription and billing information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-primary-light/50 p-4 rounded-lg flex flex-col md:flex-row justify-between md:items-center">
                        <div>
                          <h3 className="font-semibold">Current Plan: Eco Business</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Your subscription renews on May 9, 2025
                          </p>
                        </div>
                        <Button className="mt-3 md:mt-0 bg-primary hover:bg-primary-hover text-black">
                          Upgrade Plan
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Plan Features</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Unlimited orders</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Carbon footprint tracking</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Recycling program access</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Eco-friendly packaging options</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>24/7 customer support</span>
                          </li>
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Payment Methods</h3>
                        <div className="p-3 border rounded-lg flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center mr-4">
                              <CreditCard className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">Visa ending in 4242</p>
                              <p className="text-sm text-gray-500">Expires 04/26</p>
                            </div>
                          </div>
                          <Badge>Default</Badge>
                        </div>
                        
                        <Button variant="outline">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Add Payment Method
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Billing History</h3>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-lg flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <p className="font-medium">April 2025</p>
                              <p className="text-sm text-gray-500">Invoice #INV-2022-0412</p>
                            </div>
                            <div className="mt-2 md:mt-0 flex flex-col md:flex-row md:items-center gap-2">
                              <Badge className="bg-green-500 w-min">Paid</Badge>
                              <span className="font-medium">₦45,993.00</span>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-3 border rounded-lg flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <p className="font-medium">March 2025</p>
                              <p className="text-sm text-gray-500">Invoice #INV-2022-0312</p>
                            </div>
                            <div className="mt-2 md:mt-0 flex flex-col md:flex-row md:items-center gap-2">
                              <Badge className="bg-green-500 w-min">Paid</Badge>
                              <span className="font-medium">₦45,993.00</span>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div className="text-sm">
                        <div className="font-medium">Notification Type</div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center text-sm font-medium">Email</div>
                        <div className="text-center text-sm font-medium">Push</div>
                        <div className="text-center text-sm font-medium">SMS</div>
                      </div>
                    </div>
                    
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b last:border-0">
                        <div>
                          <div className="flex items-center">
                            <Switch
                              checked={notification.enabled}
                              onCheckedChange={(checked) => updateNotificationSetting(notification.id, 'enabled', checked)}
                              className="mr-3"
                            />
                            <div>
                              <div className="font-medium">{notification.title}</div>
                              <div className="text-sm text-gray-500">{notification.description}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 mt-4 sm:mt-0 ml-10 sm:ml-0">
                          <Switch
                            checked={notification.email && notification.enabled}
                            onCheckedChange={(checked) => updateNotificationSetting(notification.id, 'email', checked)}
                            disabled={!notification.enabled}
                          />
                          <Switch
                            checked={notification.push && notification.enabled}
                            onCheckedChange={(checked) => updateNotificationSetting(notification.id, 'push', checked)}
                            disabled={!notification.enabled}
                          />
                          <Switch
                            checked={notification.sms && notification.enabled}
                            onCheckedChange={(checked) => updateNotificationSetting(notification.id, 'sms', checked)}
                            disabled={!notification.enabled}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <div>
                      <Button className="bg-primary hover:bg-primary-hover text-black">
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>Manage your password and account security</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Change Password</h3>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" />
                          </div>
                        </div>
                        <Button className="bg-primary hover:bg-primary-hover text-black mr-2">
                          <Lock className="mr-2 h-4 w-4" />
                          Update Password
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm">Secure your account with two-factor authentication</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Login Sessions</h3>
                        <div className="p-3 border rounded-lg space-y-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Current Session</p>
                              <p className="text-xs text-gray-500">
                                Lagos, Nigeria • Chrome on Windows
                              </p>
                            </div>
                            <Badge className="bg-green-500">Active</Badge>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Mobile App Session</p>
                              <p className="text-xs text-gray-500">
                                Lagos, Nigeria • Cydex App on Android
                              </p>
                            </div>
                            <Badge className="bg-green-500">Active</Badge>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                          Sign Out All Other Sessions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === 'legal' && (
              <Card>
                <CardHeader>
                  <CardTitle>Legal & Compliance</CardTitle>
                  <CardDescription>Manage legal agreements and compliance settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-blue-800">Vendor Compliance Status</h3>
                          <p className="text-sm text-blue-700 mt-1">
                            Your business is currently compliant with all required eco-friendly standards and regulations.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Legal Agreements</h3>
                      <div className="space-y-2">
                        <div className="p-3 border rounded-lg flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <p className="font-medium">Vendor Agreement</p>
                            <p className="text-sm text-gray-500">Accepted on April 1, 2025</p>
                          </div>
                          <Button variant="link" className="text-primary p-0 h-auto">
                            View Agreement
                          </Button>
                        </div>
                        
                        <div className="p-3 border rounded-lg flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <p className="font-medium">Privacy Policy</p>
                            <p className="text-sm text-gray-500">Accepted on April 1, 2025</p>
                          </div>
                          <Button variant="link" className="text-primary p-0 h-auto">
                            View Policy
                          </Button>
                        </div>
                        
                        <div className="p-3 border rounded-lg flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <p className="font-medium">Terms of Service</p>
                            <p className="text-sm text-gray-500">Accepted on April 1, 2025</p>
                          </div>
                          <Button variant="link" className="text-primary p-0 h-auto">
                            View Terms
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Data & Privacy</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Share Analytics Data</p>
                            <p className="text-sm text-gray-500">
                              Allow us to collect anonymized usage data to improve our services
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Marketing Communications</p>
                            <p className="text-sm text-gray-500">
                              Receive updates about new features and offers
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'help' && (
              <Card>
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                  <CardDescription>Get help with your vendor account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-primary-light/50 p-4 rounded-lg">
                      <h3 className="font-semibold text-primary mb-2">Need assistance?</h3>
                      <p className="text-sm mb-4">Our support team is available 24/7 to help with any issues</p>
                      <div className="flex flex-wrap gap-2">
                        <Button className="bg-primary hover:bg-primary-hover text-black">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Contact Support
                        </Button>
                        <Button variant="outline">
                          <Phone className="mr-2 h-4 w-4" />
                          Call Us
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Documentation & Resources</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <h4 className="font-medium mb-2">Vendor Guide</h4>
                          <p className="text-sm text-gray-600 mb-3">
                            Everything you need to know about managing your vendor account
                          </p>
                          <Button variant="link" className="text-primary p-0 h-auto">
                            Read Guide
                          </Button>
                        </div>
                        
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <h4 className="font-medium mb-2">Recycling Program</h4>
                          <p className="text-sm text-gray-600 mb-3">
                            Learn how to participate in our eco-friendly initiatives
                          </p>
                          <Button variant="link" className="text-primary p-0 h-auto">
                            Read Guide
                          </Button>
                        </div>
                        
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <h4 className="font-medium mb-2">FAQ</h4>
                          <p className="text-sm text-gray-600 mb-3">
                            Answers to commonly asked questions
                          </p>
                          <Button variant="link" className="text-primary p-0 h-auto">
                            View FAQ
                          </Button>
                        </div>
                        
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <h4 className="font-medium mb-2">Video Tutorials</h4>
                          <p className="text-sm text-gray-600 mb-3">
                            Step-by-step video guides for using the platform
                          </p>
                          <Button variant="link" className="text-primary p-0 h-auto">
                            Watch Videos
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-amber-800">Report an Issue</h3>
                          <p className="text-sm text-amber-700 mt-1">
                            Found a bug or experiencing technical problems? Let us know so we can fix it.
                          </p>
                          <Button variant="outline" className="mt-3 border-amber-300 text-amber-700 hover:bg-amber-100">
                            Report Issue
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
