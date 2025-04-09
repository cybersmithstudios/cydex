
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Recycle, Leaf, ArrowUpRight, Plant, BarChart3, 
  TrendingUp, Package, Truck, BarChart2, Activity,
  Clock, Download, FileText, Plus, Calendar, Search,
  Trash2, RefreshCw, CheckCircle, CircleDot
} from 'lucide-react';

// Mock data for recycling metrics
const recyclingData = {
  carbonSaved: 1250, // kg
  packagingReturned: 85, // percent
  greenCredits: 750,
  monthlyGoal: 1500, // kg
  recyclables: {
    plastic: 42, // percent of total
    paper: 28,
    glass: 15,
    organic: 15
  },
  recyclingHistory: [
    {
      id: 'REC-001',
      date: 'Today, 11:30 AM',
      items: [
        { name: 'Plastic Containers', quantity: 12, weight: 2.4 },
        { name: 'Glass Bottles', quantity: 8, weight: 4.0 }
      ],
      totalWeight: 6.4,
      carbonSaved: 3.2,
      greenCredits: 35,
      status: 'processed'
    },
    {
      id: 'REC-002',
      date: 'Yesterday, 2:15 PM',
      items: [
        { name: 'Cardboard Boxes', quantity: 15, weight: 7.5 },
        { name: 'Paper Bags', quantity: 20, weight: 2.0 }
      ],
      totalWeight: 9.5,
      carbonSaved: 4.8,
      greenCredits: 45,
      status: 'processed'
    },
    {
      id: 'REC-003',
      date: 'Aug 15, 2023',
      items: [
        { name: 'Plastic Bags', quantity: 30, weight: 1.5 },
        { name: 'Food Containers', quantity: 10, weight: 2.0 }
      ],
      totalWeight: 3.5,
      carbonSaved: 1.8,
      greenCredits: 20,
      status: 'processed'
    }
  ],
  pendingPickups: [
    {
      id: 'PIC-001',
      scheduledDate: 'Tomorrow, 10:00 AM',
      estimatedItems: 25,
      estimatedWeight: 15,
      address: '123 Green Street, Lagos',
      instructions: 'Items are sorted and packaged'
    }
  ],
  recyclableItems: [
    { 
      name: 'Plastic Containers',
      category: 'plastic',
      value: 15, // green credits per kg
      requirements: 'Clean, dry, without labels'
    },
    { 
      name: 'Glass Bottles',
      category: 'glass',
      value: 12,
      requirements: 'Rinsed, without caps'
    },
    { 
      name: 'Cardboard',
      category: 'paper',
      value: 10,
      requirements: 'Flattened, dry, no food residue'
    },
    { 
      name: 'Paper Bags',
      category: 'paper',
      value: 8,
      requirements: 'Clean, dry, no plastic components'
    },
    { 
      name: 'Food Scraps',
      category: 'organic',
      value: 5,
      requirements: 'No dairy or meat products'
    }
  ]
};

