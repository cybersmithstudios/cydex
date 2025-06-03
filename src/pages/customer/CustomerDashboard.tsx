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
        return <Badge className="bg-blue-500 text-xs">Processing</Badge>;
      case 'in-transit':
        return <Badge className="bg-amber-500 text-xs">In Transit</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500 text-xs">Delivered</Badge>;
      default:
        return <Badge className="text-xs">Unknown</Badge>;
    }
  };

  const totalCarbonSaved = [...activeOrders, ...pastOrders].reduce(
    (total, order) => total + order.carbonSaved,
    0
  );

  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="p-2 sm:p-4 md:p-6 max-w-full mx-auto space-y-3 sm:space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Track your deliveries and eco-impact
            </p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary-hover text-black text-sm sm:text-base w-full sm:w-auto"
            onClick={() => navigate('/customer/new-order')}
          >
            New Order
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base font-medium">Active Orders</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-2xl sm:text-3xl font-bold">{activeOrders.length}</div>
              <p className="text-xs sm:text-sm text-gray-500">Packages on the way</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base font-medium">Carbon Savings</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-2xl sm:text-3xl font-bold">{totalCarbonSaved.toFixed(1)} kg</div>
              <p className="text-xs sm:text-sm text-gray-500">CO₂ reduced this month</p>
            </CardContent>
          </Card>
          
          <Card className="sm:col-span-2 md:col-span-1">
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base font-medium">Eco Points</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-2xl sm:text-3xl font-bold">240</div>
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
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Orders</CardTitle>
            <CardDescription className="text-sm">Track your current and past deliveries</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="mb-3 sm:mb-4 w-full">
                <TabsTrigger value="active" className="text-xs sm:text-sm flex-1">Active Orders</TabsTrigger>
                <TabsTrigger value="past" className="text-xs sm:text-sm flex-1">Order History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                {activeOrders.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {activeOrders.map((order) => (
                      <div 
                        key={order.id} 
                        className="bg-white border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer" 
                        onClick={() => handleOrderClick(order.id)}
                      >
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="p-1.5 sm:p-2 bg-primary-light rounded-full flex-shrink-0">
                              {order.status === 'in-transit' ? (
                                <Truck className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                              ) : (
                                <Box className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center flex-wrap gap-1 sm:gap-0">
                                <h3 className="font-medium text-sm sm:text-base truncate">{order.vendor}</h3>
                                <span className="mx-2 text-gray-300 hidden sm:inline">•</span>
                                <span className="text-xs sm:text-sm text-gray-500">{order.id}</span>
                              </div>
                              <div className="flex items-center mt-1 flex-wrap gap-2">
                                {getStatusBadge(order.status)}
                                {order.eta && (
                                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    <span>ETA: {order.eta}</span>
                                  </div>
                                )}
                              </div>
                              <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                                <span>{order.items} items</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span>Updated {order.updatedAt}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3 sm:mt-0 sm:ml-4">
                            <div className="flex items-center text-xs sm:text-sm bg-green-50 text-green-700 px-2 py-1 rounded">
                              <Leaf className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                              <span>{order.carbonSaved} kg CO₂ saved</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-1 h-auto ml-2 sm:ml-4"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOrderClick(order.id);
                              }}
                            >
                              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-10">
                    <p className="text-gray-500 text-sm sm:text-base">No active orders</p>
                    <Button className="mt-3 sm:mt-4 bg-primary hover:bg-primary-hover text-black text-sm sm:text-base">
                      Place an Order
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past">
                <div className="space-y-3 sm:space-y-4">
                  {pastOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="bg-white border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleOrderClick(order.id)}
                    >
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="p-1.5 sm:p-2 bg-gray-100 rounded-full flex-shrink-0">
                            <Box className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-500" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center flex-wrap gap-1 sm:gap-0">
                              <h3 className="font-medium text-sm sm:text-base truncate">{order.vendor}</h3>
                              <span className="mx-2 text-gray-300 hidden sm:inline">•</span>
                              <span className="text-xs sm:text-sm text-gray-500">{order.id}</span>
                            </div>
                            <div className="flex items-center mt-1 flex-wrap gap-2">
                              {getStatusBadge(order.status)}
                              <div className="text-xs sm:text-sm text-gray-600">
                                {order.date}
                              </div>
                            </div>
                            <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                              <span>{order.items} items</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3 sm:mt-0 sm:ml-4">
                          <div className="flex items-center text-xs sm:text-sm bg-green-50 text-green-700 px-2 py-1 rounded">
                            <Leaf className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span>{order.carbonSaved} kg CO₂ saved</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-1 h-auto ml-2 sm:ml-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOrderClick(order.id);
                            }}
                          >
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Recycling Impact</CardTitle>
              <CardDescription className="text-sm">Track your contribution to sustainability</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-primary-light/50 p-3 sm:p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm sm:text-base">Packages Recycled</h4>
                    <span className="text-lg sm:text-xl font-bold">12</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-gray-600 mt-2">8 more to reach your monthly goal</p>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-full mr-3 flex-shrink-0">
                      <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm sm:text-base">Zero Waste Badge</h4>
                      <p className="text-xs sm:text-sm text-gray-600">3 more recycled packages</p>
                    </div>
                  </div>
                  <Progress value={70} className="w-16 sm:w-20 h-2 ml-3" />
                </div>
                
                <Button 
                  className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-black text-sm sm:text-base"
                  onClick={() => navigate('/customer/recycling')}
                >
                  <span>View All Badges</span>
                  <ArrowUpRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Wallet</CardTitle>
              <CardDescription className="text-sm">Manage your balance and rewards</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-gray-600">Available Balance</p>
                <div className="text-2xl sm:text-3xl font-bold">₦37,560.95</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="p-1.5 sm:p-2 bg-primary-light rounded-full mr-3 flex-shrink-0">
                      <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm sm:text-base">Carbon Credits</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Available to use</p>
                    </div>
                  </div>
                  <span className="font-bold text-sm sm:text-base ml-3">120</span>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="p-1.5 sm:p-2 bg-yellow-100 rounded-full mr-3 flex-shrink-0">
                      <div className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 text-sm sm:text-base">🎁</div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm sm:text-base">Rewards</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Available promotions</p>
                    </div>
                  </div>
                  <span className="font-bold text-sm sm:text-base ml-3">3</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4 flex items-center justify-center bg-primary hover:bg-primary-hover text-black text-sm sm:text-base"
                onClick={() => navigate('/customer/wallet')}
              >
                <span>Go to Wallet</span>
                <ArrowUpRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
