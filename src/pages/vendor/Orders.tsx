
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Package, Clock, Search, Filter, ArrowUpDown, 
  Download, Printer, ChevronRight, Calendar, Truck
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data with Naira values
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
  },
  {
    id: 'ORD-5680',
    customer: 'Michael Chen',
    status: 'pending',
    createdAt: '25 minutes ago',
    items: 2,
    total: 45379.12 // 29.60 USD
  }
];

const processingOrders = [
  {
    id: 'ORD-5677',
    customer: 'Rachel Green',
    rider: 'Alex Martinez',
    status: 'processing',
    estimatedDelivery: '25 minutes',
    processingTime: '15 minutes ago',
    items: 2,
    total: 56341.42 // 36.75 USD
  },
  {
    id: 'ORD-5676',
    customer: 'Tom Harris',
    rider: 'Felipe Rodriguez',
    status: 'processing',
    estimatedDelivery: '40 minutes',
    processingTime: '10 minutes ago',
    items: 4,
    total: 84139.96 // 54.88 USD
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
    carbonSaved: 0.7,
    rider: 'James Wilson'
  },
  {
    id: 'ORD-5668',
    customer: 'Sarah Thompson',
    status: 'delivered',
    completedAt: '3 hours ago',
    items: 2,
    total: 45916.34, // 29.95 USD
    carbonSaved: 0.4,
    rider: 'Lisa Rodriguez'
  },
  {
    id: 'ORD-5665',
    customer: 'Jennifer Liu',
    status: 'delivered',
    completedAt: 'Yesterday',
    items: 3,
    total: 64083.58, // 41.80 USD
    carbonSaved: 0.6,
    rider: 'Marcus Johnson'
  }
];

const orderBulkActions = [
  { label: 'Export Orders', icon: Download },
  { label: 'Print Orders', icon: Printer },
  { label: 'Batch Process', icon: Package }
];

const VendorOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const isMobile = useIsMobile();

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

  const filteredOrders = () => {
    const allOrders = [...pendingOrders, ...processingOrders, ...completedOrders];
    
    // Filter by search query
    return allOrders.filter((order) => {
      return (
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  return (
    <DashboardLayout userRole="vendor">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Order Management</h1>
            <p className="text-gray-600">
              Process, track and manage your customer orders
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-black">
            <Package className="mr-2 h-4 w-4" />
            Create Order
          </Button>
        </div>

        {/* Search and Filter Section */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  className="pl-10"
                  placeholder="Search orders by ID or customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Date Range</span>
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Filter</span>
                </Button>
                <Button variant="outline" className="flex items-center">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <span>Sort</span>
                </Button>
              </div>
              
              <div className="flex justify-end space-x-2">
                {orderBulkActions.map((action) => (
                  <Button key={action.label} variant="ghost" className="flex items-center">
                    <action.icon className="mr-2 h-4 w-4" />
                    {!isMobile && <span>{action.label}</span>}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">All Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {pendingOrders.length + processingOrders.length + completedOrders.length}
              </div>
              <p className="text-sm text-gray-500">Last 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingOrders.length}</div>
              <p className="text-sm text-gray-500">Need attention</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{processingOrders.length}</div>
              <p className="text-sm text-gray-500">In progress</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedOrders.length}</div>
              <p className="text-sm text-gray-500">Successfully delivered</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Manage and process your customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
              <TabsList className="mb-4 grid grid-cols-4 sm:grid-cols-4 lg:w-auto">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              {/* All Orders Tab */}
              <TabsContent value="all">
                <div className="space-y-4">
                  {[...pendingOrders, ...processingOrders, ...completedOrders].map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`p-2 rounded-full ${
                            order.status === 'pending' 
                              ? 'bg-amber-100' 
                              : order.status === 'processing'
                                ? 'bg-blue-100'
                                : 'bg-green-100'
                          }`}>
                            <Package className={`h-6 w-6 ${
                              order.status === 'pending' 
                                ? 'text-amber-600' 
                                : order.status === 'processing'
                                  ? 'text-blue-600'
                                  : 'text-green-600'
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{order.customer}</h3>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-500">{order.id}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              {getStatusBadge(order.status)}
                              <div className="ml-3 flex items-center text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>
                                  {order.status === 'pending' 
                                    ? `Received ${order.createdAt}`
                                    : order.status === 'processing'
                                      ? `Processing since ${order.processingTime}`
                                      : `Completed ${order.completedAt}`
                                  }
                                </span>
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
                        
                        <div className="flex items-center mt-4 sm:mt-0">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                            {order.status === 'pending' && (
                              <Button className="bg-primary hover:bg-primary-hover text-black">
                                Process
                              </Button>
                            )}
                            {order.status === 'processing' && (
                              <Button variant="outline" size="sm">
                                Track
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Pending Orders Tab */}
              <TabsContent value="pending">
                <div className="space-y-4">
                  {pendingOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-amber-100 rounded-full">
                            <Package className="h-6 w-6 text-amber-600" />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{order.customer}</h3>
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
                        
                        <div className="flex items-center mt-4 sm:mt-0">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View Items
                            </Button>
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
              </TabsContent>
              
              {/* Processing Orders Tab */}
              <TabsContent value="processing">
                <div className="space-y-4">
                  {processingOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <Truck className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{order.customer}</h3>
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
                        
                        <div className="flex items-center mt-4 sm:mt-0">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
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
              </TabsContent>
              
              {/* Completed Orders Tab */}
              <TabsContent value="completed">
                <div className="space-y-4">
                  {completedOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-green-100 rounded-full">
                            <Package className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{order.customer}</h3>
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
                              <span className="mx-2 text-gray-300">•</span>
                              <span>Rider: {order.rider}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end justify-between mt-4 sm:mt-0 space-y-2">
                          {order.carbonSaved && (
                            <div className="flex items-center text-sm bg-green-50 text-green-700 px-2 py-1 rounded">
                              <Package className="h-4 w-4 mr-1" />
                              <span>{order.carbonSaved} kg CO₂ saved</span>
                            </div>
                          )}
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Order Details
                            </Button>
                            <Button variant="outline" size="sm">
                              Reorder
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VendorOrders;
