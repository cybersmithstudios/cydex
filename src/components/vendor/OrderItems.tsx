
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
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
        <CardDescription>Items included in this order</CardDescription>
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
              {items.map((item, index) => (
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
                <td className="pt-2 text-right">{formatPrice(items.reduce((sum, item) => sum + item.price, 0))}</td>
              </tr>
              {deliveryFee && (
                <tr>
                  <td colSpan={2} className="pt-2 font-medium text-right">Delivery Fee:</td>
                  <td className="pt-2 text-right">{formatPrice(deliveryFee)}</td>
                </tr>
              )}
              <tr>
                <td colSpan={2} className="pt-2 font-bold text-right">Total:</td>
                <td className="pt-2 font-bold text-right">{formatPrice(total)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItems;
