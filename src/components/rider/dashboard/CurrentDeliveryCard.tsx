
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Leaf } from 'lucide-react';
import { DeliveryData } from '@/hooks/useRiderData';

interface CurrentDeliveryCardProps {
  currentDeliveries: DeliveryData[];
  onUpdateStatus: (deliveryId: string, status: DeliveryData['status']) => void;
}

export const CurrentDeliveryCard: React.FC<CurrentDeliveryCardProps> = ({
  currentDeliveries,
  onUpdateStatus
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'picking_up':
        return <Badge className="bg-blue-500 text-xs">Picking Up</Badge>;
      case 'picked_up':
        return <Badge className="bg-yellow-500 text-xs">Picked Up</Badge>;
      case 'delivering':
        return <Badge className="bg-amber-500 text-xs">Delivering</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500 text-xs">Delivered</Badge>;
      default:
        return <Badge className="text-xs">Unknown</Badge>;
    }
  };

  if (currentDeliveries.length === 0) {
    return null;
  }

  return (
    <Card className="border-2 border-primary animate-pulse-soft">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg">Current Delivery</CardTitle>
        <CardDescription className="text-sm">Your active delivery in progress</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {currentDeliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="p-1.5 sm:p-2 bg-primary-light rounded-full flex-shrink-0">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center flex-wrap gap-1 sm:gap-0">
                    <h3 className="font-medium text-sm sm:text-base truncate">
                      {delivery.vendor_name} → {delivery.customer_name}
                    </h3>
                    <span className="mx-2 text-gray-300 hidden sm:inline">•</span>
                    <span className="text-xs sm:text-sm text-gray-500">{delivery.order_id}</span>
                  </div>
                  <div className="flex items-center mt-1 flex-wrap gap-2">
                    {getStatusBadge(delivery.status)}
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span>ETA: {new Date(delivery.estimated_delivery_time).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                    <span>{delivery.items_count} items</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span>Fee: ₦{Number(delivery.delivery_fee).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-start sm:items-end justify-between mt-3 sm:mt-0 sm:ml-4">
                <div className="flex items-center text-xs sm:text-sm bg-green-50 text-green-700 px-2 py-1 rounded">
                  <Leaf className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span>{Number(delivery.carbon_saved).toFixed(1)} kg CO₂ saved</span>
                </div>
                <div className="mt-3 sm:mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm h-7 sm:h-8">Contact</Button>
                  <Button 
                    className="bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-7 sm:h-8"
                    onClick={() => {
                      const nextStatus = delivery.status === 'accepted' ? 'picking_up' : 
                                       delivery.status === 'picking_up' ? 'picked_up' :
                                       delivery.status === 'picked_up' ? 'delivering' : 'delivered';
                      onUpdateStatus(delivery.id, nextStatus);
                    }}
                  >
                    {delivery.status === 'accepted' ? 'Start Pickup' :
                     delivery.status === 'picking_up' ? 'Picked Up' :
                     delivery.status === 'picked_up' ? 'Start Delivery' : 'Complete'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
