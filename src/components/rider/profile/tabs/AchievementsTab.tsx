
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Star, Leaf, Bike, Car, AlertCircle, Trophy, Zap, Target } from 'lucide-react';

interface AchievementsTabProps {
  profile: any;
  achievements: any[];
}

const AchievementsTab = ({ profile, achievements }: AchievementsTabProps) => {
  const hasAchievements = achievements && achievements.length > 0;
  
  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return Trophy;
      case 'zap': return Zap;
      case 'target': return Target;
      case 'leaf': return Leaf;
      default: return Award;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Award className="h-5 w-5 mr-2 text-amber-500" />
            Rider Achievements
          </CardTitle>
          <CardDescription>
            {hasAchievements ? `You've earned ${achievements.length} achievements` : 'Milestones and recognitions you\'ll earn as you complete deliveries'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {!hasAchievements ? (
            <div className="text-center py-12">
              <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No achievements yet</h3>
              <p className="text-gray-500">Complete your first delivery to start earning achievements!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => {
                const IconComponent = getAchievementIcon(achievement.icon);
                const isCompleted = achievement.progress >= achievement.target;
                const progressPercentage = Math.min((achievement.progress / achievement.target) * 100, 100);
                
                return (
                  <div key={achievement.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <IconComponent className={`h-8 w-8 mr-3 ${isCompleted ? 'text-amber-500' : 'text-gray-400'}`} />
                        <div>
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-gray-500">{achievement.description}</p>
                        </div>
                      </div>
                      {isCompleted && (
                        <Badge className="bg-amber-500">
                          <Trophy className="h-3 w-3 mr-1" />
                          Earned
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{achievement.progress} / {achievement.target}</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                    
                    {achievement.earned_date && (
                      <p className="text-xs text-gray-500 mt-2">Earned on {achievement.earned_date}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
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
              <p className="font-bold text-2xl text-green-600">{Math.floor(profile.stats.carbonSaved / 22)}</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <p className="text-sm text-gray-500">Eco Score</p>
              <p className="font-bold text-2xl text-green-600">{profile.stats.sustainabilityScore}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Sustainable Delivery Methods</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Bike className="h-5 w-5 text-green-600 mr-2" />
                  <span>Walking/Bicycle Deliveries</span>
                </div>
                <span className="font-medium">{profile.vehicle?.type === 'walking' || profile.vehicle?.type === 'bicycle' ? '100%' : '0%'}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Car className="h-5 w-5 text-amber-600 mr-2" />
                  <span>Vehicle Deliveries</span>
                </div>
                <span className="font-medium">{profile.vehicle?.type !== 'walking' && profile.vehicle?.type !== 'bicycle' ? '100%' : '0%'}</span>
              </div>
            </div>
            
            {profile.stats.completedDeliveries === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Start completing deliveries to see your sustainability impact!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AchievementsTab;
