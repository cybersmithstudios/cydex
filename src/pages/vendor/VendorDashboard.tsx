import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Package, Clock, Leaf, ChevronRight, ArrowUpRight, 
  TrendingUp, BarChart3, UserCheck, ShoppingBag, RecycleIcon
} from 'lucide-react';
import LoadingDisplay from '@/components/ui/LoadingDisplay';
import { Link } from 'react-router-dom';

// Mock data with updated Naira values (1 USD = 1,533.10 NGN)
const pendingOrders = [
  {
    id: 'ORD-5678',
    customer: 'Emily Johnson',
    status: 'pending',
    createdAt: '5 minutes ago',
    items: 3,
    total: 73579.77 // 47.99 USD
  },
  {
    id: 'ORD-5679',
    customer: 'David Wilson',
    status: 'pending',
    createdAt: '12 minutes ago',
    items: 1,
    total: 28362.35 // 18.50 USD
  }
];

const inProgressOrders = [
  {
    id: 'ORD-5677',
    customer: 'Rachel Green',
    rider: 'Alex Martinez',
    status: 'processing',
    estimatedDelivery: '25 minutes',
    items: 2,
    total: 56341.42 // 36.75 USD
  }
];

const completedOrders = [
  {
    id: 'ORD-5670',
    customer: 'Michael Roberts',
    status: 'delivered',
    completedAt: '1 hour ago',
    items: 4,
    total: 80104.97, // 52.25 USD
    carbonSaved: 0.7
  },
  {
    id: 'ORD-5668',
    customer: 'Sarah Thompson',
    status: 'delivered',
    completedAt: '3 hours ago',
    items: 2,
    total: 45916.34, // 29.95 USD
    carbonSaved: 0.4
  },
  {
    id: 'ORD-5665',
    customer: 'Jennifer Liu',
    status: 'delivered',
    completedAt: 'Yesterday',
    items: 3,
    total: 64083.58, // 41.80 USD
    carbonSaved: 0.6
  }
];

const VendorDashboard = () => {
  const { user } = useAuth();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Processing</Badge>;
      case 'delivering':
        return <Badge className="bg-purple-500">Out for Delivery</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      case 'canceled':
        return <Badge className="bg-red-500">Canceled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const totalOrders = pendingOrders.length + inProgressOrders.length + completedOrders.length;
  const totalSales = [...pendingOrders, ...inProgressOrders, ...completedOrders].reduce(
    (total, order) => total + order.total,
    0
  );
  const totalCarbonSaved = completedOrders.reduce(
    (total, order) => total + (order.carbonSaved || 0),
    0
  );

  return (
    <DashboardLayout userRole="VENDOR">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-gray-600">
              Manage your store and eco-friendly deliveries
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-black" asChild>
            <Link to="/vendor/add-product">
              <Package className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Today's Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingOrders.length + inProgressOrders.length + completedOrders.length}</div>
              <div className="flex items-center mt-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+3 from yesterday</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Today's Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₦{(pendingOrders.reduce((total, order) => total + order.total, 0) + 
                                                    inProgressOrders.reduce((total, order) => total + order.total, 0) + 
                                                    completedOrders.reduce((total, order) => total + order.total, 0)).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              <div className="flex items-center mt-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12% from yesterday</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Carbon Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedOrders.reduce((total, order) => total + (order.carbonSaved || 0), 0).toFixed(1)} kg</div>
              <p className="text-sm text-gray-500">CO₂ saved with eco-delivery</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Recycling Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">87%</div>
              <div className="mt-2">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span>Progress to 90% goal</span>
                  <span>87%</span>
                </div>
                <Progress value={87} className="h-2 bg-gray-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {pendingOrders.length > 0 && (
          <Card className="border-2 border-amber-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Badge className="mr-2 bg-amber-500">New</Badge> 
                Pending Orders
              </CardTitle>
              <CardDescription>Orders that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingOrders.map((order) => (
                  <div key={order.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-amber-100 rounded-full">
                          <Package className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">Order from {order.customer}</h3>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{order.id}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            {getStatusBadge(order.status)}
                            <div className="ml-3 flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Received {order.createdAt}</span>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            <span>{order.items} items</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span>₦{order.total.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-4 md:mt-0">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Reject
                          </Button>
                          <Button className="bg-primary hover:bg-primary-hover text-black">
                            Process Order
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>Track and manage all your orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="in-progress" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="all">All Orders</TabsTrigger>
              </TabsList>
              
              <TabsContent value="in-progress">
                {inProgressOrders.length > 0 ? (
                  <div className="space-y-4">
                    {inProgressOrders.map((order) => (
                      <div key={order.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Package className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">Order from {order.customer}</h3>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-gray-500">{order.id}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                {getStatusBadge(order.status)}
                                <div className="ml-3 flex items-center text-sm text-gray-600">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>ETA: {order.estimatedDelivery}</span>
                                </div>
                              </div>
                              <div className="mt-2 text-sm text-gray-600">
                                <span>{order.items} items</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span>₦{order.total.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                {order.rider && (
                                  <>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span>Rider: {order.rider}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center mt-4 md:mt-0">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Contact Rider
                              </Button>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No orders in progress</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed">
                <div className="space-y-4">
                  {completedOrders.map((order) => (
                    <div key={order.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-green-100 rounded-full">
                            <Package className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">Order from {order.customer}</h3>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-500">{order.id}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              {getStatusBadge(order.status)}
                              <div className="ml-3 flex items-center text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>Completed {order.completedAt}</span>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              <span>{order.items} items</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span>₦{order.total.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end justify-between mt-4 md:mt-0 space-y-2">
                          {order.carbonSaved && (
                            <div className="flex items-center text-sm bg-green-50 text-green-700 px-2 py-1 rounded">
                              <Leaf className="h-4 w-4 mr-1" />
                              <span>{order.carbonSaved} kg CO₂ saved</span>
                            </div>
                          )}
                          <Button variant="ghost" size="sm" className="p-1 h-auto">
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="all">
                <div className="text-center py-4">
                  <Button variant="outline" className="mb-4">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Full Order History
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Status</CardTitle>
              <CardDescription>Track your eco-friendly initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-primary-light/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Green Packaging Used</h4>
                    <span className="text-lg font-bold">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                  <p className="text-xs text-gray-600 mt-2">Goal: 95% by next month</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Carbon Offset</h4>
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-xl font-bold">5.2 tons</div>
                    <p className="text-xs text-gray-600 mt-1">This year</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Recycling Rate</h4>
                      <RecycleIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-xl font-bold">87%</div>
                    <p className="text-xs text-gray-600 mt-1">Packaging returned</p>
                  </div>
                </div>
                
                <Button className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-black">
                  <span>Sustainability Report</span>
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Customer Insights</CardTitle>
              <CardDescription>Understanding your eco-conscious customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-full mr-3">
                      <UserCheck className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Repeat Customers</h4>
                      <p className="text-sm text-gray-600">Last 30 days</p>
                    </div>
                  </div>
                  <span className="font-bold">68%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <ShoppingBag className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Average Order Value</h4>
                      <p className="text-sm text-gray-600">Eco-friendly products</p>
                    </div>
                  </div>
                  <span className="font-bold">₦65,616.68</span>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium mb-2">Popular Eco Categories</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Organic Produce</span>
                      <div className="w-32">
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Zero-Waste Items</span>
                      <div className="w-32">
                        <Progress value={65} className="h-2" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Plant-Based Foods</span>
                      <div className="w-32">
                        <Progress value={50} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-black">
                  <span>Customer Analytics</span>
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorDashboard;
