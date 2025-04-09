
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Settings,
  Leaf,
  Star,
  Clock,
  Upload,
  Shield,
  Lock,
  Bell,
  MapPin,
  Smartphone,
  FileText,
  CalendarDays,
  Check,
  ChevronRight,
  Check,
  AlertCircle,
  Car,
  Bike,
  CreditCard,
  Building,
  Clipboard,
  Edit
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

const ProfilePage = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [showVehicleDialog, setShowVehicleDialog] = useState(false);
  const [showIdVerificationDialog, setShowIdVerificationDialog] = useState(false);
  
  // Mock profile data
  const riderProfile = {
    name: "John Rider",
    email: "johnrider@example.com",
    phone: "+234 812 345 6789",
    avatar: null,
    joinDate: "October 2023",
    address: "23 Marina Street, Lagos Island, Lagos",
    status: "active",
    verificationStatus: "verified",
    bankDetails: {
      bank: "Zenith Bank",
      accountNumber: "1234567890",
      accountName: "John Rider",
      bvn: "•••••••1234"
    },
    vehicle: {
      type: "motorcycle",
      model: "Honda CBX 250",
      year: "2022",
      color: "Black",
      licensePlate: "ABC-123XY",
      registrationStatus: "approved"
    },
    documents: {
      idCard: {
        type: "National ID",
        status: "verified",
        expiryDate: "12/2028"
      },
      driverLicense: {
        status: "verified",
        expiryDate: "05/2026"
      },
      insurance: {
        status: "verified",
        expiryDate: "03/2026"
      }
    },
    stats: {
      completedDeliveries: 584,
      totalDistance: 3241,
      sustainabilityScore: 92,
      carbonSaved: 1325,
      rating: 4.9,
      reviews: 237
    },
    preferences: {
      notifications: {
        app: true,
        email: true,
        sms: false,
        marketing: false
      },
      deliveryPreferences: {
        maxDistance: 10,
        preferredZones: ["Victoria Island", "Ikoyi", "Lekki Phase 1"],
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      }
    }
  };

  const recentReviews = [
    {
      id: 1,
      customer: "Sarah O.",
      rating: 5,
      comment: "Very professional and timely delivery. The rider was courteous and followed all my delivery instructions exactly.",
      date: "Apr 8, 2025"
    },
    {
      id: 2,
      customer: "Michael T.",
      rating: 5,
      comment: "Excellent service! My packages were delivered in perfect condition and ahead of schedule.",
      date: "Apr 6, 2025"
    },
    {
      id: 3,
      customer: "Aisha M.",
      rating: 4,
      comment: "Good service and communication. Rider kept me updated throughout the delivery process.",
      date: "Apr 5, 2025"
    },
    {
      id: 4,
      customer: "David K.",
      rating: 5,
      comment: "Exceptional service as always. This rider is very reliable and professional.",
      date: "Apr 3, 2025"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Eco Warrior",
      description: "Saved over 1,000kg of carbon emissions",
      icon: Leaf,
      earnedDate: "Mar 2025",
      progress: 100
    },
    {
      id: 2,
      title: "Speed Demon",
      description: "Completed 50 deliveries with early arrival",
      icon: Clock,
      earnedDate: "Feb 2025",
      progress: 100
    },
    {
      id: 3,
      title: "5-Star Rider",
      description: "Maintained 5-star rating for 3 consecutive months",
      icon: Star,
      earnedDate: "Jan 2025",
      progress: 100
    },
    {
      id: 4,
      title: "Urban Explorer",
      description: "Completed deliveries in all city zones",
      icon: MapPin,
      progress: 80
    },
    {
      id: 5,
      title: "Marathon Rider",
      description: "Traveled over 5,000km making deliveries",
      icon: Bike,
      progress: 65
    }
  ];

  const handleSaveProfile = () => {
    // In a real app, this would save the profile to the backend
    setEditing(false);
    console.log("Profile saved");
  };

  const handleUpdateVehicle = () => {
    // In a real app, this would update the vehicle details
    setShowVehicleDialog(false);
    console.log("Vehicle updated");
  };

  const handleUploadId = () => {
    // In a real app, this would handle ID verification
    setShowIdVerificationDialog(false);
    console.log("ID uploaded");
  };

  return (
    <DashboardLayout userRole="rider">
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-gray-600">Manage your account information and settings</p>
          </div>
          {editing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              <Button className="bg-primary hover:bg-primary-hover text-black" onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </div>
          ) : (
            <Button className="bg-primary hover:bg-primary-hover text-black" onClick={() => setEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24">
                      {riderProfile.avatar ? (
                        <AvatarImage src={riderProfile.avatar} alt={riderProfile.name} />
                      ) : (
                        <AvatarFallback className="text-2xl bg-primary-light text-primary">
                          {riderProfile.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {editing && (
                      <Button size="sm" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0">
                        <Upload className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <h2 className="text-xl font-bold">{riderProfile.name}</h2>
                  <p className="text-sm text-gray-500">Rider ID: #R-78945</p>
                  
                  <div className="flex items-center mt-2">
                    <Badge className="bg-green-500">Active</Badge>
                    <Badge variant="outline" className="ml-2">Verified</Badge>
                  </div>
                  
                  <div className="mt-4 w-full">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-amber-500" />
                      <div className="ml-2 flex-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Rating</span>
                          <span className="text-sm font-bold">{riderProfile.stats.rating}/5.0</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(riderProfile.stats.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="ml-2 text-xs text-gray-500">
                            ({riderProfile.stats.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{riderProfile.stats.completedDeliveries}</p>
                      <p className="text-sm text-gray-500">Deliveries</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{riderProfile.stats.totalDistance} km</p>
                      <p className="text-sm text-gray-500">Distance</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{riderProfile.stats.carbonSaved} kg</p>
                      <p className="text-sm text-gray-500">CO₂ Saved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{riderProfile.stats.sustainabilityScore}</p>
                      <p className="text-sm text-gray-500">Eco Score</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="w-full space-y-3">
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 text-gray-500" />
                      <span className="ml-2 text-sm">Joined {riderProfile.joinDate}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                      <span className="ml-2 text-sm">{riderProfile.address}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Car className="h-5 w-5 mr-2" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Type</span>
                    <span className="text-sm font-medium">{riderProfile.vehicle.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Model</span>
                    <span className="text-sm font-medium">{riderProfile.vehicle.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Year</span>
                    <span className="text-sm font-medium">{riderProfile.vehicle.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Color</span>
                    <span className="text-sm font-medium">{riderProfile.vehicle.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">License Plate</span>
                    <span className="text-sm font-medium">{riderProfile.vehicle.licensePlate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Registration Status</span>
                    <Badge className="bg-green-500">Approved</Badge>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => setShowVehicleDialog(true)}
                >
                  Update Vehicle Details
                </Button>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Documents & Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-medium">National ID</p>
                        <p className="text-xs text-gray-500">Expires: {riderProfile.documents.idCard.expiryDate}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Car className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-medium">Driver's License</p>
                        <p className="text-xs text-gray-500">Expires: {riderProfile.documents.driverLicense.expiryDate}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-medium">Insurance</p>
                        <p className="text-xs text-gray-500">Expires: {riderProfile.documents.insurance.expiryDate}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => setShowIdVerificationDialog(true)}
                >
                  Update Document Verification
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="bank">Banking</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              
              {/* Personal Information Tab */}
              <TabsContent value="personal">
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
                            value={riderProfile.name} 
                            readOnly={!editing} 
                            className={editing ? "" : "bg-gray-50"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            value={riderProfile.email} 
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
                            value={riderProfile.phone} 
                            readOnly={!editing} 
                            className={editing ? "" : "bg-gray-50"}
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
                          value={riderProfile.address} 
                          readOnly={!editing} 
                          className={editing ? "" : "bg-gray-50"}
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
                                value={riderProfile.preferences.deliveryPreferences.maxDistance} 
                                readOnly={!editing} 
                                className={`w-20 ${editing ? "" : "bg-gray-50"}`}
                              />
                              <span className="ml-2">km</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Preferred Delivery Zones</Label>
                            <div className="flex flex-wrap gap-2">
                              {riderProfile.preferences.deliveryPreferences.preferredZones.map((zone, index) => (
                                <Badge key={index} variant={editing ? "outline" : "secondary"}>
                                  {zone}
                                  {editing && <Button size="sm" variant="ghost" className="h-4 w-4 p-0 ml-1">×</Button>}
                                </Badge>
                              ))}
                              {editing && <Button size="sm" variant="outline" className="h-7">+ Add Zone</Button>}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Available Days</Label>
                            <div className="flex flex-wrap gap-2">
                              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                <Badge 
                                  key={day} 
                                  variant={riderProfile.preferences.deliveryPreferences.availableDays.includes(day) ? "default" : "outline"}
                                  className={!riderProfile.preferences.deliveryPreferences.availableDays.includes(day) ? "text-gray-400" : ""}
                                >
                                  {day}
                                </Badge>
                              ))}
                            </div>
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
                          checked={riderProfile.preferences.notifications.app} 
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
                          checked={riderProfile.preferences.notifications.email} 
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
                          checked={riderProfile.preferences.notifications.sms} 
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
                          checked={riderProfile.preferences.notifications.marketing} 
                          disabled={!editing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Banking Information Tab */}
              <TabsContent value="bank">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Building className="h-5 w-5 mr-2" />
                      Banking Details
                    </CardTitle>
                    <CardDescription>Your payment and banking information</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bankName">Bank Name</Label>
                          <Input 
                            id="bankName" 
                            value={riderProfile.bankDetails.bank} 
                            readOnly={!editing} 
                            className={editing ? "" : "bg-gray-50"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input 
                            id="accountNumber" 
                            value={riderProfile.bankDetails.accountNumber} 
                            readOnly={!editing} 
                            className={editing ? "" : "bg-gray-50"}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="accountName">Account Name</Label>
                          <Input 
                            id="accountName" 
                            value={riderProfile.bankDetails.accountName} 
                            readOnly={!editing} 
                            className={editing ? "" : "bg-gray-50"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bvn">BVN</Label>
                          <Input 
                            id="bvn" 
                            value={riderProfile.bankDetails.bvn} 
                            readOnly={true} 
                            className="bg-gray-50"
                          />
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <h3 className="font-medium">Payment Settings</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Auto Withdrawal</p>
                          <p className="text-xs text-gray-500">Automatically withdraw earnings every week</p>
                        </div>
                        <Switch disabled={!editing} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Withdrawal Threshold</p>
                          <p className="text-xs text-gray-500">Minimum amount for auto withdrawal</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">₦</span>
                          <Input 
                            type="number"
                            value="10000" 
                            readOnly={!editing} 
                            className={`w-24 ${editing ? "" : "bg-gray-50"}`}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex">
                        <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Secure Banking Information</p>
                          <p className="text-xs text-blue-600 mt-1">
                            Your banking information is encrypted and secure. We never share your financial details with vendors or customers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  {editing && (
                    <CardFooter>
                      <Button className="w-full bg-primary hover:bg-primary-hover text-black">
                        Update Banking Details
                      </Button>
                    </CardFooter>
                  )}
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Lock className="h-5 w-5 mr-2" />
                      Account Security
                    </CardTitle>
                    <CardDescription>Manage your password and security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Change Password</p>
                          <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                        </div>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-xs text-gray-500">Enhance your account security</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Device Management</p>
                          <p className="text-xs text-gray-500">2 devices currently logged in</p>
                        </div>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <Card>
                  <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <Star className="h-5 w-5 mr-2 text-amber-500" />
                        Customer Reviews
                      </CardTitle>
                      <CardDescription>What customers are saying about you</CardDescription>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center">
                      <div className="flex items-center mr-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < Math.floor(riderProfile.stats.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <div>
                        <p className="font-bold">{riderProfile.stats.rating}/5.0</p>
                        <p className="text-xs text-gray-500">{riderProfile.stats.reviews} reviews</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-4">
                      {recentReviews.map(review => (
                        <div key={review.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between mb-2">
                            <p className="font-medium">{review.customer}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4">
                      View All Reviews
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Clipboard className="h-5 w-5 mr-2" />
                      Rating Breakdown
                    </CardTitle>
                    <CardDescription>Detailed analysis of your customer ratings</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="font-medium mr-2">5</span>
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          </div>
                          <span className="text-sm">180 reviews</span>
                        </div>
                        <Progress value={76} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="font-medium mr-2">4</span>
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          </div>
                          <span className="text-sm">42 reviews</span>
                        </div>
                        <Progress value={18} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="font-medium mr-2">3</span>
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          </div>
                          <span className="text-sm">11 reviews</span>
                        </div>
                        <Progress value={4} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="font-medium mr-2">2</span>
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          </div>
                          <span className="text-sm">3 reviews</span>
                        </div>
                        <Progress value={1} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="font-medium mr-2">1</span>
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          </div>
                          <span className="text-sm">1 review</span>
                        </div>
                        <Progress value={0.4} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-gray-500">On-time Delivery</p>
                        <p className="font-bold text-lg">98%</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-gray-500">Order Accuracy</p>
                        <p className="font-bold text-lg">99%</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-gray-500">Customer Service</p>
                        <p className="font-bold text-lg">4.8/5</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-gray-500">Handling Quality</p>
                        <p className="font-bold text-lg">4.9/5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Achievements Tab */}
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Award className="h-5 w-5 mr-2 text-amber-500" />
                      Rider Achievements
                    </CardTitle>
                    <CardDescription>Milestones and recognitions you've earned</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-6">
                      {achievements.map(achievement => {
                        const AchievementIcon = achievement.icon;
                        const isCompleted = achievement.progress === 100;
                        
                        return (
                          <div 
                            key={achievement.id} 
                            className={`p-4 border rounded-lg flex items-start ${
                              isCompleted ? 'bg-primary-light border-primary' : ''
                            }`}
                          >
                            <div className={`p-3 rounded-full mr-4 ${
                              isCompleted ? 'bg-primary text-white' : 'bg-gray-100'
                            }`}>
                              <AchievementIcon className="h-6 w-6" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <h3 className="font-medium">{achievement.title}</h3>
                                {isCompleted ? (
                                  <Badge className="mt-1 sm:mt-0 w-fit bg-green-500">Earned {achievement.earnedDate}</Badge>
                                ) : (
                                  <Badge className="mt-1 sm:mt-0 w-fit" variant="outline">{achievement.progress}% Complete</Badge>
                                )}
                              </div>
                              
                              <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                              
                              {!isCompleted && (
                                <div className="mt-2">
                                  <Progress value={achievement.progress} className="h-2" />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-6 p-4 bg-primary-light rounded-lg">
                      <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="flex items-center mb-3 sm:mb-0">
                          <Star className="h-6 w-6 text-primary mr-2" />
                          <div>
                            <p className="font-medium">Sustainability Champion</p>
                            <p className="text-sm">3 more eco-friendly deliveries to reach next level</p>
                          </div>
                        </div>
                        <Button className="bg-primary hover:bg-primary-hover text-black">
                          View All Badges
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Leaf className="h-5 w-5 mr-2 text-green-500" />
                      Sustainability Impact
                    </CardTitle>
                    <CardDescription>Your contribution to environmental conservation</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-gray-500">CO₂ Emissions Saved</p>
                        <p className="font-bold text-2xl text-green-600">{riderProfile.stats.carbonSaved} kg</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-gray-500">Trees Equivalent</p>
                        <p className="font-bold text-2xl text-green-600">{Math.round(riderProfile.stats.carbonSaved / 25)}</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-sm text-gray-500">Eco Score Ranking</p>
                        <p className="font-bold text-2xl text-green-600">Top 5%</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Sustainable Delivery Methods</h3>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Bike className="h-5 w-5 text-green-600 mr-2" />
                          <span>Bicycle/E-bike Deliveries</span>
                        </div>
                        <span className="font-medium">78%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Car className="h-5 w-5 text-amber-600 mr-2" />
                          <span>Electric Vehicle Deliveries</span>
                        </div>
                        <span className="font-medium">15%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                          <span>Conventional Vehicle Deliveries</span>
                        </div>
                        <span className="font-medium">7%</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                      View Complete Sustainability Report
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Vehicle Dialog */}
        <Dialog open={showVehicleDialog} onOpenChange={setShowVehicleDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Vehicle Information</DialogTitle>
              <DialogDescription>
                Update your vehicle details for delivery operations
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle-type">Vehicle Type</Label>
                  <select 
                    id="vehicle-type" 
                    defaultValue={riderProfile.vehicle.type}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="bicycle">Bicycle</option>
                    <option value="e-bike">E-Bike</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="car">Car</option>
                    <option value="van">Van</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle-year">Year</Label>
                  <Input id="vehicle-year" defaultValue={riderProfile.vehicle.year} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicle-model">Model</Label>
                <Input id="vehicle-model" defaultValue={riderProfile.vehicle.model} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle-color">Color</Label>
                  <Input id="vehicle-color" defaultValue={riderProfile.vehicle.color} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license-plate">License Plate</Label>
                  <Input id="license-plate" defaultValue={riderProfile.vehicle.licensePlate} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicle-docs">Upload Vehicle Documentation</Label>
                <Input id="vehicle-docs" type="file" />
                <p className="text-xs text-gray-500">Upload registration documents or vehicle insurance</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowVehicleDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateVehicle} className="bg-primary hover:bg-primary-hover text-black">
                Update Vehicle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* ID Verification Dialog */}
        <Dialog open={showIdVerificationDialog} onOpenChange={setShowIdVerificationDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Document Verification</DialogTitle>
              <DialogDescription>
                Update your identification documents for verification
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="id-type">ID Type</Label>
                <select 
                  id="id-type" 
                  defaultValue="national"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="national">National ID Card</option>
                  <option value="passport">International Passport</option>
                  <option value="drivers">Driver's License</option>
                  <option value="voters">Voter's Card</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="id-number">ID Number</Label>
                <Input id="id-number" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiry-date">Expiry Date</Label>
                <Input id="expiry-date" type="date" />
              </div>
              
              <div className="space-y-2">
                <Label>Upload ID Document (Front)</Label>
                <Input type="file" accept="image/*" />
              </div>
              
              <div className="space-y-2">
                <Label>Upload ID Document (Back)</Label>
                <Input type="file" accept="image/*" />
              </div>
              
              <div className="space-y-2">
                <Label>Take Selfie for Verification</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Click to take a photo or upload a recent selfie
                  </p>
                  <Button variant="outline" className="mt-4">
                    <Camera className="mr-2 h-4 w-4" />
                    Take Photo
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowIdVerificationDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUploadId} className="bg-primary hover:bg-primary-hover text-black">
                Submit for Verification
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
