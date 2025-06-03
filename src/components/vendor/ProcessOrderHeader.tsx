import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface ProcessOrderHeaderProps {
  orderId: string;
}

const ProcessOrderHeader = ({ orderId }: ProcessOrderHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-4 sm:mb-6">
      <Button 
        variant="outline" 
        onClick={() => navigate('/vendor/orders')} 
        className="mb-3 sm:mb-4 w-full sm:w-auto text-xs sm:text-sm"
      >
        <ChevronLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
        Back to Orders
      </Button>
      <h1 className="text-xl sm:text-2xl font-bold">Process Order #{orderId}</h1>
      <p className="text-sm sm:text-base text-gray-600">Review and confirm order processing</p>
    </div>
  );
};

export default ProcessOrderHeader;
