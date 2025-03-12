
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Truck, Box, Clock, Leaf, ChevronRight, Search, 
  Calendar, Package, Filter, ArrowUpRight 
} from 'lucide-react';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data
const activeOrders = [
  {
    id: 'ORD-1234',
    vendor: 'Eco Grocery',
    status: 'in-transit',
    eta: '15 minutes',
    items: 3,
    carbonSaved: 0.5,
    updatedAt: '10 minutes ago',
    totalAmount: '₦4,250.00',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-1235',
    vendor: 'Green Pharmacy',
    status: 'processing',
    eta: '40 minutes',
    items: 1,
    carbonSaved: 0.3,
    updatedAt: '5 minutes ago',
    totalAmount: '₦1,850.75',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-1236',
    vendor: 'Sustainable Home',
    status: 'pending',
    eta: '60 minutes',
    items: 5,
    carbonSaved: 0.7,
    updatedAt: '2 minutes ago',
    totalAmount: '₦7,320.50',
    paymentStatus: 'pending'
  }
];

const pastOrders = [
  {
    id: 'ORD-1230',
    vendor: 'Organic Market',
    status: 'delivered',
    date: '2023-07-05',
    items: 4,
    carbonSaved: 0.7,
    totalAmount: '₦5,430.25',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-1229',
    vendor: 'Sustainable Home',
    status: 'delivered',
    date: '2023-07-03',
    items: 2,
    carbonSaved: 0.4,
    totalAmount: '₦2,780.00',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-1220',
    vendor: 'Eco Grocery',
    status: 'delivered',
    date: '2023-07-01',
    items: 5,
    carbonSaved: 0.8,
    totalAmount: '₦6,125.50',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-1219',
    vendor: 'Green Pharmacy',
    status: 'cancelled',
    date: '2023-06-28',
    items: 1,
    carbonSaved: 0.0,
    totalAmount: '₦950.75',
    paymentStatus: 'refunded'
  },
  {
    id: 'ORD-1215',
    vendor: 'Organic Market',
    status: 'delivered',
    date: '2023-06-25',
    items: 3,
    carbonSaved: 0.6,
    totalAmount: '₦3,840.25',
    paymentStatus: 'paid'
  }
];

const OrdersPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge className="bg-blue-500">Processing</Badge>;
      case 'in-transit':
        return <Badge className="bg-amber-500">In Transit</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      case 'pending':
        return <Badge className="bg-purple-500">Pending</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      case 'refunded':
        return <Badge className="bg-blue-500">Refunded</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const filteredPastOrders = pastOrders.filter(order => {
    if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !order.vendor.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <DashboardLayout userRole="customer">
      <div className="p-2 sm:p-4 md:p-6 max-w-full mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-gray-600">
              Manage and track your deliveries
            </p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary-hover text-black"
            onClick={() => navigate('/customer/new-order')}
          >
            New Order
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Orders</CardTitle>
            <CardDescription>View and track all your orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active Orders</TabsTrigger>
                <TabsTrigger value="past">Order History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <div key={order.id} className="bg-white border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
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
                            <div className="flex items-center flex-wrap gap-2">
                              <h3 className="font-medium">{order.vendor}</h3>
                              <span className="text-sm text-gray-500">{order.id}</span>
                            </div>
                            <div className="flex items-center mt-1 flex-wrap gap-2">
                              {getStatusBadge(order.status)}
                              {getPaymentStatusBadge(order.paymentStatus)}
                              {order.eta && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>ETA: {order.eta}</span>
                                </div>
                              )}
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              <span>{order.items} items</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span>Updated {order.updatedAt}</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span>{order.totalAmount}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-4 md:mt-0 justify-between md:justify-end w-full md:w-auto gap-4">
                          <div className="flex items-center text-sm bg-green-50 text-green-700 px-2 py-1 rounded">
                            <Leaf className="h-4 w-4 mr-1" />
                            <span>{order.carbonSaved} kg CO₂ saved</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-1 h-auto"
                            onClick={() => navigate(`/customer/orders/${order.id}`)}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="past">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      className="pl-10"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[150px]">
                        <div className="flex items-center">
                          <Filter className="mr-2 h-4 w-4" />
                          <span>Status</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger className="w-[150px]">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Time Period</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="week">Last Week</SelectItem>
                        <SelectItem value="month">Last Month</SelectItem>
                        <SelectItem value="year">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>A list of your past orders</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>CO₂ Saved</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPastOrders.map((order) => (
                        <TableRow key={order.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.vendor}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                          <TableCell>{order.totalAmount}</TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm text-green-700">
                              <Leaf className="h-4 w-4 mr-1" />
                              <span>{order.carbonSaved} kg</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => navigate(`/customer/orders/${order.id}`)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
