
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Leaf, Award, Package } from 'lucide-react';

interface ProfileData {
  carbonCredits: number;
  sustainabilityScore: number;
  ordersCompleted: number;
  dateJoined: string;
}

interface AccountSummaryProps {
  profileData: ProfileData;
}

const AccountSummary = ({ profileData }: AccountSummaryProps) => {
  return (
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
  );
};

export default AccountSummary;
