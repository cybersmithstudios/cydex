import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Leaf } from 'lucide-react';
import { toast } from 'sonner';

// Import reusable components
import OrderTrackingTimeline from '@/components/customer/OrderTrackingTimeline';
import OrderInfoCards from '@/components/customer/OrderInfoCards';
import DeliveryAgentCard from '@/components/customer/DeliveryAgentCard';
import OrderItemsList from '@/components/customer/OrderItemsList';
import OrderSummary from '@/components/customer/OrderSummary';
import OrderActions from '@/components/customer/OrderActions';

// Import utils
import { getOrderStatusBadge, getPaymentStatusBadge } from '@/utils/StatusUtils';

// Mock data function - in a real app, you would fetch this from an API
const getOrderById = (id) => {
  // This is mock data - in a real app, you would fetch from an API based on the ID
  return {
    id: id,
    vendor: id.includes('1234') ? 'Eco Grocery' : id.includes('1235') ? 'Green Pharmacy' : 'Sustainable Home',
    status: id.includes('1234') ? 'in-transit' : id.includes('1235') ? 'processing' : 'pending',
    paymentStatus: id.includes('1219') ? 'refunded' : 'paid',
    eta: id.includes('1234') ? '15 minutes' : id.includes('1235') ? '40 minutes' : '60 minutes',
    items: id.includes('1234') ? 3 : id.includes('1235') ? 1 : 5,
    carbonSaved: id.includes('1234') ? 0.5 : id.includes('1235') ? 0.3 : 0.7,
    updatedAt: id.includes('1234') ? '10 minutes ago' : id.includes('1235') ? '5 minutes ago' : '2 minutes ago',
    totalAmount: id.includes('1234') ? '₦4,250.00' : id.includes('1235') ? '₦1,850.75' : '₦7,320.50',
    orderDate: id.includes('1234') ? '2023-07-10' : id.includes('1235') ? '2023-07-09' : '2023-07-08',
    deliveryAddress: '123 Sustainable Street, Lagos',
    rider: {
      name: 'John Rider',
      phone: '+234 123 456 7890',
      rating: 4.8,
      photo: null
    },
    trackingSteps: [
      { id: 1, title: 'Order Placed', completed: true, time: '10:00 AM' },
      { id: 2, title: 'Processing', completed: id.includes('1234') || id.includes('1235'), time: '10:15 AM' },
      { id: 3, title: 'Out for Delivery', completed: id.includes('1234'), time: '10:30 AM' },
      { id: 4, title: 'Delivered', completed: false, time: null }
    ],
    products: [
      {
        id: 1,
        name: 'Organic Bananas',
        quantity: 1,
        price: '₦1,200.00',
        image: null
      },
      {
        id: 2,
        name: 'Eco-friendly Detergent',
        quantity: id.includes('1234') ? 2 : 0,
        price: '₦1,500.00',
        image: null
      },
      {
        id: 3,
        name: 'Bamboo Toothbrush',
        quantity: id.includes('1235') ? 1 : 0,
        price: '₦850.75',
        image: null
      },
      {
        id: 4,
        name: 'Reusable Water Bottle',
        quantity: id.includes('1236') ? 2 : 0,
        price: '₦2,500.00',
        image: null
      },
      {
        id: 5,
        name: 'Solar Charger',
        quantity: id.includes('1236') ? 1 : 0,
        price: '₦3,200.00',
        image: null
      }
    ],
    deliveryFee: '₦500.00',
    discount: '₦450.00',
  };
};

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      // In a real app, fetch the order data from your API
      setOrder(getOrderById(orderId));
      setLoading(false);
    }
  }, [orderId]);

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
      <DashboardLayout userRole="customer">
        <div className="p-4 md:p-6 flex items-center justify-center h-64">
          <p>Loading order details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!order) {
    return (
      <DashboardLayout userRole="customer">
        <div className="p-4 md:p-6">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Button>
          <Card>
            <CardContent className="p-6 text-center">
              <p>Order not found. The order may have been deleted or you may not have permission to view it.</p>
              <Button className="mt-4" onClick={() => navigate('/customer/orders')}>
                View All Orders
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="customer">
      <div className="p-2 sm:p-4 md:p-6 max-w-full mx-auto space-y-4 md:space-y-6">
        <div className="flex items-center">
          <Button variant="outline" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold">Order Details</h1>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{order.vendor}</CardTitle>
                <CardDescription className="text-gray-500">Order #{order.id}</CardDescription>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex space-x-2 mb-2">
                  {getOrderStatusBadge(order.status)}
                  {getPaymentStatusBadge(order.paymentStatus)}
                </div>
                <div className="flex items-center text-sm bg-green-50 text-green-700 px-2 py-1 rounded">
                  <Leaf className="h-4 w-4 mr-1" />
                  <span>{order.carbonSaved} kg CO₂ saved</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Timeline */}
            <OrderTrackingTimeline 
              steps={order.trackingSteps} 
              eta={order.eta} 
              status={order.status}
            />

            {/* Order Info */}
            <OrderInfoCards 
              deliveryAddress={order.deliveryAddress}
              orderDate={order.orderDate}
              updatedAt={order.updatedAt}
              items={order.items}
            />

            {/* Rider Info (if in transit) */}
            {order.status === 'in-transit' && (
              <DeliveryAgentCard rider={order.rider} />
            )}

            {/* Order Items */}
            <OrderItemsList products={order.products} />

            {/* Order Summary */}
            <OrderSummary 
              totalAmount={order.totalAmount}
              deliveryFee={order.deliveryFee}
              discount={order.discount}
              paymentMethod="Credit Card" // This should come from the order data in a real app
            />

            {/* Action Buttons */}
            <OrderActions 
              status={order.status}
              onCancelOrder={handleCancelOrder}
              onDownloadReceipt={handleDownloadReceipt}
              onReorder={handleReorder}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OrderDetailPage;