const VendorRecycling = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate progress percentage
  const carbonSavedPercent = Math.min(Math.round((recyclingData.carbonSaved / recyclingData.monthlyGoal) * 100), 100);

  return (
    <DashboardLayout userRole="vendor">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Recycling Dashboard</h1>
            <p className="text-gray-600">
              Manage your eco-friendly initiatives and recycling progress
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-black">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Pickup
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-green-600" />
                CO₂ Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recyclingData.carbonSaved} kg</div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Monthly Goal: {recyclingData.monthlyGoal} kg</span>
                  <span>{carbonSavedPercent}%</span>
                </div>
                <Progress value={carbonSavedPercent} className="h-2" />
              </div>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center">
                <Recycle className="mr-2 h-5 w-5 text-blue-600" />
                Packaging Returned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recyclingData.packagingReturned}%</div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Goal: 90%</span>
                  <span>{recyclingData.packagingReturned}%</span>
                </div>
                <Progress value={recyclingData.packagingReturned} className="h-2" />
              </div>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center">
                <Plant className="mr-2 h-5 w-5 text-green-600" />
                Green Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recyclingData.greenCredits}</div>
              <p className="text-xs text-gray-600 mt-2">
                Can be used for discounts and eco-incentives
              </p>
              <Button variant="link" className="text-xs p-0 h-auto mt-1 text-primary">
                View redemption options
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center">
                <Activity className="mr-2 h-5 w-5 text-purple-600" />
                Recycling Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recyclingData.recyclingHistory.length} drop-offs</div>
              <p className="text-xs text-gray-600 mt-2">
                Last 30 days
              </p>
              <Button variant="link" className="text-xs p-0 h-auto mt-1 text-primary">
                View activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Recycling Management</CardTitle>
            <CardDescription>Track your recycling efforts and schedule pickups</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="dashboard" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4 mb-4">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="pickups">Pickup Requests</TabsTrigger>
                <TabsTrigger value="items">Recyclable Items</TabsTrigger>
              </TabsList>
              
              {/* Dashboard Tab */}
              <TabsContent value="dashboard">
                <div className="space-y-6">
                  {/* Recycling Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-r from-green-50 to-blue-50">
                      <CardHeader>
                        <CardTitle className="text-lg">Recycling Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1 text-sm">
                              <span className="flex items-center">
                                <CircleDot className="h-3 w-3 text-blue-500 mr-1" />
                                Plastic
                              </span>
                              <span>{recyclingData.recyclables.plastic}%</span>
                            </div>
                            <Progress value={recyclingData.recyclables.plastic} className="h-2 bg-gray-100" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1 text-sm">
                              <span className="flex items-center">
                                <CircleDot className="h-3 w-3 text-yellow-500 mr-1" />
                                Paper
                              </span>
                              <span>{recyclingData.recyclables.paper}%</span>
                            </div>
                            <Progress value={recyclingData.recyclables.paper} className="h-2 bg-gray-100" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1 text-sm">
                              <span className="flex items-center">
                                <CircleDot className="h-3 w-3 text-purple-500 mr-1" />
                                Glass
                              </span>
                              <span>{recyclingData.recyclables.glass}%</span>
                            </div>
                            <Progress value={recyclingData.recyclables.glass} className="h-2 bg-gray-100" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1 text-sm">
                              <span className="flex items-center">
                                <CircleDot className="h-3 w-3 text-green-500 mr-1" />
                                Organic
                              </span>
                              <span>{recyclingData.recyclables.organic}%</span>
                            </div>
                            <Progress value={recyclingData.recyclables.organic} className="h-2 bg-gray-100" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          <BarChart2 className="mr-2 h-4 w-4" />
                          View Detailed Analytics
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    {/* Recent Activity */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recyclingData.recyclingHistory.slice(0, 2).map((record) => (
                            <div 
                              key={record.id}
                              className="p-3 border rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex justify-between">
                                <div>
                                  <div className="font-medium">{record.id}</div>
                                  <div className="text-sm text-gray-600 mt-1 flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {record.date}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">{record.totalWeight} kg</div>
                                  <div className="text-sm text-green-600 mt-1">
                                    {record.carbonSaved} kg CO₂ saved
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-xs text-gray-600">
                                  {record.items.map(item => item.name).join(', ')}
                                </span>
                                <Badge className="bg-green-500">
                                  +{record.greenCredits} credits
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="link" 
                          className="w-full text-primary"
                          onClick={() => setActiveTab('history')}
                        >
                          View All Activity
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  {/* Schedule New Pickup */}
                  <Card className="bg-primary/10">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Truck className="mr-2 h-5 w-5" />
                        Schedule a Recycling Pickup
                      </CardTitle>
                      <CardDescription>Our eco-friendly riders will collect your recyclables</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pickup-date">Pickup Date</Label>
                          <Input id="pickup-date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pickup-time">Preferred Time</Label>
                          <Input id="pickup-time" type="time" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="estimated-weight">Estimated Weight (kg)</Label>
                          <Input id="estimated-weight" type="number" placeholder="Enter estimated weight" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-2">
                      <Button className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-black">
                        Schedule Pickup
                      </Button>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Save for Later
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              {/* History Tab */}
              <TabsContent value="history">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        className="pl-10"
                        placeholder="Search history..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Download className="h-4 w-4 mr-0 sm:mr-2" />
                        <span className="hidden sm:inline">Export</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {recyclingData.recyclingHistory.map((record) => (
                      <div 
                        key={record.id}
                        className="p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{record.id}</h3>
                              <Badge className="ml-2 bg-green-500">Processed</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {record.date}
                            </p>
                            <div className="mt-2">
                              <p className="font-medium text-sm">Items:</p>
                              <ul className="text-sm text-gray-600">
                                {record.items.map((item, index) => (
                                  <li key={index}>
                                    {item.name} x {item.quantity} ({item.weight} kg)
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div className="mt-4 sm:mt-0 text-right">
                            <div>
                              <p className="text-lg font-bold">{record.totalWeight} kg</p>
                              <p className="text-sm text-green-600">
                                {record.carbonSaved} kg CO₂ saved
                              </p>
                            </div>
                            <div className="mt-2">
                              <Badge className="bg-primary text-black">
                                +{record.greenCredits} green credits
                              </Badge>
                            </div>
                            <div className="mt-2">
                              <Button variant="link" size="sm" className="p-0 h-auto text-primary">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button variant="outline" className="flex items-center">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Load More
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              {/* Pickups Tab */}
              <TabsContent value="pickups">
                <div className="space-y-6">
                  {/* Pending Pickups */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Pending Pickups</h3>
                    {recyclingData.pendingPickups.length > 0 ? (
                      <div className="space-y-4">
                        {recyclingData.pendingPickups.map((pickup) => (
                          <Card key={pickup.id} className="border-amber-200 bg-amber-50">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-base">{pickup.id}</CardTitle>
                                <Badge className="bg-amber-500">Scheduled</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Pickup Time:</p>
                                  <p className="text-sm">{pickup.scheduledDate}</p>
                                </div>
                                
                                <div>
                                  <p className="text-sm font-medium">Address:</p>
                                  <p className="text-sm">{pickup.address}</p>
                                </div>
                                
                                <div>
                                  <p className="text-sm font-medium">Estimated Items:</p>
                                  <p className="text-sm">{pickup.estimatedItems} items (~{pickup.estimatedWeight} kg)</p>
                                </div>
                                
                                <div>
                                  <p className="text-sm font-medium">Instructions:</p>
                                  <p className="text-sm">{pickup.instructions}</p>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm">
                                <Calendar className="h-4 w-4 mr-2" />
                                Reschedule
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-8">
                          <Calendar className="h-10 w-10 text-gray-400 mb-3" />
                          <p className="text-gray-600">No pending pickups</p>
                          <Button className="mt-4 bg-primary hover:bg-primary-hover text-black">
                            <Plus className="mr-2 h-4 w-4" />
                            Schedule Pickup
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  
                  {/* Schedule New Pickup */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Schedule New Pickup</CardTitle>
                      <CardDescription>Our eco-friendly riders will collect your recyclables</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-pickup-date">Pickup Date</Label>
                          <Input id="new-pickup-date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-pickup-time">Preferred Time</Label>
                          <Input id="new-pickup-time" type="time" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-pickup-items">Number of Items</Label>
                          <Input id="new-pickup-items" type="number" placeholder="Approximate number of items" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-pickup-weight">Estimated Weight (kg)</Label>
                          <Input id="new-pickup-weight" type="number" placeholder="Approximate weight" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="new-pickup-instructions">Special Instructions</Label>
                          <Input id="new-pickup-instructions" placeholder="Any special instructions for pickup" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col xs:flex-row gap-2">
                      <Button className="w-full xs:w-auto bg-primary hover:bg-primary-hover text-black">
                        Schedule Pickup
                      </Button>
                      <Button variant="outline" className="w-full xs:w-auto">
                        Cancel
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Recyclable Items Tab */}
              <TabsContent value="items">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        className="pl-10"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <FileText className="h-4 w-4 mr-0 sm:mr-2" />
                        <span className="hidden sm:inline">Guide</span>
                      </Button>
                      <Button className="bg-primary hover:bg-primary-hover text-black">
                        <Plus className="h-4 w-4 mr-0 sm:mr-2" />
                        <span className="hidden sm:inline">Add Item</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recyclingData.recyclableItems.map((item, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-base">{item.name}</CardTitle>
                            <Badge className={`
                              ${item.category === 'plastic' ? 'bg-blue-500' : 
                                item.category === 'glass' ? 'bg-purple-500' : 
                                item.category === 'paper' ? 'bg-yellow-500' : 
                                'bg-green-500'}
                            `}>
                              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium">Green Credits:</p>
                              <p className="text-sm">{item.value} credits per kg</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Requirements:</p>
                              <p className="text-sm">{item.requirements}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="link" className="p-0 h-auto w-full text-primary">
                            View Recycling Guidelines
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VendorRecycling;
