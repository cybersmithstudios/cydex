import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderItemsProps {
  items: OrderItem[];
  total: number;
  deliveryFee?: number;
}

const OrderItems = ({ items, total, deliveryFee }: OrderItemsProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg">Order Items</CardTitle>
        <CardDescription className="text-sm">Items included in this order</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mobile: Stacked Layout */}
        <div className="block sm:hidden space-y-3">
          {items.map((item, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-sm">{item.name}</span>
                <span className="font-semibold text-sm">{formatPrice(item.price)}</span>
              </div>
              <div className="text-xs text-gray-600">
                Quantity: {item.quantity}
              </div>
            </div>
          ))}
          
          <div className="border-t pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>{formatPrice(items.reduce((sum, item) => sum + item.price, 0))}</span>
            </div>
            {deliveryFee && (
              <div className="flex justify-between text-sm">
                <span>Delivery Fee:</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm border-t pt-2">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2 font-medium text-gray-500 text-sm">Item</th>
                <th className="pb-2 font-medium text-gray-500 text-sm">Quantity</th>
                <th className="pb-2 font-medium text-gray-500 text-sm text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-3 text-sm">{item.name}</td>
                  <td className="py-3 text-sm">{item.quantity}</td>
                  <td className="py-3 text-sm text-right">{formatPrice(item.price)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t">
                <td colSpan={2} className="pt-2 font-medium text-right text-sm">Subtotal:</td>
                <td className="pt-2 text-right text-sm">{formatPrice(items.reduce((sum, item) => sum + item.price, 0))}</td>
              </tr>
              {deliveryFee && (
                <tr>
                  <td colSpan={2} className="pt-2 font-medium text-right text-sm">Delivery Fee:</td>
                  <td className="pt-2 text-right text-sm">{formatPrice(deliveryFee)}</td>
                </tr>
              )}
              <tr>
                <td colSpan={2} className="pt-2 font-bold text-right text-sm">Total:</td>
                <td className="pt-2 font-bold text-right text-sm">{formatPrice(total)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItems;
