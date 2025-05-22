
import React from 'react';
import { AlertCircle, Calendar, Clock } from 'lucide-react';

interface NoOrdersFoundProps {
  type?: 'all' | 'today' | 'pending';
}

const NoOrdersFound = ({ type = 'all' }: NoOrdersFoundProps) => {
  const content = {
    all: {
      icon: <AlertCircle className="h-10 w-10 text-gray-400 mx-auto mb-2" />,
      title: 'No orders found',
      description: 'Try changing your search criteria'
    },
    today: {
      icon: <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-2" />,
      title: 'Today\'s Orders',
      description: 'Orders received today will appear here'
    },
    pending: {
      icon: <Clock className="h-10 w-10 text-gray-400 mx-auto mb-2" />,
      title: 'Pending Orders',
      description: 'Orders awaiting processing will appear here'
    }
  };

  const { icon, title, description } = content[type];

  return (
    <div className="text-center py-10">
      {icon}
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default NoOrdersFound;
