import React from 'react';
import { Package } from 'lucide-react';

interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
  price: string;
  image: string | null;
}

interface OrderItemsListProps {
  products: OrderProduct[];
}

const OrderItemsList = ({ products }: OrderItemsListProps) => {
  return (
    <div>
      <h3 className="font-medium mb-3 flex items-center">
        <Package className="h-5 w-5 mr-2" /> Order Items
      </h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="divide-y">
          {products
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
  );
};

export default OrderItemsList;
