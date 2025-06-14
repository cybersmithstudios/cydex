
import React, { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import RiderProfileHeader from '@/components/rider/profile/RiderProfileHeader';
import ProfileHeader from '@/components/rider/profile/ProfileHeader';
import VehicleInfo from '@/components/rider/profile/VehicleInfo';
import DocumentsVerification from '@/components/rider/profile/DocumentsVerification';
import ProfileTabs from '@/components/rider/profile/ProfileTabs';
import VehicleDialog from '@/components/rider/profile/dialogs/VehicleDialog';
import DocumentDialog from '@/components/rider/profile/dialogs/DocumentDialog';
import { useRiderProfileData } from '@/hooks/rider/useRiderProfileData';

const RiderProfilePage = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [showVehicleDialog, setShowVehicleDialog] = useState(false);
  const [showIdVerificationDialog, setShowIdVerificationDialog] = useState(false);
  
  const { riderProfile, recentReviews, achievements } = useRiderProfileData();

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
      <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto">
        <RiderProfileHeader 
          editing={editing}
          onEditToggle={() => setEditing(!editing)}
          onSave={handleSaveProfile}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-3 sm:space-y-4 md:space-y-6">
            <Card>
              <CardContent className="p-3 sm:p-4 md:p-6">
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
        <VehicleDialog 
          open={showVehicleDialog}
          onOpenChange={setShowVehicleDialog}
          vehicle={riderProfile.vehicle}
          onUpdate={handleUpdateVehicle}
        />
        
        {/* ID Verification Dialog */}
        <DocumentDialog 
          open={showIdVerificationDialog}
          onOpenChange={setShowIdVerificationDialog}
          onUpload={handleUploadId}
        />
      </div>
    </DashboardLayout>
  );
};

export default RiderProfilePage;
