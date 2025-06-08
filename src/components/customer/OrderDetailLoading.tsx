import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const OrderDetailLoading = () => {
  return (
    <div className="p-2 sm:p-4 md:p-6 flex items-center justify-center h-48 sm:h-64">
      <Card className="w-full">
        <CardContent className="p-4 sm:p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600">Loading order details...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailLoading;
