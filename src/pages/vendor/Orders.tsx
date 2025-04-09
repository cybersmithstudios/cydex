
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Search, 
  Filter, 
  Calendar, 
  Truck, 
  Clock, 
  CheckCircle, 
  XCircle,
  ChevronRight,
  Download,
  Printer,
  AlertCircle
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock order data
const orders = [
  {
    id: 'ORD-5678',
    customer: 'Emily Johnson',
    status: 'pending',
    createdAt: '2025-04-09T10:23:00Z',
    items: [
      { id: 1, name: 'Organic Vegetables Mix', quantity: 1, price: 28952.59 },
      { id: 2, name: 'Free-Range Eggs (12pk)', quantity: 1, price: 15331 },
      { id: 3, name: 'Organic Almond Milk', quantity: 1, price: 29296.21 }
    ],
    total: 73579.77,
    address: '123 Green Street, Lagos',
    paymentMethod: 'Wallet',
    deliveryType: 'Express',
    deliveryFee: 3066.2,
    timeSlot: '2:00 PM - 4:00 PM'
  },
  {
    id: 'ORD-5679',
    customer: 'David Wilson',
    status: 'processing',
    createdAt: '2025-04-09T09:45:00Z',
    items: [
      { id: 1, name: 'Reusable Shopping Bag', quantity: 1, price: 7665.5 },
      { id: 2, name: 'Bamboo Toothbrush Set', quantity: 1, price: 12264.8 },
      { id: 3, name: 'Zero-Waste Starter Kit', quantity: 1, price: 45993 }
    ],
    total: 65923.3,
    address: '456 Eco Avenue, Lagos',
    paymentMethod: 'Card',
    deliveryType: 'Standard',
    deliveryFee: 1533.1,
    timeSlot: '10:00 AM - 12:00 PM',
    rider: {
      name: 'Alex Martinez',
      contact: '08012345678'
    }
  },
  {
    id: 'ORD-5672',
    customer: 'Sarah Thomas',
    status: 'delivered',
    createdAt: '2025-04-08T14:30:00Z',
    deliveredAt: '2025-04-08T16:15:00Z',
    items: [
      { id: 1, name: 'Organic Fruit Basket', quantity: 1, price: 30662 },
      { id: 2, name: 'Recycled Paper Notebooks', quantity: 2, price: 15331 }
    ],
    total: 45993,
    address: '789 Sustainable Road, Lagos',
    paymentMethod: 'Wallet',
    deliveryType: 'Standard',
    deliveryFee: 1533.1,
    timeSlot: '2:00 PM - 4:00 PM',
    rider: {
      name: 'James Rodriguez',
      contact: '08023456789'
    },
    feedback: {
      rating: 5,
      comment: 'Great service and eco-friendly packaging!'
    }
  },
  {
    id: 'ORD-5670',
    customer: 'Michael Roberts',
    status: 'cancelled',
    createdAt: '2025-04-08T09:15:00Z',
    cancelledAt: '2025-04-08T10:30:00Z',
    items: [
      { id: 1, name: 'Plant-Based Protein Pack', quantity: 1, price: 38327.5 },
      { id: 2, name: 'Organic Coffee Beans', quantity: 1, price: 12264.8 }
    ],
    total: 50592.3,
    address: '101 Green Life Street, Lagos',
    paymentMethod: 'Card',
    cancelReason: 'Customer requested cancellation'
  }
];

