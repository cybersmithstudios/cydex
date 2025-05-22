
import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

interface OrderInfoCardsProps {
  deliveryAddress: string;
  orderDate: string;
  updatedAt: string;
  items: number;
}

const OrderInfoCards = ({ deliveryAddress, orderDate, updatedAt, items }: OrderInfoCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-2 flex items-center">
          <MapPin className="h-5 w-5 mr-2" /> Delivery Address
        </h3>
        <p className="text-gray-600">{deliveryAddress}</p>
      </div>
      
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-2 flex items-center">
          <Calendar className="h-5 w-5 mr-2" /> Order Information
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Order Date: {orderDate}</p>
          <p>Last Updated: {updatedAt}</p>
          <p>Items: {items}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoCards;
