import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, Clock, User, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useOrderDetails } from '@/hooks/useOrderDetails';
import OrderDetailLoading from '@/components/customer/OrderDetailLoading';
import OrderNotFound from '@/components/customer/OrderNotFound';
import { useRiderData } from '@/hooks/useRiderData';
import { toast } from 'sonner';

const RiderOrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { order, loading, error } = useOrderDetails(orderId || '');
  const { updateDeliveryStatus } = useRiderData();

  if (loading) return <OrderDetailLoading />;
  if (error || !order) return <OrderNotFound />;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-blue-500';
      case 'ready': return 'bg-yellow-500';
      case 'out_for_delivery': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getNextAction = (): { text: string; action: 'available' | 'accepted' | 'picking_up' | 'picked_up' | 'delivering' | 'delivered' | 'cancelled' } | null => {
    switch (order.status) {
      case 'processing':
        return { text: 'Mark as Ready for Pickup', action: 'picked_up' };
      case 'ready':
        return { text: 'Picked Up - Start Delivery', action: 'delivering' };
      case 'out_for_delivery':
        return { text: 'Mark as Delivered', action: 'delivered' };
      default:
        return null;
    }
  };

  const handleStatusUpdate = async (newStatus: 'available' | 'accepted' | 'picking_up' | 'picked_up' | 'delivering' | 'delivered' | 'cancelled') => {
    try {
      const success = await updateDeliveryStatus(orderId!, newStatus);
      if (success) {
        toast.success(`Order status updated to ${newStatus.replace('_', ' ')}`);
        if (newStatus === 'delivered') {
          navigate('/rider/current');
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update order status');
    }
  };

  const nextAction = getNextAction();
  const canCompleteDelivery = order.status === 'out_for_delivery';

  return (
    <DashboardLayout userRole="RIDER">
      <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/rider/current')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Deliveries</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Order #{order.order_number}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={`${getStatusColor(order.status)} text-white`}>
                  {order.status.replace('_', ' ').toUpperCase()}
                </Badge>
                {order.verification_code && (
                  <Badge variant="outline" className="font-mono">
                    Code: {order.verification_code}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Pickup Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Pickup Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.vendor && (
                <div>
                  <h3 className="font-medium text-lg">{order.vendor.name}</h3>
                  <p className="text-sm text-gray-600">{order.vendor.email}</p>
                  {order.vendor.phone && (
                    <div className="flex items-center space-x-2 mt-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{order.vendor.phone}</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Pickup time: {new Date(order.created_at).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Delivery Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Customer</h3>
                <p className="text-sm text-gray-600">Order for delivery</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Delivery Address:</p>
                <p className="text-sm text-gray-600">
                  {typeof order.delivery_address === 'object' 
                    ? order.delivery_address.address || 'Address not available'
                    : order.delivery_address || 'Address not available'
                  }
                </p>
              </div>

              {order.special_instructions && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Special Instructions:</p>
                  <p className="text-sm text-gray-600">{order.special_instructions}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.order_items?.map((item, index) => (
                  <div key={item.id || index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.product_name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      {item.product_description && (
                        <p className="text-xs text-gray-500 mt-1">{item.product_description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₦{Number(item.total_price).toLocaleString()}</p>
                      <p className="text-sm text-gray-600">₦{Number(item.unit_price).toLocaleString()} each</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount:</span>
                  <span className="text-lg font-bold">₦{Number(order.total_amount).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {nextAction && (
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => handleStatusUpdate(nextAction.action)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-black"
                    size="lg"
                  >
                    {nextAction.text}
                  </Button>
                  
                  {canCompleteDelivery && order.verification_code && (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm font-medium text-green-900 mb-2">Verification Code</p>
                      <p className="text-2xl font-mono font-bold text-green-700">{order.verification_code}</p>
                      <p className="text-sm text-green-600 mt-1">
                        Customer should provide this code to confirm delivery
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {order.status === 'delivered' && (
            <Card className="md:col-span-2">
              <CardContent className="pt-6 text-center">
                <div className="text-green-600 mb-2">
                  <Package className="h-12 w-12 mx-auto mb-2" />
                </div>
                <h3 className="text-lg font-medium text-green-800 mb-2">Delivery Completed!</h3>
                <p className="text-sm text-gray-600">Thank you for completing this delivery.</p>
                <Button
                  onClick={() => navigate('/rider/current')}
                  className="mt-4"
                  variant="outline"
                >
                  Back to Current Deliveries
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RiderOrderDetail;