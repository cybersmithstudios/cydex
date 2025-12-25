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
    <div className="border rounded-lg p-3 sm:p-4">
      <h3 className="font-medium mb-3 text-sm sm:text-base">Delivery Agent</h3>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 sm:h-12 sm:w-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
          {rider.photo ? (
            <img src={rider.photo} alt={rider.name} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover" />
          ) : (
            <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm sm:text-base truncate">{rider.name}</p>
          <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {rider.rating}
            </span>
            <span className="truncate">{rider.phone}</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"
          >
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAgentCard;
