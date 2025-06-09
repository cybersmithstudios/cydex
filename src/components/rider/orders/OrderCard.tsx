
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Leaf } from 'lucide-react';
import { DeliveryData } from '@/hooks/useRiderData';

interface OrderCardProps {
  order: DeliveryData;
  onAcceptOrder: (orderId: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onAcceptOrder }) => {
  return (
    <div className="bg-white border rounded-lg p-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <h3 className="font-medium text-sm truncate">{order.vendor_name}</h3>
            <span className="text-gray-300">→</span>
            <span className="text-sm text-gray-600 truncate">{order.customer_name}</span>
          </div>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <span>{order.order_id}</span>
            <span className="mx-2">•</span>
            <span>{order.items_count} items</span>
          </div>
        </div>
        {Number(order.eco_bonus) > 0 && (
          <Leaf className="h-4 w-4 text-green-500 flex-shrink-0" />
        )}
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3 text-xs text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{Number(order.actual_distance || 1.5).toFixed(1)} miles</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{new Date(order.estimated_pickup_time).toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-green-600">
            ₦{Number(order.delivery_fee).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </div>
          {Number(order.eco_bonus) > 0 && (
            <div className="text-xs text-green-500">
              +₦{Number(order.eco_bonus).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})} eco
            </div>
          )}
        </div>
      </div>
      
      <Button
        className="w-full bg-primary hover:bg-primary-hover text-black text-xs h-7"
        onClick={() => onAcceptOrder(order.id)}
      >
        Accept Order
      </Button>
    </div>
  );
};
