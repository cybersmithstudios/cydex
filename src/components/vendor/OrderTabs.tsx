
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrdersList from './OrdersList';

// Use a consistent Order type that matches what's used in OrdersList
interface Order {
  id: string;
  customer: string;
  status: string;
  createdAt: string;
  items: Array<any>;
  total: number;
  paymentMethod: string;
  deliveryType?: string;
  timeSlot?: string;
  rider?: {
    name: string;
    contact: string;
  };
  [key: string]: any;
}

interface OrderTabsProps {
  orders: Order[];
}

const OrderTabs = ({ orders }: OrderTabsProps) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-4 w-full md:w-auto grid grid-cols-3 md:flex md:gap-2">
        <TabsTrigger value="all" className="whitespace-nowrap">All Orders</TabsTrigger>
        <TabsTrigger value="today" className="whitespace-nowrap">Today</TabsTrigger>
        <TabsTrigger value="pending" className="whitespace-nowrap">Pending</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <OrdersList orders={orders} type="all" />
      </TabsContent>
      
      <TabsContent value="today">
        <OrdersList orders={[]} type="today" />
      </TabsContent>
      
      <TabsContent value="pending">
        <OrdersList orders={[]} type="pending" />
      </TabsContent>
    </Tabs>
  );
};

export default OrderTabs;
