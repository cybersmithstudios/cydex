
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const OrderDetailLoading = () => {
  return (
    <div className="p-4 md:p-6 flex items-center justify-center h-64">
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <p>Loading order details...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailLoading;
