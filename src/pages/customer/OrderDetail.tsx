import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';

// Import custom hooks and components
import { useOrderDetails } from '@/hooks/useOrderDetails';
import OrderDetailHeader from '@/components/customer/OrderDetailHeader';
import OrderDetailsContent from '@/components/customer/OrderDetailsContent';
import OrderNotFound from '@/components/customer/OrderNotFound';
import OrderDetailLoading from '@/components/customer/OrderDetailLoading';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { order, loading, error } = useOrderDetails(orderId);

  const handleCancelOrder = () => {
    toast.success('Your order has been cancelled successfully');
    // In a real app, you would make an API call to cancel the order
  };

  const handleDownloadReceipt = () => {
    toast.success('Receipt downloaded successfully');
    // In a real app, you would generate and download a receipt
  };

  const handleReorder = () => {
    toast.success('Items added to cart');
    navigate('/customer/new-order');
    // In a real app, you would add the items to the cart
  };

  if (loading) {
    return (
      <DashboardLayout userRole="CUSTOMER">
        <OrderDetailLoading />
      </DashboardLayout>
    );
  }

  if (error || !order) {
    return (
      <DashboardLayout userRole="CUSTOMER">
        <OrderNotFound message={error || undefined} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="p-2 sm:p-4 md:p-6 max-w-full mx-auto space-y-4 md:space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <OrderDetailHeader 
              id={order.id}
              vendor={order.vendor}
              status={order.status}
              paymentStatus={order.paymentStatus}
              carbonSaved={order.carbonSaved}
            />
          </CardHeader>
          
          <OrderDetailsContent 
            order={order}
            onCancelOrder={handleCancelOrder}
            onDownloadReceipt={handleDownloadReceipt}
            onReorder={handleReorder}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OrderDetailPage;
