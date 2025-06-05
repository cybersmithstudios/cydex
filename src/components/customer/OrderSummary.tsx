import React from 'react';
import { Receipt, CreditCard } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: string;
  totalAmount: string;
  deliveryFee: string;
  discount: string;
  paymentMethod: string;
}

const OrderSummary = ({ subtotal, totalAmount, deliveryFee, discount, paymentMethod }: OrderSummaryProps) => {
  return (
    <div>
      <h3 className="font-medium mb-3 flex items-center">
        <Receipt className="h-5 w-5 mr-2" /> Order Summary
      </h3>
      <div className="border rounded-lg p-4">
        <div className="space-y-2 border-b pb-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery Fee</span>
            <span>{deliveryFee}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">-{discount}</span>
          </div>
        </div>
        <div className="flex justify-between mt-2 font-bold">
          <span>Total</span>
          <span>{totalAmount}</span>
        </div>
        <div className="mt-3 flex items-center text-sm">
          <CreditCard className="h-4 w-4 mr-2" />
          <span className="text-gray-600">Payment Method: </span>
          <span className="ml-1">{paymentMethod}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
