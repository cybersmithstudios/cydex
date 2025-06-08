import React from 'react';
import { Badge } from '@/components/ui/badge';

/**
 * Returns the appropriate status badge component based on the provided status
 */
export const getOrderStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-500 text-white text-xs sm:text-sm px-2 py-1">Pending</Badge>;
    case 'processing':
      return <Badge className="bg-blue-500 text-white text-xs sm:text-sm px-2 py-1">Processing</Badge>;
    case 'confirmed':
      return <Badge className="bg-purple-500 text-white text-xs sm:text-sm px-2 py-1">Confirmed</Badge>;
    case 'preparing':
      return <Badge className="bg-indigo-500 text-white text-xs sm:text-sm px-2 py-1">Preparing</Badge>;
    case 'ready':
      return <Badge className="bg-cyan-500 text-white text-xs sm:text-sm px-2 py-1">Ready</Badge>;
    case 'out_for_delivery':
      return <Badge className="bg-amber-500 text-white text-xs sm:text-sm px-2 py-1">
        <span className="hidden xs:inline">Out for </span>Delivery
      </Badge>;
    case 'delivered':
      return <Badge className="bg-green-500 text-white text-xs sm:text-sm px-2 py-1">Delivered</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-500 text-white text-xs sm:text-sm px-2 py-1">Cancelled</Badge>;
    case 'refunded':
      return <Badge className="bg-gray-500 text-white text-xs sm:text-sm px-2 py-1">Refunded</Badge>;
    default:
      return <Badge className="bg-gray-400 text-white text-xs sm:text-sm px-2 py-1">Unknown</Badge>;
  }
};

/**
 * Returns the appropriate payment status badge component based on the provided status
 */
export const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-500 text-white text-xs sm:text-sm px-2 py-1">
        <span className="hidden xs:inline">Payment </span>Pending
      </Badge>;
    case 'paid':
      return <Badge className="bg-green-500 text-white text-xs sm:text-sm px-2 py-1">Paid</Badge>;
    case 'failed':
      return <Badge className="bg-red-500 text-white text-xs sm:text-sm px-2 py-1">
        <span className="hidden xs:inline">Payment </span>Failed
      </Badge>;
    case 'refunded':
      return <Badge className="bg-blue-500 text-white text-xs sm:text-sm px-2 py-1">Refunded</Badge>;
    default:
      return <Badge className="bg-gray-400 text-white text-xs sm:text-sm px-2 py-1">Unknown</Badge>;
  }
};
