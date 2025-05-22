
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
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-medium mb-4">Order not found</h2>
            <p className="text-gray-500 mb-4">The order you're trying to process couldn't be found.</p>
            <Button onClick={() => navigate('/vendor/orders')}>
              <ChevronLeft className="mr-2 h-4 w-4" />
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
    <div className="p-6 max-w-4xl mx-auto">
      <ProcessOrderHeader orderId={order.id} />

      <div className="space-y-6">
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
