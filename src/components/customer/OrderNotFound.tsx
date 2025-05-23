
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface OrderNotFoundProps {
  message?: string;
}

const OrderNotFound = ({ message = "Order not found. The order may have been deleted or you may not have permission to view it." }: OrderNotFoundProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 md:p-6">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
      </Button>
      <Card>
        <CardContent className="p-6 text-center">
          <p>{message}</p>
          <Button className="mt-4" onClick={() => navigate('/customer/orders')}>
            View All Orders
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderNotFound;
