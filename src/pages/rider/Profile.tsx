import React, { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Edit, Camera } from 'lucide-react';
import ProfileHeader from '@/components/rider/profile/ProfileHeader';
import VehicleInfo from '@/components/rider/profile/VehicleInfo';
import DocumentsVerification from '@/components/rider/profile/DocumentsVerification';
import ProfileTabs from '@/components/rider/profile/ProfileTabs';

const RiderProfilePage = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [showVehicleDialog, setShowVehicleDialog] = useState(false);
  const [showIdVerificationDialog, setShowIdVerificationDialog] = useState(false);
  
  // Mock profile data - in a real app, this would come from an API
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

  // ... keep existing code (mock data for reviews and achievements)

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
      icon: () => <div>🌱</div>,
      earnedDate: "Mar 2025",
      progress: 100
    },
    {
      id: 2,
      title: "Speed Demon",
      description: "Completed 50 deliveries with early arrival",
      icon: () => <div>⚡</div>,
      earnedDate: "Feb 2025",
      progress: 100
    },
    {
      id: 3,
      title: "5-Star Rider",
      description: "Maintained 5-star rating for 3 consecutive months",
      icon: () => <div>⭐</div>,
      earnedDate: "Jan 2025",
      progress: 100
    },
    {
      id: 4,
      title: "Urban Explorer",
      description: "Completed deliveries in all city zones",
      icon: () => <div>🗺️</div>,
      progress: 80
    },
    {
      id: 5,
      title: "Marathon Rider",
      description: "Traveled over 5,000km making deliveries",
      icon: () => <div>🚴</div>,
      progress: 65
    }
  ];

  const handleSaveProfile = () => {
    setEditing(false);
    console.log("Profile saved");
  };

  const handleUpdateVehicle = () => {
    setShowVehicleDialog(false);
    console.log("Vehicle updated");
  };

  const handleUploadId = () => {
    setShowIdVerificationDialog(false);
    console.log("ID uploaded");
  };

  return (
    <DashboardLayout userRole="RIDER">
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
            <Card>
              <CardContent className="p-6">
                <ProfileHeader profile={riderProfile} editing={editing} />
              </CardContent>
            </Card>

            <VehicleInfo 
              vehicle={riderProfile.vehicle} 
              onUpdateVehicle={() => setShowVehicleDialog(true)} 
            />

            <DocumentsVerification 
              documents={riderProfile.documents} 
              onUpdateDocuments={() => setShowIdVerificationDialog(true)} 
            />
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-2">
            <ProfileTabs 
              editing={editing} 
              profile={riderProfile} 
              recentReviews={recentReviews} 
              achievements={achievements} 
            />
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

export default RiderProfilePage;
