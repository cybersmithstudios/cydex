
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Package, CheckCircle, XCircle } from 'lucide-react';

interface OrderTimelineProps {
  status: string;
  createdAt: string;
  deliveredAt?: string;
  cancelledAt?: string;
  formatDate: (date: string) => string;
  cancelReason?: string;
}

const OrderTimeline = ({ 
  status, 
  createdAt, 
  deliveredAt, 
  cancelledAt, 
  formatDate,
  cancelReason
}: OrderTimelineProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="bg-blue-100 rounded-full p-1">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-grow bg-gray-200 w-px my-1" />
            </div>
            <div>
              <p className="text-sm font-medium">Order Placed</p>
              <p className="text-xs text-gray-500">{formatDate(createdAt)}</p>
            </div>
          </div>
          
          {(status === 'processing' || status === 'delivered') && (
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="bg-blue-100 rounded-full p-1">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-grow bg-gray-200 w-px my-1" />
              </div>
              <div>
                <p className="text-sm font-medium">Order Processing</p>
                <p className="text-xs text-gray-500">{status === 'processing' ? 'In progress' : 'Completed'}</p>
              </div>
            </div>
          )}
          
          {status === 'delivered' && deliveredAt && (
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="bg-green-100 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Delivered</p>
                <p className="text-xs text-gray-500">{formatDate(deliveredAt)}</p>
              </div>
            </div>
          )}
          
          {status === 'cancelled' && cancelledAt && (
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="bg-red-100 rounded-full p-1">
                  <XCircle className="h-4 w-4 text-red-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Cancelled</p>
                <p className="text-xs text-gray-500">{formatDate(cancelledAt)}</p>
                {cancelReason && <p className="text-xs text-red-500 mt-1">{cancelReason}</p>}
              </div>
            </div>
          )}
          
          {status === 'pending' && (
            <div className="mt-4 p-3 bg-amber-50 rounded-md border border-amber-100">
              <p className="text-sm text-amber-800">This order is awaiting your action.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTimeline;
