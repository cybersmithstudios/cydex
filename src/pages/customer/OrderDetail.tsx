
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Truck, Package, MapPin, Calendar, Clock, Leaf, Receipt, CreditCard } from 'lucide-react';

// Mock data - in a real app, you would fetch this from an API
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'processing':
        return <Badge className="bg-blue-500">Processing</Badge>;
      case 'in-transit':
        return <Badge className="bg-amber-500">In Transit</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      case 'pending':
        return <Badge className="bg-purple-500">Pending</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      case 'refunded':
        return <Badge className="bg-blue-500">Refunded</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
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
                  {getStatusBadge(order.status)}
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
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium mb-4">Order Tracking</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200"></div>
                {order.trackingSteps.map((step, index) => (
                  <div key={step.id} className="flex mb-6 relative">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center z-10 ${
                      step.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                    }`}>
                      {step.completed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{step.title}</p>
                      {step.time && <p className="text-sm text-gray-500">{step.time}</p>}
                    </div>
                  </div>
                ))}
              </div>
              
              {order.status === 'in-transit' && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Estimated Time of Arrival</p>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-medium">{order.eta}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" /> Delivery Address
                </h3>
                <p className="text-gray-600">{order.deliveryAddress}</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" /> Order Information
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Order Date: {order.orderDate}</p>
                  <p>Last Updated: {order.updatedAt}</p>
                  <p>Items: {order.items}</p>
                </div>
              </div>
            </div>

            {/* Rider Info (if in transit) */}
            {order.status === 'in-transit' && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Delivery Agent</h3>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                    {order.rider.photo ? (
                      <img src={order.rider.photo} alt={order.rider.name} className="h-12 w-12 rounded-full" />
                    ) : (
                      <Truck className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{order.rider.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="flex items-center mr-3">
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {order.rider.rating}
                      </span>
                      <span>{order.rider.phone}</span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Button variant="outline">Contact</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Package className="h-5 w-5 mr-2" /> Order Items
              </h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="divide-y">
                  {order.products
                    .filter(product => product.quantity > 0)
                    .map((product) => (
                      <div key={product.id} className="p-4 flex items-center">
                        <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="h-14 w-14 object-cover" />
                          ) : (
                            <Package className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4 flex-grow">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{product.price}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Receipt className="h-5 w-5 mr-2" /> Order Summary
              </h3>
              <div className="border rounded-lg p-4">
                <div className="space-y-2 border-b pb-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{order.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>{order.deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-{order.discount}</span>
                  </div>
                </div>
                <div className="flex justify-between mt-2 font-bold">
                  <span>Total</span>
                  <span>{order.totalAmount}</span>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span className="text-gray-600">Payment Method: </span>
                  <span className="ml-1">Credit Card</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                  Cancel Order
                </Button>
              )}
              <Button variant="outline">Download Receipt</Button>
              <Button className="bg-primary hover:bg-primary-hover text-black">Reorder</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OrderDetailPage;
