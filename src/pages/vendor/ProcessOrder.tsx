
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Package, Clock, Leaf, CheckCircle, X, ChevronLeft } from 'lucide-react';

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

  const formatPrice = (price) => {
    return price.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    });
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
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
              <CardDescription>Basic information about this order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Order ID</h3>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Customer</h3>
                    <p className="font-medium">{order.customer}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{new Date(order.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      })}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <Badge className="bg-amber-500 text-white">Pending</Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                    <p>{order.paymentMethod}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Delivery Type</h3>
                    <p>{order.deliveryType}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>Items included in this order</CardDescription>
            </CardHeader>
            <CardContent>
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
                    {order.items.map((item, index) => (
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
                      <td className="pt-2 text-right">{formatPrice(order.items.reduce((sum, item) => sum + item.price, 0))}</td>
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

          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
              <CardDescription>Where this order will be delivered</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Delivery Address</h3>
                  <p className="mt-1">{order.address}</p>
                </div>
                {order.timeSlot && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Delivery Time Slot</h3>
                    <p className="mt-1">{order.timeSlot}</p>
                  </div>
                )}
                <div className="flex items-center pt-2">
                  <Leaf className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm text-green-600">Eco-friendly packaging selected</span>
                </div>
              </div>
            </CardContent>
          </Card>

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
