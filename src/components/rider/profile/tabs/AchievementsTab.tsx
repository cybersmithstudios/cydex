
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
  return (
    <>
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
              <p className="font-bold text-2xl text-green-600">{profile.stats.carbonSaved} kg</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <p className="text-sm text-gray-500">Trees Equivalent</p>
              <p className="font-bold text-2xl text-green-600">{Math.round(profile.stats.carbonSaved / 25)}</p>
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
    </>
  );
};

export default AchievementsTab;
