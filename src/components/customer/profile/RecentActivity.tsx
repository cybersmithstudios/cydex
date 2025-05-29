
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, CreditCard, Lock } from 'lucide-react';

const RecentActivity = () => {
  return (
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
  );
};

export default RecentActivity;
