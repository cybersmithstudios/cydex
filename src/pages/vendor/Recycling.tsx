
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Recycle,
  Leaf,
  BarChart,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  PlusCircle,
  ChevronRight,
  Download,
  Scale,
  Truck,
  PackageOpen,
  CircleDollarSign,
  ArrowRight
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock recycling data
const recyclingStats = {
  totalWeight: 2845, // in kilograms
  carbonSaved: 1422.5, // in kilograms of CO2
  goalProgress: 71, // percentage of monthly goal
  recyclingRate: 87, // percentage
  pointsEarned: 28450, // recycling points
  carbonCredits: 142, // carbon credits
  currentStreak: 18, // days
};

const recyclingHistory = [
  {
    id: 'RCY-1234',
    date: '2025-04-09T14:30:00Z',
    type: 'paper',
    weight: 120.5, // kg
    status: 'completed',
    pointsEarned: 1205,
    carbonSaved: 60.25,
    pickupDetails: {
      date: '2025-04-09T14:30:00Z',
      address: 'Green Grocers Store, 123 Eco Street, Lagos',
      rider: 'Michael O.'
    }
  },
  {
    id: 'RCY-1233',
    date: '2025-04-08T11:15:00Z',
    type: 'plastic',
    weight: 85.3, // kg
    status: 'completed',
    pointsEarned: 853,
    carbonSaved: 42.65,
    pickupDetails: {
      date: '2025-04-08T11:15:00Z',
      address: 'Green Grocers Store, 123 Eco Street, Lagos',
      rider: 'Sarah T.'
    }
  },
  {
    id: 'RCY-1232',
    date: '2025-04-06T09:45:00Z',
    type: 'cardboard',
    weight: 200.0, // kg
    status: 'completed',
    pointsEarned: 2000,
    carbonSaved: 100.0,
    pickupDetails: {
      date: '2025-04-06T09:45:00Z',
      address: 'Green Grocers Store, 123 Eco Street, Lagos',
      rider: 'Michael O.'
    }
  },
  {
    id: 'RCY-1231',
    date: '2025-04-03T15:20:00Z',
    type: 'mixed',
    weight: 150.0, // kg
    status: 'completed',
    pointsEarned: 1500,
    carbonSaved: 75.0,
    pickupDetails: {
      date: '2025-04-03T15:20:00Z',
      address: 'Green Grocers Store, 123 Eco Street, Lagos',
      rider: 'David W.'
    }
  },
  {
    id: 'RCY-1230',
    date: '2025-04-10T10:00:00Z',
    type: 'cardboard',
    weight: 0, // kg (not weighed yet)
    status: 'scheduled',
    pickupDetails: {
      date: '2025-04-10T10:00:00Z',
      address: 'Green Grocers Store, 123 Eco Street, Lagos',
      notes: 'Please bring packaging materials for collection'
    }
  }
];

const ecoGoals = [
  {
    id: 1,
    title: 'Zero-Waste Packaging',
    currentValue: 92,
    targetValue: 95,
    units: '%',
    dueDate: '2025-04-30'
  },
  {
    id: 2,
    title: 'Recycle Paper Products',
    currentValue: 450,
    targetValue: 500,
    units: 'kg',
    dueDate: '2025-04-30'
  },
  {
    id: 3,
    title: 'Carbon Emissions Reduction',
    currentValue: 1422.5,
    targetValue: 2000,
    units: 'kg CO₂',
    dueDate: '2025-04-30'
  }
];

const wasteTips = [
  {
    id: 1,
    title: 'Implement a Composting System',
    description: 'Turn food waste into nutrient-rich soil for your green spaces.',
    difficulty: 'Medium',
    impact: 'High'
  },
  {
    id: 2,
    title: 'Switch to Biodegradable Packaging',
    description: 'Replace plastic packaging with biodegradable alternatives.',
    difficulty: 'Medium',
    impact: 'High'
  },
  {
    id: 3,
    title: 'Create a Recycling Station',
    description: 'Set up clearly labeled bins for different recyclable materials.',
    difficulty: 'Easy',
    impact: 'Medium'
  }
];

