import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ActiveOrderCard from '@/components/customer/ActiveOrderCard';
import OrderHistoryFilters from '@/components/customer/OrderHistoryFilters';
import OrderHistoryTable from '@/components/customer/OrderHistoryTable';

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
    <DashboardLayout userRole="CUSTOMER">
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
                    <ActiveOrderCard key={order.id} order={order} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="past">
                <OrderHistoryFilters 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  dateFilter={dateFilter}
                  setDateFilter={setDateFilter}
                />
                <OrderHistoryTable orders={filteredPastOrders} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
