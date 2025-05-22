
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Clock, 
  Truck, 
  MapPin, 
  Leaf, 
  ChevronLeft, 
  Phone, 
  User, 
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

// Mock order data - in a real application, this would come from your database
const orders = [
  {
    id: 'ORD-5678',
    customer: 'Emily Johnson',
    status: 'pending',
    createdAt: '2025-04-09T10:23:00Z',
    items: [
      { id: 1, name: 'Organic Vegetables Mix', quantity: 1, price: 28952.59 },
      { id: 2, name: 'Free-Range Eggs (12pk)', quantity: 1, price: 15331 },
      { id: 3, name: 'Organic Almond Milk', quantity: 1, price: 29296.21 }
    ],
    total: 73579.77,
    address: '123 Green Street, Lagos',
    paymentMethod: 'Wallet',
    deliveryType: 'Express',
    deliveryFee: 3066.2,
    timeSlot: '2:00 PM - 4:00 PM'
  },
  {
    id: 'ORD-5679',
    customer: 'David Wilson',
    status: 'processing',
    createdAt: '2025-04-09T09:45:00Z',
    items: [
      { id: 1, name: 'Reusable Shopping Bag', quantity: 1, price: 7665.5 },
      { id: 2, name: 'Bamboo Toothbrush Set', quantity: 1, price: 12264.8 },
      { id: 3, name: 'Zero-Waste Starter Kit', quantity: 1, price: 45993 }
    ],
    total: 65923.3,
    address: '456 Eco Avenue, Lagos',
    paymentMethod: 'Card',
    deliveryType: 'Standard',
    deliveryFee: 1533.1,
    timeSlot: '10:00 AM - 12:00 PM',
    rider: {
      name: 'Alex Martinez',
      contact: '08012345678'
    }
  },
  {
    id: 'ORD-5672',
    customer: 'Sarah Thomas',
    status: 'delivered',
    createdAt: '2025-04-08T14:30:00Z',
    deliveredAt: '2025-04-08T16:15:00Z',
    items: [
      { id: 1, name: 'Organic Fruit Basket', quantity: 1, price: 30662 },
      { id: 2, name: 'Recycled Paper Notebooks', quantity: 2, price: 15331 }
    ],
    total: 45993,
    address: '789 Sustainable Road, Lagos',
    paymentMethod: 'Wallet',
    deliveryType: 'Standard',
    deliveryFee: 1533.1,
    timeSlot: '2:00 PM - 4:00 PM',
    rider: {
      name: 'James Rodriguez',
      contact: '08023456789'
    },
    feedback: {
      rating: 5,
      comment: 'Great service and eco-friendly packaging!'
    }
  },
  {
    id: 'ORD-5670',
    customer: 'Michael Roberts',
    status: 'cancelled',
    createdAt: '2025-04-08T09:15:00Z',
    cancelledAt: '2025-04-08T10:30:00Z',
    items: [
      { id: 1, name: 'Plant-Based Protein Pack', quantity: 1, price: 38327.5 },
      { id: 2, name: 'Organic Coffee Beans', quantity: 1, price: 12264.8 }
    ],
    total: 50592.3,
    address: '101 Green Life Street, Lagos',
    paymentMethod: 'Card',
    cancelReason: 'Customer requested cancellation'
  }
];

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const order = orders.find(o => o.id === orderId);
  
  if (!order) {
    return (
      <DashboardLayout userRole="vendor">
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
      </DashboardLayout>
    );
  }

  const getStatusIcon = () => {
    switch (order.status) {
      case 'pending':
        return <Clock className="h-6 w-6 text-amber-600" />;
      case 'processing':
        return <Truck className="h-6 w-6 text-blue-600" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-6 w-6 text-red-600" />;
      default:
        return <Package className="h-6 w-6 text-gray-600" />;
    }
  };

  const getStatusBadge = () => {
    switch (order.status) {
      case 'pending':
        return <Badge className="bg-amber-500 text-white">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500 text-white">Processing</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500 text-white">Delivered</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 text-white">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const handleUpdateStatus = (newStatus) => {
    toast.success(`Order status updated to ${newStatus}`, {
      description: `Order ${order.id} has been updated successfully.`
    });
  };

  return (
    <DashboardLayout userRole="vendor">
      <div className="p-6 max-w-4xl mx-auto">
        <Button variant="outline" onClick={() => navigate('/vendor/orders')} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              Order Details: {order.id}
              <div className="ml-3">{getStatusBadge()}</div>
            </h1>
            <p className="text-gray-600">Created on {formatDate(order.createdAt)}</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            {order.status === 'pending' && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => {
                    handleUpdateStatus('cancelled');
                  }}
                >
                  Cancel Order
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary-hover text-black"
                  onClick={() => navigate('/vendor/process-order', { state: { order } })}
                >
                  Process Order
                </Button>
              </div>
            )}
            
            {order.status === 'processing' && (
              <div className="flex gap-2">
                <Button variant="outline">Contact Rider</Button>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => handleUpdateStatus('delivered')}
                >
                  Mark as Delivered
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
                <CardDescription>Products included in this order</CardDescription>
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
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Delivery Address</h3>
                  <div className="flex items-start mt-1">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>{order.address}</span>
                  </div>
                </div>
                
                {order.deliveryType && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Delivery Type</h3>
                    <p>{order.deliveryType}</p>
                  </div>
                )}
                
                {order.timeSlot && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Delivery Time Slot</h3>
                    <p>{order.timeSlot}</p>
                  </div>
                )}
                
                {order.rider && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Rider Information</h3>
                    <div className="flex items-center mt-1">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{order.rider.name}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{order.rider.contact}</span>
                    </div>
                  </div>
                )}
                
                {order.status === 'delivered' && order.deliveredAt && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Delivered At</h3>
                    <div className="flex items-center mt-1">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>{formatDate(order.deliveredAt)}</span>
                    </div>
                  </div>
                )}
                
                {order.status === 'cancelled' && order.cancelledAt && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Cancelled At</h3>
                    <div className="flex items-center mt-1">
                      <XCircle className="h-4 w-4 mr-2 text-red-500" />
                      <span>{formatDate(order.cancelledAt)}</span>
                    </div>
                    {order.cancelReason && (
                      <div className="mt-1 pl-6">
                        <span className="text-gray-600">Reason: {order.cancelReason}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center pt-2">
                  <Leaf className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm text-green-600">Eco-friendly packaging selected</span>
                </div>
              </CardContent>
            </Card>
            
            {order.status === 'delivered' && order.feedback && (
              <Card>
                <CardHeader>
                  <CardTitle>Customer Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < order.feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">{order.feedback.rating} out of 5</span>
                  </div>
                  {order.feedback.comment && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="italic">{order.feedback.comment}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Customer Name</h3>
                    <p className="font-medium">{order.customer}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                    <p>{order.paymentMethod}</p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Customer
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="bg-blue-100 rounded-full p-1">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-grow bg-gray-200 w-px my-1" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Order Placed</p>
                      <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                  
                  {order.status === 'processing' || order.status === 'delivered' ? (
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="bg-blue-100 rounded-full p-1">
                          <Package className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-grow bg-gray-200 w-px my-1" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Order Processing</p>
                        <p className="text-xs text-gray-500">{order.status === 'processing' ? 'In progress' : 'Completed'}</p>
                      </div>
                    </div>
                  ) : null}
                  
                  {order.status === 'delivered' && order.deliveredAt ? (
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="bg-green-100 rounded-full p-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Delivered</p>
                        <p className="text-xs text-gray-500">{formatDate(order.deliveredAt)}</p>
                      </div>
                    </div>
                  ) : null}
                  
                  {order.status === 'cancelled' && order.cancelledAt ? (
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="bg-red-100 rounded-full p-1">
                          <XCircle className="h-4 w-4 text-red-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Cancelled</p>
                        <p className="text-xs text-gray-500">{formatDate(order.cancelledAt)}</p>
                      </div>
                    </div>
                  ) : null}
                  
                  {order.status === 'pending' && (
                    <div className="mt-4 p-3 bg-amber-50 rounded-md border border-amber-100">
                      <p className="text-sm text-amber-800">This order is awaiting your action.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    Print Invoice
                  </Button>
                  {order.status === 'delivered' && (
                    <Button variant="outline" className="w-full">
                      Download Receipt
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderDetailPage;
