
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Leaf, Clock, MapPin, AlertCircle } from 'lucide-react';
import { DeliveryData } from '@/hooks/useRiderData';

interface OrdersTableProps {
  orders: DeliveryData[];
  onAcceptOrder: (orderId: string) => void;
  loading?: boolean;
  error?: string | null;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ 
  orders, 
  onAcceptOrder, 
  loading = false,
  error = null 
}) => {
  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-500">Loading available orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-3">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Error Loading Orders</h3>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-3">
          <Package className="h-12 w-12 mx-auto text-gray-400" />
          <div>
            <h3 className="font-medium text-gray-900 mb-1">No Available Orders</h3>
            <p className="text-sm text-gray-500">Check back later for new delivery opportunities</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                Order Details
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                Location & Distance
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                Timing
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                Earnings
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                scope="col"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {order.vendor_name}
                        </p>
                        {Number(order.eco_bonus) > 0 && (
                          <Leaf className="h-4 w-4 text-green-500" title="Eco-friendly order" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        To: {order.customer_name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {order.items_count} item{order.items_count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {Number(order.actual_distance || 1.5).toFixed(1)} km
                    </span>
                  </div>
                  {order.special_instructions && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      Special instructions
                    </Badge>
                  )}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-sm text-gray-900">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>
                        {new Date(order.estimated_pickup_time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Est. delivery: {new Date(order.estimated_delivery_time).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">
                      ₦{Number(order.delivery_fee).toLocaleString('en-NG', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </p>
                    {Number(order.eco_bonus) > 0 && (
                      <p className="text-xs text-green-600">
                        +₦{Number(order.eco_bonus).toLocaleString('en-NG', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })} eco bonus
                      </p>
                    )}
                    {Number(order.carbon_saved) > 0 && (
                      <p className="text-xs text-green-500">
                        {Number(order.carbon_saved).toFixed(1)} kg CO₂ saved
                      </p>
                    )}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    onClick={() => onAcceptOrder(order.id)}
                    className="bg-primary hover:bg-primary/90 text-black font-medium"
                    size="sm"
                    aria-label={`Accept delivery order from ${order.vendor_name}`}
                  >
                    Accept Order
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
