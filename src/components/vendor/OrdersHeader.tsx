
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Download, Printer } from 'lucide-react';

interface OrdersHeaderProps {
  title: string;
  description: string;
}

const OrdersHeader = ({ title, description }: OrdersHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Advanced Filter
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button className="bg-primary hover:bg-primary-hover text-black">
          <Printer className="mr-2 h-4 w-4" />
          Print Labels
        </Button>
      </div>
    </div>
  );
};

export default OrdersHeader;
