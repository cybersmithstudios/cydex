import React from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Truck, Box, Clock, Leaf, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data
const activeOrders = [
  {
    id: 'ORD-1234',
    vendor: 'Eco Grocery',
    status: 'in-transit',
    eta: '15 minutes',
    items: 3,
    carbonSaved: 0.5,
    updatedAt: '10 minutes ago'
  },
  {
    id: 'ORD-1235',
    vendor: 'Green Pharmacy',
    status: 'processing',
    eta: '40 minutes',
    items: 1,
    carbonSaved: 0.3,
    updatedAt: '5 minutes ago'
  }
];

const pastOrders = [
  {
    id: 'ORD-1230',
    vendor: 'Organic Market',
    status: 'delivered',
    date: '2023-07-05',
    items: 4,
    carbonSaved: 0.7
  },
  {
    id: 'ORD-1229',
    vendor: 'Sustainable Home',
    status: 'delivered',
    date: '2023-07-03',
    items: 2,
    carbonSaved: 0.4
  },
  {
    id: 'ORD-1220',
    vendor: 'Eco Grocery',
    status: 'delivered',
    date: '2023-07-01',
    items: 5,
    carbonSaved: 0.8
  }
];

const CustomerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleOrderClick = (orderId: string) => {
    navigate(`/customer/orders/${orderId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge className="bg-blue-500">Processing</Badge>;
      case 'in-transit':
        return <Badge className="bg-amber-500">In Transit</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const totalCarbonSaved = [...activeOrders, ...pastOrders].reduce(
    (total, order) => total + order.carbonSaved,
    0
  );

  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="p-2 sm:p-4 md:p-6 max-w-full mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-gray-600">
              Track your deliveries and eco-impact
            </p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary-hover text-black"
            onClick={() => navigate('/customer/new-order')}
          >
            New Order
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeOrders.length}</div>
              <p className="text-sm text-gray-500">Packages on the way</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Carbon Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalCarbonSaved.toFixed(1)} kg</div>
              <p className="text-sm text-gray-500">CO₂ reduced this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Eco Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">240</div>
              <div className="mt-2">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span>Level Progress</span>
                  <span>80%</span>
                </div>
                <Progress value={80} className="h-2 bg-gray-100" />
              </div>
              <p className="text-xs text-gray-500 mt-2">60 points until next reward</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Track your current and past deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active Orders</TabsTrigger>
                <TabsTrigger value="past">Order History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                {activeOrders.length > 0 ? (
                  <div className="space-y-4">
                    {activeOrders.map((order) => (
                      <div 
                        key={order.id} 
                        className="bg-white border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow cursor-pointer" 
                        onClick={() => handleOrderClick(order.id)}
                      >
                        <div className="flex flex-col md:flex-row justify-between">
                          <div className="flex items-start space-x-3 md:space-x-4">
                            <div className="p-2 bg-primary-light rounded-full">
                              {order.status === 'in-transit' ? (
                                <Truck className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                              ) : (
                                <Box className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center flex-wrap">
                                <h3 className="font-medium">{order.vendor}</h3>
                                <span className="mx-2 text-gray-300 hidden sm:inline">•</span>
                                <span className="text-sm text-gray-500 w-full sm:w-auto">{order.id}</span>
                              </div>
                              <div className="flex items-center mt-1 flex-wrap">
                                {getStatusBadge(order.status)}
                                {order.eta && (
                                  <div className="ml-0 mt-1 sm:ml-3 sm:mt-0 flex items-center text-sm text-gray-600">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>ETA: {order.eta}</span>
                                  </div>
                                )}
                              </div>
                              <div className="mt-2 text-sm text-gray-600">
                                <span>{order.items} items</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span>Updated {order.updatedAt}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center mt-4 md:mt-0">
                            <div className="flex items-center mr-4 text-sm bg-green-50 text-green-700 px-2 py-1 rounded">
                              <Leaf className="h-4 w-4 mr-1" />
                              <span>{order.carbonSaved} kg CO₂ saved</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-1 h-auto"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOrderClick(order.id);
                              }}
                            >
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No active orders</p>
                    <Button className="mt-4 bg-primary hover:bg-primary-hover text-black">
                      Place an Order
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past">
                <div className="space-y-4">
                  {pastOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="bg-white border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleOrderClick(order.id)}
                    >
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex items-start space-x-3 md:space-x-4">
                          <div className="p-2 bg-gray-100 rounded-full">
                            <Box className="h-5 w-5 md:h-6 md:w-6 text-gray-500" />
                          </div>
                          <div>
                            <div className="flex items-center flex-wrap">
                              <h3 className="font-medium">{order.vendor}</h3>
                              <span className="mx-2 text-gray-300 hidden sm:inline">•</span>
                              <span className="text-sm text-gray-500 w-full sm:w-auto">{order.id}</span>
                            </div>
                            <div className="flex items-center mt-1 flex-wrap">
                              {getStatusBadge(order.status)}
                              <div className="ml-0 mt-1 sm:ml-3 sm:mt-0 text-sm text-gray-600">
                                {order.date}
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              <span>{order.items} items</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-4 md:mt-0">
                          <div className="flex items-center mr-4 text-sm bg-green-50 text-green-700 px-2 py-1 rounded">
                            <Leaf className="h-4 w-4 mr-1" />
                            <span>{order.carbonSaved} kg CO₂ saved</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-1 h-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOrderClick(order.id);
                            }}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recycling Impact</CardTitle>
              <CardDescription>Track your contribution to sustainability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-primary-light/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Packages Recycled</h4>
                    <span className="text-lg font-bold">12</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-gray-600 mt-2">8 more to reach your monthly goal</p>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-full mr-3">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Zero Waste Badge</h4>
                      <p className="text-sm text-gray-600">3 more recycled packages</p>
                    </div>
                  </div>
                  <Progress value={70} className="w-20 h-2" />
                </div>
                
                <Button 
                  className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-black"
                  onClick={() => navigate('/customer/recycling')}
                >
                  <span>View All Badges</span>
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Wallet</CardTitle>
              <CardDescription>Manage your balance and rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-sm text-gray-600">Available Balance</p>
                <div className="text-3xl font-bold">₦37,560.95</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary-light rounded-full mr-3">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Carbon Credits</h4>
                      <p className="text-sm text-gray-600">Available to use</p>
                    </div>
                  </div>
                  <span className="font-bold">120</span>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-full mr-3">
                      <div className="h-5 w-5 text-yellow-600">🎁</div>
                    </div>
                    <div>
                      <h4 className="font-medium">Rewards</h4>
                      <p className="text-sm text-gray-600">Available promotions</p>
                    </div>
                  </div>
                  <span className="font-bold">3</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4 flex items-center justify-center bg-primary hover:bg-primary-hover text-black"
                onClick={() => navigate('/customer/wallet')}
              >
                <span>Go to Wallet</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
