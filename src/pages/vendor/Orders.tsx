
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Download, Printer } from 'lucide-react';
import OrderFilters from '@/components/vendor/OrderFilters';
import OrdersList from '@/components/vendor/OrdersList';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

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
  const navigate = useNavigate();
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

  const handleRejectOrder = (orderId) => {
    toast.error('Order rejected', {
      description: `Order ${orderId} has been rejected.`
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
              <OrderFilters 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                totalOrders={orders.length}
                filteredCount={filteredOrders.length}
              />
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4 w-full md:w-auto grid grid-cols-3 md:flex md:gap-2">
                  <TabsTrigger value="all" className="whitespace-nowrap">All Orders</TabsTrigger>
                  <TabsTrigger value="today" className="whitespace-nowrap">Today</TabsTrigger>
                  <TabsTrigger value="pending" className="whitespace-nowrap">Pending</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <OrdersList orders={filteredOrders} type="all" />
                </TabsContent>
                
                <TabsContent value="today">
                  <OrdersList orders={[]} type="today" />
                </TabsContent>
                
                <TabsContent value="pending">
                  <OrdersList orders={[]} type="pending" />
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
