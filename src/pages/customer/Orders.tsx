import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Package, Calendar, MapPin, CreditCard, Truck } from 'lucide-react';
import { useCustomerOrders } from '@/hooks/useCustomerOrders';
import { useVendorRatings } from '@/hooks/useVendorRatings';
import { VendorRatingModal } from '@/components/customer/VendorRatingModal';
import { formatDistanceToNow } from 'date-fns';

const OrdersPage = () => {
  const navigate = useNavigate();
  const { orders, loading, error } = useCustomerOrders();
  const { getRatingForVendor } = useVendorRatings();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedOrderForRating, setSelectedOrderForRating] = useState<{
    orderId: string;
    orderNumber: string;
    vendorId: string;
    vendorName: string;
  } | null>(null);

  // Filter orders by status
  const activeOrders = orders.filter(order => 
    ['pending', 'processing', 'confirmed', 'shipped', 'out_for_delivery'].includes(order.status)
  );
  const completedOrders = orders.filter(order => 
    ['delivered', 'completed'].includes(order.status)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'out_for_delivery': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRateVendor = (order: any) => {
    setSelectedOrderForRating({
      orderId: order.id,
      orderNumber: order.order_number,
      vendorId: order.vendor_id,
      vendorName: order.vendor?.name || 'Unknown Vendor'
    });
    setIsRatingModalOpen(true);
  };

  const OrderCard = ({ order, showRatingButton = false }: { order: any; showRatingButton?: boolean }) => {
    const vendorRating = getRatingForVendor(order.vendor_id);
    
    return (
      <Card key={order.id} className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{order.order_number}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}</span>
              </CardDescription>
            </div>
            <Badge className={getStatusColor(order.status)}>
              {order.status.replace('_', ' ')}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{order.vendor?.name || 'Unknown Vendor'}</span>
              {vendorRating.total_ratings > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-600">
                    {vendorRating.average_rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
            <span className="font-bold">₦{order.total_amount.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>
              {order.delivery_address?.street}, {order.delivery_address?.city}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CreditCard className="h-4 w-4" />
            <span>Payment: {order.payment_status}</span>
            <Truck className="h-4 w-4 ml-2" />
            <span>Delivery: {order.delivery_type}</span>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate(`/customer/orders/${order.id}`)}
              className="flex-1"
            >
              View Details
            </Button>
            
            {showRatingButton && order.payment_status === 'paid' && (
              <Button 
                variant="default" 
                size="sm"
                onClick={() => handleRateVendor(order)}
                className="flex items-center gap-1"
              >
                <Star className="h-3 w-3" />
                Rate Vendor
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <DashboardLayout userRole="CUSTOMER">
        <div className="p-6 max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout userRole="CUSTOMER">
        <div className="p-6 max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">Error Loading Orders</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Orders</h1>
            <p className="text-gray-600">Track and manage your orders</p>
          </div>
          <Button onClick={() => navigate('/customer/new-order')}>
            New Order
          </Button>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">
              Active Orders ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed Orders ({completedOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No active orders</h3>
                  <p className="text-gray-600 mb-4">You don't have any active orders at the moment.</p>
                  <Button onClick={() => navigate('/customer/new-order')}>
                    Place Your First Order
                  </Button>
                </CardContent>
              </Card>
            ) : (
              activeOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No completed orders</h3>
                  <p className="text-gray-600">Your completed orders will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              completedOrders.map(order => (
                <OrderCard key={order.id} order={order} showRatingButton={true} />
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Vendor Rating Modal */}
        {selectedOrderForRating && (
          <VendorRatingModal 
            isOpen={isRatingModalOpen}
            onClose={() => {
              setIsRatingModalOpen(false);
              setSelectedOrderForRating(null);
            }}
            vendorId={selectedOrderForRating.vendorId}
            vendorName={selectedOrderForRating.vendorName}
            orderId={selectedOrderForRating.orderId}
            orderNumber={selectedOrderForRating.orderNumber}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
