import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface OrderInformationProps {
  order: {
    id: string;
    customer: string;
    createdAt: string;
    paymentMethod: string;
    deliveryType: string;
    status?: string;
    [key: string]: any;
  };
}

const OrderInformation = ({ order }: OrderInformationProps) => {
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg">Order Information</CardTitle>
        <CardDescription className="text-sm">Basic information about this order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row justify-between gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Order ID</h3>
              <p className="font-medium text-sm sm:text-base">{order.id}</p>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Customer</h3>
              <p className="font-medium text-sm sm:text-base">{order.customer}</p>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Order Date</h3>
              <div className="flex items-center">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-gray-400" />
                <span className="text-xs sm:text-sm">{new Date(order.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Status</h3>
              <Badge className="bg-amber-500 text-white text-xs">Pending</Badge>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Payment Method</h3>
              <p className="text-sm sm:text-base">{order.paymentMethod}</p>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Delivery Type</h3>
              <p className="text-sm sm:text-base">{order.deliveryType}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderInformation;
