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
    <div className="p-2 sm:p-4 md:p-6">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)} 
        size="sm"
        className="mb-3 sm:mb-4 h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"
      >
        <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
        <span className="hidden xs:inline">Back to </span>Orders
      </Button>
      <Card>
        <CardContent className="p-4 sm:p-6 text-center">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{message}</p>
          </div>
          <Button 
            size="sm"
            className="h-8 sm:h-9 px-4 sm:px-6 text-xs sm:text-sm" 
            onClick={() => navigate('/customer/orders')}
          >
            View All Orders
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderNotFound;
