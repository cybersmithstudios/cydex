
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

interface CustomerInfoCardProps {
  customer: string;
  paymentMethod: string;
}

const CustomerInfoCard = ({ customer, paymentMethod }: CustomerInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Customer Name</h3>
            <p className="font-medium">{customer}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
            <p>{paymentMethod}</p>
          </div>
          
          <Button variant="outline" className="w-full">
            <Phone className="mr-2 h-4 w-4" />
            Contact Customer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfoCard;
