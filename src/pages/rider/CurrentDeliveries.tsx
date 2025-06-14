
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Leaf, Phone, Navigation } from 'lucide-react';
import { useRiderData } from '@/hooks/useRiderData';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const CurrentDeliveriesPage = () => {
  const { user } = useAuth();
  const { loading: riderDataLoading, currentDeliveries, updateDeliveryStatus } = useRiderData();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge className="bg-blue-500 text-xs">Accepted</Badge>;
      case 'picking_up':
        return <Badge className="bg-yellow-500 text-xs">Picking Up</Badge>;
      case 'picked_up':
        return <Badge className="bg-amber-500 text-xs">Picked Up</Badge>;
      case 'delivering':
        return <Badge className="bg-orange-500 text-xs">Delivering</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500 text-xs">Delivered</Badge>;
      default:
        return <Badge className="text-xs">Unknown</Badge>;
    }
  };

  const getNextAction = (status: string) => {
    switch (status) {
      case 'accepted':
        return { label: 'Start Pickup', nextStatus: 'picking_up' };
      case 'picking_up':
        return { label: 'Mark Picked Up', nextStatus: 'picked_up' };
      case 'picked_up':
        return { label: 'Start Delivery', nextStatus: 'delivering' };
      case 'delivering':
        return { label: 'Mark Delivered', nextStatus: 'delivered' };
      default:
        return { label: 'Complete', nextStatus: 'delivered' };
    }
  };

  const handleStatusUpdate = async (deliveryId: string, currentStatus: string) => {
    const nextAction = getNextAction(currentStatus);
    await updateDeliveryStatus(deliveryId, nextAction.nextStatus as any);
  };

  if (riderDataLoading) {
    return (
      <DashboardLayout userRole="RIDER">
        <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="RIDER">
      <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Current Deliveries</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage your active deliveries and track progress
            </p>
          </div>
          <Badge className="text-xs sm:text-sm bg-blue-500">
            {currentDeliveries.length} Active
          </Badge>
        </div>

        {currentDeliveries.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Deliveries</h3>
              <p className="text-gray-500 mb-4">You don't have any deliveries in progress right now.</p>
              <Button 
                onClick={() => window.location.href = '/rider/available'}
                className="bg-primary hover:bg-primary-hover text-black"
              >
                Browse Available Orders
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {currentDeliveries.map((delivery) => {
              const nextAction = getNextAction(delivery.status);
              
              return (
                <Card key={delivery.id} className="border-2 border-primary">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <CardTitle className="text-base sm:text-lg">
                          {delivery.vendor_name} → {delivery.customer_name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Order #{delivery.order_id?.slice(0, 8)}
                        </CardDescription>
                      </div>
                      {getStatusBadge(delivery.status)}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Pickup: {new Date(delivery.estimated_pickup_time).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Delivery: {new Date(delivery.estimated_delivery_time).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>Distance: {Number(delivery.actual_distance || 0).toFixed(1)} km</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Items: </span>
                          <span>{delivery.items_count || 0}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Fee: </span>
                          <span>₦{Number(delivery.delivery_fee || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center text-sm bg-green-50 text-green-700 px-2 py-1 rounded w-fit">
                          <Leaf className="h-4 w-4 mr-1" />
                          <span>{Number(delivery.carbon_saved || 0).toFixed(1)} kg CO₂ saved</span>
                        </div>
                      </div>
                    </div>

                    {delivery.special_instructions && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-sm text-blue-900 mb-1">Special Instructions:</h4>
                        <p className="text-sm text-blue-800">{delivery.special_instructions}</p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        Contact Customer
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Navigation className="h-4 w-4" />
                        Get Directions
                      </Button>
                      
                      <Button
                        onClick={() => handleStatusUpdate(delivery.id, delivery.status)}
                        className="bg-primary hover:bg-primary-hover text-black flex-1 sm:flex-none"
                      >
                        {nextAction.label}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Delivery Tips</CardTitle>
            <CardDescription>Best practices for successful deliveries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-blue-600">1</span>
              </div>
              <div>
                <h4 className="font-medium text-sm">Verify pickup details</h4>
                <p className="text-xs text-gray-500">Always confirm order details with the vendor before pickup.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-green-600">2</span>
              </div>
              <div>
                <h4 className="font-medium text-sm">Handle with care</h4>
                <p className="text-xs text-gray-500">Keep items secure and follow any special handling instructions.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-purple-600">3</span>
              </div>
              <div>
                <h4 className="font-medium text-sm">Communicate proactively</h4>
                <p className="text-xs text-gray-500">Keep customers informed about any delays or issues.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CurrentDeliveriesPage;
