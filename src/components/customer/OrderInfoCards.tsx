
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      <div className="border rounded-lg p-3 sm:p-4">
        <h3 className="font-medium mb-2 flex items-center text-sm sm:text-base">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" /> 
          Delivery Address
        </h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{deliveryAddress}</p>
      </div>
      
      <div className="border rounded-lg p-3 sm:p-4">
        <h3 className="font-medium mb-2 flex items-center text-sm sm:text-base">
          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" /> 
          Order Information
        </h3>
        <div className="text-xs sm:text-sm text-gray-600 space-y-1">
          <p className="flex justify-between">
            <span>Order Date:</span>
            <span className="font-medium">{orderDate}</span>
          </p>
          <p className="flex justify-between">
            <span>Last Updated:</span>
            <span className="font-medium">{updatedAt}</span>
          </p>
          <p className="flex justify-between">
            <span>Items:</span>
            <span className="font-medium">{items}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoCards;
