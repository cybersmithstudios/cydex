
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car } from 'lucide-react';

interface VehicleInfoProps {
  vehicle: any;
  onUpdateVehicle: () => void;
}

const VehicleInfo = ({ vehicle, onUpdateVehicle }: VehicleInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Car className="h-5 w-5 mr-2" />
          Vehicle Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Type</span>
            <span className="text-sm font-medium">{vehicle.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Model</span>
            <span className="text-sm font-medium">{vehicle.model}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Year</span>
            <span className="text-sm font-medium">{vehicle.year}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Color</span>
            <span className="text-sm font-medium">{vehicle.color}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">License Plate</span>
            <span className="text-sm font-medium">{vehicle.licensePlate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Registration Status</span>
            <Badge className="bg-green-500">Approved</Badge>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={onUpdateVehicle}
        >
          Update Vehicle Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default VehicleInfo;
