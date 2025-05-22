
import React from 'react';
import { Badge } from '@/components/ui/badge';

/**
 * Returns the appropriate status badge component based on the provided status
 */
export const getOrderStatusBadge = (status: string) => {
  switch (status) {
    case 'processing':
      return <Badge className="bg-blue-500">Processing</Badge>;
    case 'in-transit':
      return <Badge className="bg-amber-500">In Transit</Badge>;
    case 'delivered':
      return <Badge className="bg-green-500">Delivered</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-500">Cancelled</Badge>;
    case 'pending':
      return <Badge className="bg-purple-500">Pending</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

/**
 * Returns the appropriate payment status badge component based on the provided status
 */
export const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case 'paid':
      return <Badge className="bg-green-500">Paid</Badge>;
    case 'pending':
      return <Badge className="bg-amber-500">Pending</Badge>;
    case 'refunded':
      return <Badge className="bg-blue-500">Refunded</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};