const RecyclingPage = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getMaterialColor = (type) => {
    switch (type) {
      case 'paper':
        return 'text-amber-600';
      case 'plastic':
        return 'text-blue-600';
      case 'cardboard':
        return 'text-brown-600';
      case 'glass':
        return 'text-teal-600';
      case 'metal':
        return 'text-gray-600';
      case 'mixed':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <DashboardLayout userRole="vendor">
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Recycling & Sustainability</h1>
            <p className="text-gray-600">Track and manage your eco-friendly initiatives</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </Button>
            <Button className="bg-primary hover:bg-primary-hover text-black">
              <PlusCircle className="mr-2 h-4 w-4" />
              Schedule Pickup
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 w-full md:w-auto grid grid-cols-2 md:flex">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="pickups">Recycling Pickups</TabsTrigger>
            <TabsTrigger value="goals">Eco Goals</TabsTrigger>
            <TabsTrigger value="tips">Reduce Waste</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Recycled</CardDescription>
                  <CardTitle className="text-2xl">{recyclingStats.totalWeight} kg</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Monthly Goal: 4,000 kg</span>
                    <Badge variant="outline">{recyclingStats.goalProgress}%</Badge>
                  </div>
                  <Progress value={recyclingStats.goalProgress} className="h-2 mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Carbon Saved</CardDescription>
                  <CardTitle className="text-2xl">{recyclingStats.carbonSaved} kg CO₂</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <Leaf className="h-4 w-4 mr-1" />
                    <span>Equivalent to planting 71 trees</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Recycling Rate</CardDescription>
                  <CardTitle className="text-2xl">{recyclingStats.recyclingRate}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Goal: 90%</span>
                    <Badge className="bg-green-500">High</Badge>
                  </div>
                  <Progress value={recyclingStats.recyclingRate} className="h-2 mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Recycling Points</CardDescription>
                  <CardTitle className="text-2xl">{recyclingStats.pointsEarned}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-blue-600">
                    <CircleDollarSign className="h-4 w-4 mr-1" />
                    <span>{recyclingStats.carbonCredits} Carbon Credits earned</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Materials Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Recycling Breakdown</CardTitle>
                <CardDescription>Materials recycled this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Cardboard</span>
                      <span className="text-sm">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <span className="text-xs text-gray-500">1,280 kg recycled</span>
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Paper</span>
                      <span className="text-sm">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                    <span className="text-xs text-gray-500">853 kg recycled</span>
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Plastic</span>
                      <span className="text-sm">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    <span className="text-xs text-gray-500">712 kg recycled</span>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
                  <div className="text-sm text-gray-600">
                    You're recycling <span className="font-medium">15%</span> more than similar businesses in your area.
                  </div>
                  <Button variant="outline" className="mt-4 md:mt-0">
                    <BarChart className="mr-2 h-4 w-4" />
                    <span>Detailed Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Pickups */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Recycling Activity</CardTitle>
                <CardDescription>Your last 3 recycling pickups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recyclingHistory.filter(item => item.status === 'completed').slice(0, 3).map((pickup) => (
                    <div key={pickup.id} className="flex items-start justify-between gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-full">
                          <Recycle className="h-5 w-5 text-green-600" />
                        </div>
                        
                        <div className="ml-4">
                          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                            <span className="font-medium">{pickup.id}</span>
                            <span className="hidden md:inline-block text-gray-300">•</span>
                            <span className={`capitalize font-medium ${getMaterialColor(pickup.type)}`}>
                              {pickup.type}
                            </span>
                          </div>
                          <div className="mt-1 text-sm text-gray-600">
                            {formatDate(pickup.date)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold">{pickup.weight} kg</div>
                        <div className="text-xs text-green-600">
                          {pickup.carbonSaved} kg CO₂ saved
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t text-center">
                  <Button variant="ghost" className="w-full justify-center" onClick={() => setActiveTab('pickups')}>
                    <span>View All Recycling History</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pickups" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recycling Pickups</CardTitle>
                <CardDescription>History of all your recycling activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recyclingHistory.map((pickup) => (
                    <div key={pickup.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full ${
                            pickup.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'
                          }`}>
                            {pickup.status === 'completed' ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          
                          <div className="ml-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                              <span className="font-medium">{pickup.id}</span>
                              <span className="hidden md:inline-block text-gray-300">•</span>
                              <span className={`capitalize font-medium ${getMaterialColor(pickup.type)}`}>
                                {pickup.type}
                              </span>
                            </div>
                            
                            <div className="mt-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                              {getStatusBadge(pickup.status)}
                              <span className="text-sm text-gray-600">
                                {formatDate(pickup.date)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end justify-between">
                          {pickup.weight > 0 ? (
                            <>
                              <div className="text-lg font-bold">{pickup.weight} kg</div>
                              <div className="text-xs text-green-600">
                                {pickup.carbonSaved} kg CO₂ saved
                              </div>
                            </>
                          ) : (
                            <div className="text-sm italic text-gray-500 mt-1">
                              Not weighed yet
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {!isMobile && pickup.pickupDetails && (
                        <div className="mt-3 pt-3 border-t text-sm">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div>
                              <span className="text-gray-500">Pickup Date:</span>{' '}
                              <span className="font-medium">{formatDate(pickup.pickupDetails.date)}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Location:</span>{' '}
                              <span className="font-medium">{pickup.pickupDetails.address}</span>
                            </div>
                            {pickup.pickupDetails.rider && (
                              <div>
                                <span className="text-gray-500">Rider:</span>{' '}
                                <span className="font-medium">{pickup.pickupDetails.rider}</span>
                              </div>
                            )}
                            {pickup.pickupDetails.notes && (
                              <div className="md:col-span-3 mt-1">
                                <span className="text-gray-500">Notes:</span>{' '}
                                <span>{pickup.pickupDetails.notes}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {pickup.status === 'scheduled' && (
                        <div className="mt-3 flex justify-end">
                          <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                            Cancel Pickup
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button className="bg-primary hover:bg-primary-hover text-black">
                    <Truck className="mr-2 h-4 w-4" />
                    Schedule New Pickup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Eco Goals</CardTitle>
                <CardDescription>Track your environmental sustainability targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {ecoGoals.map((goal) => (
                    <div key={goal.id} className="bg-white border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                        <div>
                          <h3 className="text-lg font-medium">{goal.title}</h3>
                          <p className="text-sm text-gray-600">
                            Due by {new Date(goal.dueDate).toLocaleDateString('en-NG', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        
                        <div className="mt-2 md:mt-0 md:text-right">
                          <div className="text-xl font-bold">
                            {goal.currentValue} / {goal.targetValue} {goal.units}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Progress: {Math.round((goal.currentValue / goal.targetValue) * 100)}%
                          </span>
                          <span className="text-sm text-gray-600">
                            Remaining: {goal.targetValue - goal.currentValue} {goal.units}
                          </span>
                        </div>
                        <Progress value={(goal.currentValue / goal.targetValue) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button className="bg-primary hover:bg-primary-hover text-black">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Eco Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Carbon Credits</CardTitle>
                <CardDescription>Track and use your earned credits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-green-50 rounded-lg border border-green-100">
                  <div>
                    <h3 className="text-lg font-medium text-green-800">Available Carbon Credits</h3>
                    <p className="text-sm text-green-700 mt-1">
                      You can use these credits to offset your carbon footprint or trade them
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="text-3xl font-bold text-green-800">{recyclingStats.carbonCredits}</div>
                    <p className="text-sm text-green-700 mt-1">Credits</p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Leaf className="mr-2 h-4 w-4" />
                    Use Credits for Offset
                  </Button>
                  <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Trade Carbon Credits
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reduce Business Waste</CardTitle>
                <CardDescription>Tips and strategies to improve your sustainability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {wasteTips.map((tip) => (
                    <div key={tip.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="p-2 bg-primary-light/30 rounded-full inline-block mb-3">
                        <PackageOpen className="h-5 w-5 text-primary" />
                      </div>
                      
                      <h3 className="text-lg font-medium mb-2">{tip.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{tip.description}</p>
                      
                      <div className="flex justify-between text-sm text-gray-500">
                        <div>
                          <span className="font-medium">Difficulty:</span>{' '}
                          <Badge variant="outline" className={
                            tip.difficulty === 'Easy' ? 'bg-green-100 text-green-800 border-green-200' : 
                            tip.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                            'bg-red-100 text-red-800 border-red-200'
                          }>
                            {tip.difficulty}
                          </Badge>
                        </div>
                        <div>
                          <span className="font-medium">Impact:</span>{' '}
                          <Badge variant="outline" className={
                            tip.impact === 'High' ? 'bg-green-100 text-green-800 border-green-200' : 
                            tip.impact === 'Medium' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                            'bg-blue-100 text-blue-800 border-blue-200'
                          }>
                            {tip.impact}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-blue-800">Need personalized advice?</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Our sustainability experts can provide tailored recommendations for your business
                      </p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap">
                      Schedule Consultation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default RecyclingPage;
