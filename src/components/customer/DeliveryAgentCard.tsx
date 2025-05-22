
import React from 'react';
import { Button } from '@/components/ui/button';
import { Truck } from 'lucide-react';

interface Rider {
  name: string;
  phone: string;
  rating: number;
  photo: string | null;
}

interface DeliveryAgentCardProps {
  rider: Rider;
}

const DeliveryAgentCard = ({ rider }: DeliveryAgentCardProps) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-3">Delivery Agent</h3>
      <div className="flex items-center">
        <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
          {rider.photo ? (
            <img src={rider.photo} alt={rider.name} className="h-12 w-12 rounded-full" />
          ) : (
            <Truck className="h-6 w-6 text-gray-400" />
          )}
        </div>
        <div className="ml-3">
          <p className="font-medium">{rider.name}</p>
          <div className="flex items-center text-sm text-gray-500">
            <span className="flex items-center mr-3">
              <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {rider.rating}
            </span>
            <span>{rider.phone}</span>
          </div>
        </div>
        <div className="ml-auto">
          <Button variant="outline">Contact</Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAgentCard;
