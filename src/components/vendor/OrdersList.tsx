import React from 'react';
import OrderCard from './OrderCard';
import NoOrdersFound from './NoOrdersFound';

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

interface OrdersListProps {
  orders: Order[];
  type?: 'all' | 'today' | 'pending';
}

const OrdersList = ({ orders, type = 'all' }: OrdersListProps) => {
  if (orders.length === 0) {
    return <NoOrdersFound type={type} />;
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
