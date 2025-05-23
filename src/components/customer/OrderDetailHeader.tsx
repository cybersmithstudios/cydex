
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Leaf } from 'lucide-react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { getOrderStatusBadge, getPaymentStatusBadge } from '@/utils/StatusUtils';
import { useNavigate } from 'react-router-dom';

interface OrderDetailHeaderProps {
  id: string;
  vendor: string;
  status: string;
  paymentStatus: string;
  carbonSaved: number;
}

const OrderDetailHeader = ({ id, vendor, status, paymentStatus, carbonSaved }: OrderDetailHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center">
        <Button variant="outline" onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Order Details</h1>
      </div>

      <div className="flex justify-between items-start mt-4">
        <div>
          <CardTitle className="text-xl">{vendor}</CardTitle>
          <CardDescription className="text-gray-500">Order #{id}</CardDescription>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex space-x-2 mb-2">
            {getOrderStatusBadge(status)}
            {getPaymentStatusBadge(paymentStatus)}
          </div>
          <div className="flex items-center text-sm bg-green-50 text-green-700 px-2 py-1 rounded">
            <Leaf className="h-4 w-4 mr-1" />
            <span>{carbonSaved} kg CO₂ saved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailHeader;
