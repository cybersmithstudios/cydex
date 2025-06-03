import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Download, Printer } from 'lucide-react';

interface OrdersHeaderProps {
  title: string;
  description: string;
}

const OrdersHeader = ({ title, description }: OrdersHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
        <p className="text-sm sm:text-base text-gray-600">{description}</p>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
        <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
          <Filter className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Advanced Filter
        </Button>
        <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
          <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Export
        </Button>
        <Button className="bg-primary hover:bg-primary-hover text-black w-full sm:w-auto text-xs sm:text-sm">
          <Printer className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Print Labels
        </Button>
      </div>
    </div>
  );
};

export default OrdersHeader;
