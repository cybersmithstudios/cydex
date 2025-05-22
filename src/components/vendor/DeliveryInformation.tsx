
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

interface DeliveryInformationProps {
  address: string;
  timeSlot?: string;
}

const DeliveryInformation = ({ address, timeSlot }: DeliveryInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Information</CardTitle>
        <CardDescription>Where this order will be delivered</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Delivery Address</h3>
            <p className="mt-1">{address}</p>
          </div>
          {timeSlot && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Delivery Time Slot</h3>
              <p className="mt-1">{timeSlot}</p>
            </div>
          )}
          <div className="flex items-center pt-2">
            <Leaf className="h-4 w-4 mr-2 text-green-500" />
            <span className="text-sm text-green-600">Eco-friendly packaging selected</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryInformation;
