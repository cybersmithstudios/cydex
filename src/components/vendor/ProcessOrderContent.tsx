import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import ProcessOrderHeader from './ProcessOrderHeader';
import OrderInformation from './OrderInformation';
import OrderItems from './OrderItems';
import DeliveryInformation from './DeliveryInformation';
import ProcessOrderActions from './ProcessOrderActions';

interface ProcessOrderContentProps {
  order: any;
}

const ProcessOrderContent = ({ order }: ProcessOrderContentProps) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!order) {
    return (
      <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto">
        <Card>
          <CardContent className="pt-4 sm:pt-6 text-center">
            <h2 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Order not found</h2>
            <p className="text-sm sm:text-base text-gray-500 mb-4">
              The order you're trying to process couldn't be found.
            </p>
            <Button 
              onClick={() => navigate('/vendor/orders')}
              className="w-full sm:w-auto text-xs sm:text-sm"
            >
              <ChevronLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Back to Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleConfirmProcess = () => {
    setIsProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Order processed successfully', {
        description: `Order ${order.id} has been processed and is now being prepared.`,
        action: {
          label: 'View',
          onClick: () => navigate(`/vendor/orders/${order.id}`)
        }
      });
      navigate('/vendor/orders');
    }, 1500);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto">
      <ProcessOrderHeader orderId={order.id} />

      <div className="space-y-4 sm:space-y-6">
        <OrderInformation order={order} />
        <OrderItems items={order.items} total={order.total} deliveryFee={order.deliveryFee} />
        <DeliveryInformation address={order.address} timeSlot={order.timeSlot} />
        <ProcessOrderActions 
          order={order}
          isProcessing={isProcessing}
          onProcess={handleConfirmProcess}
        />
      </div>
    </div>
  );
};

export default ProcessOrderContent;
