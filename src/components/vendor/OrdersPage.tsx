
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import OrdersHeader from './OrdersHeader';
import OrderFilters from './OrderFilters';
import OrderTabs from './OrderTabs';

// Mock order data imported from a data file
import { orders } from '@/data/ordersMockData';

const OrdersPageContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <OrdersHeader 
        title="Orders" 
        description="Manage and track all your customer orders" 
      />
      
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
            <OrderTabs orders={filteredOrders} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrdersPageContent;
