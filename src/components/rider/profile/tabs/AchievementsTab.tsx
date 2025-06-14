
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Star, Leaf, Bike, Car, AlertCircle } from 'lucide-react';

interface AchievementsTabProps {
  profile: any;
  achievements: any[];
}

const AchievementsTab = ({ profile, achievements }: AchievementsTabProps) => {
  // Show empty state for achievements
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Award className="h-5 w-5 mr-2 text-amber-500" />
            Rider Achievements
          </CardTitle>
          <CardDescription>Milestones and recognitions you'll earn as you complete deliveries</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="text-center py-12">
            <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No achievements yet</h3>
            <p className="text-gray-500">Complete your first delivery to start earning achievements!</p>
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
              <p className="font-bold text-2xl text-green-600">0 kg</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <p className="text-sm text-gray-500">Trees Equivalent</p>
              <p className="font-bold text-2xl text-green-600">0</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <p className="text-sm text-gray-500">Eco Score Ranking</p>
              <p className="font-bold text-2xl text-green-600">-</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Sustainable Delivery Methods</h3>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Bike className="h-5 w-5 text-green-600 mr-2" />
                <span>Walking/Bicycle Deliveries</span>
              </div>
              <span className="font-medium">0%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Car className="h-5 w-5 text-amber-600 mr-2" />
                <span>Electric Vehicle Deliveries</span>
              </div>
              <span className="font-medium">0%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <span>Conventional Vehicle Deliveries</span>
              </div>
              <span className="font-medium">0%</span>
            </div>
          </div>
          
          <div className="text-center py-8">
            <p className="text-gray-500">Start completing deliveries to see your sustainability impact!</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AchievementsTab;
