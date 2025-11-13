
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useVendorOrders, VendorOrder } from '@/hooks/useVendorOrders';
import { useNavigate } from 'react-router-dom';
import OrdersHeader from './OrdersHeader';

const OrdersPageReal = () => {
  const { orders, loading, updateOrderStatus } = useVendorOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      processing: { color: 'bg-blue-100 text-blue-800', icon: Package },
      delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800', icon: AlertCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getOrdersByTab = (tab: string) => {
    switch (tab) {
      case 'today':
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return filteredOrders.filter(order => new Date(order.created_at) >= todayStart);
      case 'pending':
        return filteredOrders.filter(order => order.status === 'pending');
      default:
        return filteredOrders;
    }
  };

  const OrderCard = ({ order }: { order: VendorOrder }) => (
    <div 
      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={() => navigate(`/vendor/orders/${order.id}`)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">#{order.order_number}</span>
            {getStatusBadge(order.status)}
          </div>
          <p className="text-sm text-gray-600">
            Customer: {order.customer?.name || order.customer?.email || 'Customer'}
          </p>
          <p className="text-xs text-gray-500">
            {formatDate(order.created_at)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg">
            {formatCurrency(order.total_amount)}
          </p>
          <p className="text-sm text-gray-500">
            {order.order_items?.length || 0} items
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Payment: <span className="capitalize">{order.payment_status}</span>
        </div>
        <div className="flex gap-2">
          {order.status === 'pending' && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                updateOrderStatus(order.id, 'accepted');
              }}
            >
              Accept
            </Button>
          )}
          {order.status === 'accepted' && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                updateOrderStatus(order.id, 'ready_for_pickup');
              }}
            >
              Ready for Pickup
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const OrdersList = ({ orders, type }: { orders: VendorOrder[], type: string }) => {
    if (orders.length === 0) {
      return (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {type === 'all' ? '' : type} orders found
          </h3>
          <p className="text-gray-500">
            {searchQuery 
              ? 'Try adjusting your search criteria.' 
              : 'Orders will appear here once customers place them.'
            }
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <OrdersHeader 
        title="Orders" 
        description="Manage and track all your customer orders" 
      />
      
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by order number or customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                Showing {filteredOrders.length} of {orders.length} orders
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4 w-full sm:w-auto grid grid-cols-3 sm:flex">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <OrdersList orders={getOrdersByTab('all')} type="all" />
              </TabsContent>
              
              <TabsContent value="today">
                <OrdersList orders={getOrdersByTab('today')} type="today" />
              </TabsContent>
              
              <TabsContent value="pending">
                <OrdersList orders={getOrdersByTab('pending')} type="pending" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrdersPageReal;
