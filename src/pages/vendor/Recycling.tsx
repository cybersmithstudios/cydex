import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Recycle, Leaf, Package, BarChart4, Calendar, MapPin, ArrowUpRight,
  TrendingUp, Users, Truck, Award, DollarSign
} from 'lucide-react';

// Mock data
const recyclingStats = {
  totalRecycled: 1250,
  carbonSaved: 480.5,
  customerParticipation: 78,
  vendorRecyclingRate: 92
};

const recentRecycling = [
  { id: 1, date: '2023-07-15', type: 'Cardboard', weight: 150, points: 30, partner: 'EcoPack Solutions' },
  { id: 2, date: '2023-07-10', type: 'Plastic', weight: 220, points: 45, partner: 'GreenCycle Ltd' },
  { id: 3, date: '2023-07-05', type: 'Glass', weight: 180, points: 35, partner: 'EnviroGlass Inc' }
];

const packagingPartners = [
  { id: 1, name: 'EcoPack Solutions', logo: 'https://example.com/ecopack-logo.png', rating: 4.5, materials: 'Cardboard, Paper' },
  { id: 2, name: 'GreenCycle Ltd', logo: 'https://example.com/greencycle-logo.png', rating: 4.2, materials: 'Plastic, Aluminum' },
  { id: 3, name: 'EnviroGlass Inc', logo: 'https://example.com/enviroglass-logo.png', rating: 4.8, materials: 'Glass' }
];

const VendorRecyclingPage = () => {
  return (
    <DashboardLayout userRole="VENDOR">
      <div className="p-2 sm:p-4 md:p-6 max-w-full mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Recycling Program</h1>
            <p className="text-gray-600">
              Manage your recycling efforts and track your impact
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-black">
            Manage Partners
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Total Recycled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <span className="text-3xl font-bold">{recyclingStats.totalRecycled} kg</span>
              </div>
              <p className="text-sm text-gray-500">Materials this year</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Carbon Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <span className="text-3xl font-bold">{recyclingStats.carbonSaved} kg</span>
              </div>
              <p className="text-sm text-gray-500">CO₂ emissions reduced</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Customer Participation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <span className="text-3xl font-bold">{recyclingStats.customerParticipation}%</span>
              </div>
              <Progress value={recyclingStats.customerParticipation} className="h-2 bg-gray-100" />
              <p className="text-sm text-gray-500 mt-2">Customers actively recycling</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Vendor Recycling Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <span className="text-3xl font-bold">{recyclingStats.vendorRecyclingRate}%</span>
              </div>
              <p className="text-sm text-gray-500">Materials recycled by vendor</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recycling Activity</CardTitle>
                <CardDescription>Your recent recycling contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="history" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="partners">Packaging Partners</TabsTrigger>
                    <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="history">
                    <div className="space-y-4">
                      {recentRecycling.map((item) => (
                        <div 
                          key={item.id} 
                          className="bg-white border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-primary-light rounded-full">
                                <Recycle className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                              </div>
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="font-medium">{item.type} Recycling</h3>
                                  <Badge variant="outline">{item.weight} kg</Badge>
                                </div>
                                <div className="mt-1 text-sm text-gray-600">{item.date}</div>
                                <div className="mt-2 flex items-center text-sm text-gray-600">
                                  <Truck className="h-4 w-4 mr-1" />
                                  <span>Partner: {item.partner}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-3 sm:mt-0 flex items-center">
                              <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded">
                                <Leaf className="h-4 w-4 mr-1" />
                                <span>+{item.points} points</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4">
                      View All Activity
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="partners">
                    <div className="space-y-4">
                      {packagingPartners.map((partner) => (
                        <div 
                          key={partner.id} 
                          className="bg-white border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={partner.logo} alt={partner.name} />
                                <AvatarFallback>{partner.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{partner.name}</h3>
                                <div className="mt-1 text-sm text-gray-600">
                                  Materials: {partner.materials}
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-600">
                                  <Users className="h-4 w-4 mr-1" />
                                  <span>Rating: {partner.rating}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-3 sm:mt-0 flex items-center">
                              <Button variant="outline">Manage</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4">
                      View All Partners
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="impact">
                    <div className="space-y-4">
                      <div className="bg-white border rounded-lg p-4">
                        <h3 className="font-medium mb-4">Environmental Impact</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>CO₂ Saved</span>
                              <span>{recyclingStats.carbonSaved} kg</span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Energy Saved</span>
                              <span>1240 kWh</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Water Conserved</span>
                              <span>8600 liters</span>
                            </div>
                            <Progress value={70} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Landfill Space Saved</span>
                              <span>24 m³</span>
                            </div>
                            <Progress value={40} className="h-2" />
                          </div>
                        </div>
                        
                        <Button className="w-full mt-6 bg-primary hover:bg-primary-hover text-black">
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
              <CardHeader>
                <CardTitle>Recycling Rewards</CardTitle>
                <CardDescription>Incentives for recycling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center p-3 border rounded-lg">
                  <div className="p-2 bg-primary-light rounded-full mr-3">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">Points per kg</h4>
                    <p className="text-sm text-gray-600">Earn points for every kg recycled</p>
                  </div>
                  <span className="font-bold text-lg">2 pts</span>
                </div>
                
                <div className="flex items-center p-3 border rounded-lg">
                  <div className="p-2 bg-primary-light rounded-full mr-3">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">Discounts</h4>
                    <p className="text-sm text-gray-600">Get discounts on packaging materials</p>
                  </div>
                </div>
                
                <Button className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-black">
                  <span>All Rewards</span>
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Local recycling events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">Community Clean-Up</h4>
                  <p className="text-sm text-gray-600 mt-1">July 22, 2023</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                      Register now
                    </span>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">Recycling Workshop</h4>
                  <p className="text-sm text-gray-600 mt-1">August 5, 2023</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      Learn more
                    </span>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full">View All Events</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorRecyclingPage;
