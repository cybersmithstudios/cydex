import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Recycle,
  Leaf,
  Package,
  BarChart4,
  Calendar,
  MapPin,
  ArrowUpRight
} from 'lucide-react';

// Mock data
const recyclingStats = {
  totalRecycled: 24,
  carbonSaved: 36.2,
  monthlyGoal: 30,
  streakDays: 14
};

const recentRecycling = [
  { id: 1, date: '2023-07-10', items: 3, type: 'Packaging', points: 15, location: 'Eco Hub Center' },
  { id: 2, date: '2023-07-05', items: 1, type: 'Electronics', points: 25, location: 'Tech Recycling Point' },
  { id: 3, date: '2023-07-01', items: 5, type: 'Paper', points: 10, location: 'Community Center' }
];

const badges = [
  { name: 'Recycling Novice', progress: 100, description: 'Recycle 5 items', icon: 'seedling' },
  { name: 'Green Enthusiast', progress: 70, description: 'Recycle 20 items', icon: 'leaf' },
  { name: 'Carbon Neutralizer', progress: 40, description: 'Save 50kg of CO₂', icon: 'earth' }
];

const RecyclingPage = () => {
  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="p-2 sm:p-4 md:p-6 max-w-full mx-auto space-y-3 sm:space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Recycling</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Track your recycling impact and earn rewards
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-black text-sm sm:text-base w-full sm:w-auto">
            Find Recycling Points
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm md:text-base font-medium">Total Recycled</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <Package className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">{recyclingStats.totalRecycled}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Items this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm md:text-base font-medium">Carbon Saved</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">{recyclingStats.carbonSaved} kg</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">CO₂ saved this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm md:text-base font-medium">Monthly Goal</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="mb-1 sm:mb-2">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">{Math.round((recyclingStats.totalRecycled / recyclingStats.monthlyGoal) * 100)}%</span>
              </div>
              <Progress value={(recyclingStats.totalRecycled / recyclingStats.monthlyGoal) * 100} className="h-2 bg-gray-100" />
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">{recyclingStats.monthlyGoal - recyclingStats.totalRecycled} more items to goal</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm md:text-base font-medium">Recycling Streak</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">{recyclingStats.streakDays}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Consecutive days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <div className="col-span-1 xl:col-span-2">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Recycling Activity</CardTitle>
                <CardDescription className="text-sm">Your recent recycling contributions</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Tabs defaultValue="history" className="w-full">
                  <TabsList className="mb-3 sm:mb-4 w-full">
                    <TabsTrigger value="history" className="text-xs sm:text-sm flex-1">History</TabsTrigger>
                    <TabsTrigger value="impact" className="text-xs sm:text-sm flex-1">Environmental Impact</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="history">
                    <div className="space-y-3 sm:space-y-4">
                      {recentRecycling.map((item) => (
                        <div 
                          key={item.id} 
                          className="bg-white border rounded-lg p-3 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 sm:p-2 bg-primary-light rounded-full flex-shrink-0">
                                <Recycle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                  <h3 className="font-medium text-sm sm:text-base">{item.type} Recycling</h3>
                                  <Badge variant="outline" className="text-xs">{item.items} items</Badge>
                                </div>
                                <div className="mt-1 text-xs sm:text-sm text-gray-600">{item.date}</div>
                                <div className="mt-1 sm:mt-2 flex items-center text-xs sm:text-sm text-gray-600">
                                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                  <span className="truncate">{item.location}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-2 sm:mt-0 flex items-center sm:ml-3">
                              <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded text-xs sm:text-sm">
                                <Leaf className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                <span>+{item.points} points</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-3 sm:mt-4 text-xs sm:text-sm h-8 sm:h-9">
                      View All Activity
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="impact">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-white border rounded-lg p-3 sm:p-4">
                        <h3 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Environmental Impact</h3>
                        <div className="space-y-3 sm:space-y-4">
                          <div>
                            <div className="flex justify-between text-xs sm:text-sm mb-1">
                              <span>CO₂ Saved</span>
                              <span>36.2 kg</span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs sm:text-sm mb-1">
                              <span>Water Conserved</span>
                              <span>124 liters</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs sm:text-sm mb-1">
                              <span>Energy Saved</span>
                              <span>86 kWh</span>
                            </div>
                            <Progress value={70} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs sm:text-sm mb-1">
                              <span>Trees Saved</span>
                              <span>2.4 trees</span>
                            </div>
                            <Progress value={40} className="h-2" />
                          </div>
                        </div>
                        
                        <Button className="w-full mt-4 sm:mt-6 bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9">
                          View Detailed Impact Report
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-1">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Recycling Badges</CardTitle>
                <CardDescription className="text-sm">Your achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 pt-0">
                {badges.map((badge, index) => (
                  <div key={index} className="flex items-center p-2 sm:p-3 border rounded-lg">
                    <div className="p-1.5 sm:p-2 bg-primary-light rounded-full mr-2 sm:mr-3 flex-shrink-0">
                      {badge.icon === 'seedling' && <div className="h-4 w-4 sm:h-5 sm:w-5 text-primary">🌱</div>}
                      {badge.icon === 'leaf' && <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />}
                      {badge.icon === 'earth' && <div className="h-4 w-4 sm:h-5 sm:w-5 text-primary">🌍</div>}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-medium text-xs sm:text-sm truncate">{badge.name}</h4>
                      <p className="text-xs text-gray-600 truncate">{badge.description}</p>
                      <Progress value={badge.progress} className="h-1.5 mt-1" />
                    </div>
                  </div>
                ))}
                
                <Button className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9">
                  <span>All Badges</span>
                  <ArrowUpRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="mt-3 sm:mt-4">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Nearby Recycling Points</CardTitle>
                <CardDescription className="text-sm">Places to drop off recyclables</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 pt-0">
                <div className="p-2 sm:p-3 border rounded-lg">
                  <h4 className="font-medium text-sm sm:text-base">Eco Hub Center</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">0.8 km away</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                      Open now
                    </span>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-2 sm:p-3 border rounded-lg">
                  <h4 className="font-medium text-sm sm:text-base">Community Recycling Center</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">1.2 km away</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                      Open now
                    </span>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-2 sm:p-3 border rounded-lg">
                  <h4 className="font-medium text-sm sm:text-base">Tech Recycling Point</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">2.5 km away</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                      Closed
                    </span>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full text-xs sm:text-sm h-8 sm:h-9">Find More Locations</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecyclingPage;
