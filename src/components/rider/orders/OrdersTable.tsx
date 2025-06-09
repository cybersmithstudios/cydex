
import React from 'react';
import { Button } from '@/components/ui/button';
import { Package, Leaf } from 'lucide-react';
import { DeliveryData } from '@/hooks/useRiderData';

interface OrdersTableProps {
  orders: DeliveryData[];
  onAcceptOrder: (orderId: string) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onAcceptOrder }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>No orders match your criteria</p>
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Vendor
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Customer
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Distance
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Fee
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Pickup Time
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="text-sm font-medium text-gray-900">{order.vendor_name}</div>
                {Number(order.eco_bonus) > 0 && (
                  <Leaf className="ml-1 h-4 w-4 text-green-500" />
                )}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{order.customer_name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{Number(order.actual_distance || 1.5).toFixed(1)} miles</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-green-600">
                ₦{Number(order.delivery_fee).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </div>
              {Number(order.eco_bonus) > 0 && (
                <div className="text-xs text-green-500">
                  +₦{Number(order.eco_bonus).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})} eco bonus
                </div>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">
                {new Date(order.estimated_pickup_time).toLocaleTimeString()}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <Button
                className="bg-primary hover:bg-primary-hover text-black"
                onClick={() => onAcceptOrder(order.id)}
              >
                Accept Order
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
