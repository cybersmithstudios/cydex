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
      <div className="p-3 sm:p-4 md:p-6 max-w-full mx-auto space-y-4 sm:space-y-6">
        {/* Header Section - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Recycling Program</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage your recycling efforts and track your impact
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-black w-full sm:w-auto text-xs sm:text-sm">
            Manage Partners
          </Button>
        </div>

        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-sm sm:text-base font-medium">Total Recycled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="text-2xl sm:text-3xl font-bold">{recyclingStats.totalRecycled} kg</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Materials this year</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-sm sm:text-base font-medium">Carbon Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <span className="text-2xl sm:text-3xl font-bold">{recyclingStats.carbonSaved} kg</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">CO₂ emissions reduced</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-sm sm:text-base font-medium">Customer Participation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <span className="text-2xl sm:text-3xl font-bold">{recyclingStats.customerParticipation}%</span>
              </div>
              <Progress value={recyclingStats.customerParticipation} className="h-2 bg-gray-100" />
              <p className="text-xs sm:text-sm text-gray-500 mt-2">Customers actively recycling</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-sm sm:text-base font-medium">Vendor Recycling Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                <span className="text-2xl sm:text-3xl font-bold">{recyclingStats.vendorRecyclingRate}%</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Materials recycled by vendor</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Mobile Optimized */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <div className="col-span-1 xl:col-span-2">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">Recycling Activity</CardTitle>
                <CardDescription className="text-sm">Your recent recycling contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="history" className="w-full">
                  <TabsList className="mb-3 sm:mb-4 w-full grid grid-cols-3 sm:w-auto sm:flex">
                    <TabsTrigger value="history" className="text-xs sm:text-sm">History</TabsTrigger>
                    <TabsTrigger value="partners" className="text-xs sm:text-sm">Partners</TabsTrigger>
                    <TabsTrigger value="impact" className="text-xs sm:text-sm">Impact</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="history" className="mt-3 sm:mt-4">
                    <div className="space-y-3 sm:space-y-4">
                      {recentRecycling.map((item) => (
                        <RecyclingHistoryCard key={item.id} item={item} />
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-3 sm:mt-4 text-xs sm:text-sm">
                      View All Activity
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="partners" className="mt-3 sm:mt-4">
                    <div className="space-y-3 sm:space-y-4">
                      {packagingPartners.map((partner) => (
                        <PartnerCard key={partner.id} partner={partner} />
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-3 sm:mt-4 text-xs sm:text-sm">
                      View All Partners
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="impact" className="mt-3 sm:mt-4">
                    <ImpactContent />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar - Mobile Optimized */}
          <div className="col-span-1">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">Recycling Rewards</CardTitle>
                <CardDescription className="text-sm">Incentives for recycling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-center p-3 border rounded-lg">
                  <div className="p-1.5 sm:p-2 bg-primary-light rounded-full mr-3">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-sm sm:text-base">Points per kg</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Earn points for every kg recycled</p>
                  </div>
                  <span className="font-bold text-base sm:text-lg">2 pts</span>
                </div>
                
                <div className="flex items-center p-3 border rounded-lg">
                  <div className="p-1.5 sm:p-2 bg-primary-light rounded-full mr-3">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-sm sm:text-base">Discounts</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Get discounts on packaging materials</p>
                  </div>
                </div>
                
                <Button className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm">
                  <span>All Rewards</span>
                  <ArrowUpRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="mt-3 sm:mt-4">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">Upcoming Events</CardTitle>
                <CardDescription className="text-sm">Local recycling events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <EventCard 
                  title="Community Clean-Up"
                  date="July 22, 2023"
                  status="Register now"
                  statusColor="green"
                />
                
                <EventCard 
                  title="Recycling Workshop"
                  date="August 5, 2023"
                  status="Learn more"
                  statusColor="blue"
                />
                
                <Button className="w-full text-xs sm:text-sm">View All Events</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Mobile-Optimized Recycling History Card Component
const RecyclingHistoryCard = ({ item }) => (
  <div className="bg-white border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="p-1.5 sm:p-2 bg-primary-light rounded-full flex-shrink-0">
          <Recycle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <h3 className="font-medium text-sm sm:text-base">{item.type} Recycling</h3>
            <Badge variant="outline" className="text-xs w-fit">{item.weight} kg</Badge>
          </div>
          <div className="mt-1 text-xs sm:text-sm text-gray-600">{item.date}</div>
          <div className="mt-2 flex items-center text-xs sm:text-sm text-gray-600">
            <Truck className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
            <span className="truncate">Partner: {item.partner}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded text-xs sm:text-sm">
          <Leaf className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span>+{item.points} points</span>
        </div>
      </div>
    </div>
  </div>
);

// Mobile-Optimized Partner Card Component
const PartnerCard = ({ partner }) => (
  <div className="bg-white border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
    <div className="flex flex-col sm:flex-row justify-between gap-3">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
          <AvatarImage src={partner.logo} alt={partner.name} />
          <AvatarFallback className="text-xs sm:text-sm">{partner.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm sm:text-base">{partner.name}</h3>
          <div className="mt-1 text-xs sm:text-sm text-gray-600">
            Materials: {partner.materials}
          </div>
          <div className="mt-2 flex items-center text-xs sm:text-sm text-gray-600">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span>Rating: {partner.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="flex sm:items-center">
        <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">Manage</Button>
      </div>
    </div>
  </div>
);

// Mobile-Optimized Impact Content Component
const ImpactContent = () => (
  <div className="space-y-3 sm:space-y-4">
    <div className="bg-white border rounded-lg p-3 sm:p-4">
      <h3 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Environmental Impact</h3>
      <div className="space-y-3 sm:space-y-4">
        <ImpactMetric label="CO₂ Saved" value="480.5 kg" progress={60} />
        <ImpactMetric label="Energy Saved" value="1240 kWh" progress={45} />
        <ImpactMetric label="Water Conserved" value="8600 liters" progress={70} />
        <ImpactMetric label="Landfill Space Saved" value="24 m³" progress={40} />
      </div>
      
      <Button className="w-full mt-4 sm:mt-6 bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm">
        View Detailed Impact Report
      </Button>
    </div>
  </div>
);

// Mobile-Optimized Impact Metric Component
const ImpactMetric = ({ label, value, progress }) => (
  <div>
    <div className="flex justify-between text-xs sm:text-sm mb-1">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <Progress value={progress} className="h-2" />
  </div>
);

// Mobile-Optimized Event Card Component
const EventCard = ({ title, date, status, statusColor }) => (
  <div className="p-3 border rounded-lg">
    <h4 className="font-medium text-sm sm:text-base">{title}</h4>
    <p className="text-xs sm:text-sm text-gray-600 mt-1">{date}</p>
    <div className="flex justify-between items-center mt-2">
      <span className={`text-xs px-2 py-1 rounded ${
        statusColor === 'green' 
          ? 'bg-green-50 text-green-700' 
          : 'bg-blue-50 text-blue-700'
      }`}>
        {status}
      </span>
      <Button variant="ghost" size="sm" className="h-auto p-1">
        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
    </div>
  </div>
);

export default VendorRecyclingPage;
