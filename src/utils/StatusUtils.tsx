import React from 'react';
import { Badge } from '@/components/ui/badge';

/**
 * Returns the appropriate status badge component based on the provided status
 */
export const getOrderStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
    case 'processing':
      return <Badge className="bg-blue-500 text-white">Processing</Badge>;
    case 'confirmed':
      return <Badge className="bg-purple-500 text-white">Confirmed</Badge>;
    case 'preparing':
      return <Badge className="bg-indigo-500 text-white">Preparing</Badge>;
    case 'ready':
      return <Badge className="bg-cyan-500 text-white">Ready</Badge>;
    case 'out_for_delivery':
      return <Badge className="bg-amber-500 text-white">Out for Delivery</Badge>;
    case 'delivered':
      return <Badge className="bg-green-500 text-white">Delivered</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-500 text-white">Cancelled</Badge>;
    case 'refunded':
      return <Badge className="bg-gray-500 text-white">Refunded</Badge>;
    default:
      return <Badge className="bg-gray-400 text-white">Unknown</Badge>;
  }
};

/**
 * Returns the appropriate payment status badge component based on the provided status
 */
export const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-500 text-white">Payment Pending</Badge>;
    case 'paid':
      return <Badge className="bg-green-500 text-white">Paid</Badge>;
    case 'failed':
      return <Badge className="bg-red-500 text-white">Payment Failed</Badge>;
    case 'refunded':
      return <Badge className="bg-blue-500 text-white">Refunded</Badge>;
    default:
      return <Badge className="bg-gray-400 text-white">Unknown</Badge>;
  }
};
