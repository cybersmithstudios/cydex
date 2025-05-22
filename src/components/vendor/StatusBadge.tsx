
import React from 'react';
import { getOrderStatusBadge } from '@/utils/StatusUtils';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return getOrderStatusBadge(status);
};

export default StatusBadge;
