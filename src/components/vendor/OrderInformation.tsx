
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
      <CardHeader>
        <CardTitle>Order Information</CardTitle>
        <CardDescription>Basic information about this order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Order ID</h3>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Customer</h3>
              <p className="font-medium">{order.customer}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <span>{new Date(order.createdAt).toLocaleString('en-US', {
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
          
          <div className="mt-4 md:mt-0 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <Badge className="bg-amber-500 text-white">Pending</Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
              <p>{order.paymentMethod}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Delivery Type</h3>
              <p>{order.deliveryType}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderInformation;
