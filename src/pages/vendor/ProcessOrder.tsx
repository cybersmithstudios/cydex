
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle, X, ChevronLeft } from 'lucide-react';
import OrderInformation from '@/components/vendor/OrderInformation';
import OrderItems from '@/components/vendor/OrderItems';
import DeliveryInformation from '@/components/vendor/DeliveryInformation';

const ProcessOrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!order) {
    return (
      <DashboardLayout userRole="vendor">
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
      </DashboardLayout>
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
    <DashboardLayout userRole="vendor">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/vendor/orders')} className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
          <h1 className="text-2xl font-bold">Process Order #{order.id}</h1>
          <p className="text-gray-600">Review and confirm order processing</p>
        </div>

        <div className="space-y-6">
          <OrderInformation order={order} />
          <OrderItems items={order.items} total={order.total} deliveryFee={order.deliveryFee} />
          <DeliveryInformation address={order.address} timeSlot={order.timeSlot} />

          <div className="flex flex-col md:flex-row gap-4 justify-end">
            <Button 
              variant="outline" 
              className="border-red-300 text-red-600 hover:bg-red-50"
              onClick={() => {
                navigate('/vendor/orders');
                toast.error('Order rejected', {
                  description: `Order ${order.id} has been rejected.`
                });
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Reject Order
            </Button>
            
            <Button 
              className="bg-primary hover:bg-primary-hover text-black" 
              onClick={handleConfirmProcess}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="animate-pulse">Processing...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Confirm Processing
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProcessOrderPage;
