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
      <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate('/vendor/orders')} 
          className="mb-3 sm:mb-4 w-full sm:w-auto text-xs sm:text-sm"
        >
          <ChevronLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Back to Orders
        </Button>
        
        <Card>
          <CardContent className="pt-4 sm:pt-6 text-center">
            <AlertCircle className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Order not found</h2>
            <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4">
              The order you're looking for doesn't exist or has been removed.
            </p>
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
    <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto">
      <OrderDetailHeader 
        orderId={order.id}
        status={order.status}
        createdAt={order.createdAt}
        onUpdateStatus={handleUpdateStatus}
        order={order}
        getStatusBadge={getStatusBadge}
        formatDate={formatDate}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card>
            <CardContent className="pt-3 sm:pt-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Order Items</h3>
              
              {/* Mobile: Stacked Layout */}
              <div className="block sm:hidden space-y-3">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm">{item.name}</span>
                      <span className="font-semibold text-sm">{formatPrice(item.price)}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{formatPrice(order.items.reduce((sum: number, item: any) => sum + item.price, 0))}</span>
                  </div>
                  {order.deliveryFee && (
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee:</span>
                      <span>{formatPrice(order.deliveryFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-sm border-t pt-2">
                    <span>Total:</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>

              {/* Desktop: Table Layout */}
              <div className="hidden sm:block overflow-x-auto">
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
        
        <div className="space-y-4 sm:space-y-6">
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