const OrdersPage = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500 text-white">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500 text-white">Processing</Badge>;
      case 'delivering':
        return <Badge className="bg-purple-500 text-white">Out for Delivery</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500 text-white">Delivered</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 text-white">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
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
  
  const formatPrice = (price) => {
    return price.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    });
  };
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout userRole="vendor">
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-gray-600">Manage and track all your customer orders</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filter
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-primary hover:bg-primary-hover text-black">
              <Printer className="mr-2 h-4 w-4" />
              Print Labels
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Search orders..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="w-full md:w-48">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="delivering">Out for Delivery</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full md:w-48">
                    <Input 
                      type="date"
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  Showing {filteredOrders.length} of {orders.length} orders
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4 w-full md:w-auto grid grid-cols-3 md:flex md:gap-2">
                  <TabsTrigger value="all" className="whitespace-nowrap">All Orders</TabsTrigger>
                  <TabsTrigger value="today" className="whitespace-nowrap">Today</TabsTrigger>
                  <TabsTrigger value="pending" className="whitespace-nowrap">Pending</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <div key={order.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full ${
                              order.status === 'pending' ? 'bg-amber-100' :
                              order.status === 'processing' ? 'bg-blue-100' :
                              order.status === 'delivered' ? 'bg-green-100' : 
                              order.status === 'cancelled' ? 'bg-red-100' : 'bg-gray-100'
                            }`}>
                              {order.status === 'pending' ? <Clock className="h-5 w-5 text-amber-600" /> :
                               order.status === 'processing' ? <Truck className="h-5 w-5 text-blue-600" /> :
                               order.status === 'delivered' ? <CheckCircle className="h-5 w-5 text-green-600" /> :
                               order.status === 'cancelled' ? <XCircle className="h-5 w-5 text-red-600" /> :
                               <Package className="h-5 w-5 text-gray-600" />}
                            </div>
                            <div className="ml-4">
                              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                                <span className="font-medium">{order.id}</span>
                                <span className="hidden md:inline-block text-gray-300">•</span>
                                <span className="text-sm text-gray-600">{formatDate(order.createdAt)}</span>
                              </div>
                              <div className="mt-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                                {getStatusBadge(order.status)}
                                <span className="text-sm">{order.customer}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:items-end justify-between">
                            <div className="text-lg font-bold mb-1">{formatPrice(order.total)}</div>
                            <div className="text-sm text-gray-600">{order.items.length} items</div>
                          </div>
                          
                          <div className="flex md:items-center gap-2">
                            {order.status === 'pending' && (
                              <>
                                <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                                  Cancel
                                </Button>
                                <Button className="bg-primary hover:bg-primary-hover text-black">
                                  Process
                                </Button>
                              </>
                            )}
                            
                            {order.status === 'processing' && (
                              <>
                                <Button variant="outline" size="sm">
                                  Contact Rider
                                </Button>
                                <Button className="bg-primary hover:bg-primary-hover text-black">
                                  Details
                                </Button>
                              </>
                            )}
                            
                            {(order.status === 'delivered' || order.status === 'cancelled') && (
                              <Button variant="ghost" size="sm" className="ml-auto">
                                <ChevronRight className="h-5 w-5" />
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        {!isMobile && (
                          <div className="mt-3 pt-3 border-t text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-1">
                            <div>
                              <span className="font-medium">Payment:</span> {order.paymentMethod}
                            </div>
                            {order.deliveryType && (
                              <div>
                                <span className="font-medium">Delivery:</span> {order.deliveryType}
                              </div>
                            )}
                            {order.timeSlot && (
                              <div>
                                <span className="font-medium">Time Slot:</span> {order.timeSlot}
                              </div>
                            )}
                            {order.rider && (
                              <div>
                                <span className="font-medium">Rider:</span> {order.rider.name}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <AlertCircle className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <h3 className="font-medium text-lg mb-2">No orders found</h3>
                      <p className="text-gray-500">Try changing your search criteria</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="today">
                  {/* Similar structure as "all" tab */}
                  <div className="text-center py-10">
                    <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <h3 className="font-medium text-lg mb-2">Today's Orders</h3>
                    <p className="text-gray-500">Orders received today will appear here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="pending">
                  {/* Similar structure as "all" tab */}
                  <div className="text-center py-10">
                    <Clock className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <h3 className="font-medium text-lg mb-2">Pending Orders</h3>
                    <p className="text-gray-500">Orders awaiting processing will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
