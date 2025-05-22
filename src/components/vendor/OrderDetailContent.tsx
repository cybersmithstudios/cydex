
import React from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import StatusBadge from './StatusBadge';
import OrderDetailHeader from './OrderDetailHeader';
import OrderItems from './OrderItems';
import OrderTimeline from './OrderTimeline';
import CustomerInfoCard from './CustomerInfoCard';
import CustomerFeedback from './CustomerFeedback';
import ActionsCard from './ActionsCard';
import DeliveryInformation from './DeliveryInformation';

interface OrderDetailContentProps {
  order: any;
  orderId?: string;
}

const OrderDetailContent = ({ order, orderId }: OrderDetailContentProps) => {
  const navigate = useNavigate();

  if (!order) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Button variant="outline" onClick={() => navigate('/vendor/orders')} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-4">Order not found</h2>
            <p className="text-gray-500 mb-4">The order you're looking for doesn't exist or has been removed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = () => {
    return <StatusBadge status={order.status} />;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const handleUpdateStatus = (newStatus: string) => {
    toast.success(`Order status updated to ${newStatus}`, {
      description: `Order ${order.id} has been updated successfully.`
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <OrderDetailHeader 
        orderId={order.id}
        status={order.status}
        createdAt={order.createdAt}
        onUpdateStatus={handleUpdateStatus}
        order={order}
        getStatusBadge={getStatusBadge}
        formatDate={formatDate}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2 font-medium text-gray-500">Item</th>
                      <th className="pb-2 font-medium text-gray-500">Quantity</th>
                      <th className="pb-2 font-medium text-gray-500 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item: any, index: number) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3">{item.name}</td>
                        <td className="py-3">{item.quantity}</td>
                        <td className="py-3 text-right">{formatPrice(item.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t">
                      <td colSpan={2} className="pt-2 font-medium text-right">Subtotal:</td>
                      <td className="pt-2 text-right">{formatPrice(order.items.reduce((sum: number, item: any) => sum + item.price, 0))}</td>
                    </tr>
                    {order.deliveryFee && (
                      <tr>
                        <td colSpan={2} className="pt-2 font-medium text-right">Delivery Fee:</td>
                        <td className="pt-2 text-right">{formatPrice(order.deliveryFee)}</td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan={2} className="pt-2 font-bold text-right">Total:</td>
                      <td className="pt-2 font-bold text-right">{formatPrice(order.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>

          <DeliveryInformation 
            address={order.address} 
            timeSlot={order.timeSlot} 
            deliveryType={order.deliveryType}
            rider={order.rider}
            deliveredAt={order.deliveredAt}
            formatDate={formatDate}
            status={order.status}
            cancelledAt={order.cancelledAt}
            cancelReason={order.cancelReason}
          />
          
          {order.status === 'delivered' && order.feedback && (
            <CustomerFeedback feedback={order.feedback} />
          )}
        </div>
        
        <div className="space-y-6">
          <CustomerInfoCard 
            customer={order.customer}
            paymentMethod={order.paymentMethod}
          />
          
          <OrderTimeline 
            status={order.status}
            createdAt={order.createdAt}
            deliveredAt={order.deliveredAt}
            cancelledAt={order.cancelledAt}
            formatDate={formatDate}
            cancelReason={order.cancelReason}
          />
          
          <ActionsCard status={order.status} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailContent;
