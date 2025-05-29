
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DeliveryPerformanceProps {
  completedDeliveries: number;
  onTimeRate: number;
  cancelledOrders: number;
  averageDeliveryTime: number;
  customerRating: number;
}

const DeliveryPerformance = ({
  completedDeliveries,
  onTimeRate,
  cancelledOrders,
  averageDeliveryTime,
  customerRating
}: DeliveryPerformanceProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Performance</CardTitle>
        <CardDescription>Your delivery metrics this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Completed Deliveries</p>
            <p className="font-bold">{completedDeliveries}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">On-Time Rate</p>
            <p className="font-bold">{onTimeRate}%</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Cancelled Orders</p>
            <p className="font-bold">{cancelledOrders}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Average Delivery Time</p>
            <p className="font-bold">{averageDeliveryTime} mins</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Customer Rating</p>
            <div className="flex items-center">
              <p className="font-bold mr-1">{customerRating}</p>
              <div className="flex">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={star <= 5 ? "gold" : "none"} stroke="gold" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button variant="outline" className="w-full">
            View Detailed Performance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryPerformance;
