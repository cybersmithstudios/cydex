
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
    <div className="mb-6">
      <Button variant="outline" onClick={() => navigate('/vendor/orders')} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>
      <h1 className="text-2xl font-bold">Process Order #{orderId}</h1>
      <p className="text-gray-600">Review and confirm order processing</p>
    </div>
  );
};

export default ProcessOrderHeader;
