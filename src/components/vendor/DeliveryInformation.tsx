
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Truck, User, Phone, CheckCircle, XCircle, Leaf } from 'lucide-react';

interface RiderInfo {
  name: string;
  contact: string;
}

interface DeliveryInformationProps {
  address: string;
  timeSlot?: string;
  deliveryType?: string;
  rider?: RiderInfo;
  status?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  formatDate?: (date: string) => string;
}

const DeliveryInformation = ({ 
  address, 
  timeSlot, 
  deliveryType,
  rider,
  status,
  deliveredAt,
  cancelledAt,
  cancelReason,
  formatDate
}: DeliveryInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Information</CardTitle>
        {deliveryType && <CardDescription>Type: {deliveryType}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Delivery Address</h3>
          <div className="flex items-start mt-1">
            <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
            <span>{address}</span>
          </div>
        </div>
        
        {timeSlot && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Delivery Time Slot</h3>
            <p>{timeSlot}</p>
          </div>
        )}
        
        {rider && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Rider Information</h3>
            <div className="flex items-center mt-1">
              <User className="h-4 w-4 mr-2 text-gray-400" />
              <span>{rider.name}</span>
            </div>
            <div className="flex items-center mt-1">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              <span>{rider.contact}</span>
            </div>
          </div>
        )}
        
        {status === 'delivered' && deliveredAt && formatDate && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Delivered At</h3>
            <div className="flex items-center mt-1">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              <span>{formatDate(deliveredAt)}</span>
            </div>
          </div>
        )}
        
        {status === 'cancelled' && cancelledAt && formatDate && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Cancelled At</h3>
            <div className="flex items-center mt-1">
              <XCircle className="h-4 w-4 mr-2 text-red-500" />
              <span>{formatDate(cancelledAt)}</span>
            </div>
            {cancelReason && (
              <div className="mt-1 pl-6">
                <span className="text-gray-600">Reason: {cancelReason}</span>
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center pt-2">
          <Leaf className="h-4 w-4 mr-2 text-green-500" />
          <span className="text-sm text-green-600">Eco-friendly packaging selected</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryInformation;
