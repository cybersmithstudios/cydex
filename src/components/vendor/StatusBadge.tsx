
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-amber-500 text-white">Pending</Badge>;
    case 'processing':
      return <Badge className="bg-blue-500 text-white">Processing</Badge>;
    case 'delivering':
      return <Badge className="bg-purple-500 text-white">Out for Delivery</Badge>;
    case 'delivered':
      return <Badge className="bg-green-500 text-white">Delivered</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-500 text-white">Cancelled</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

export default StatusBadge;
