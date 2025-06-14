
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
  if (!vehicle) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center">
          <Car className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Vehicle Info
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between">
            <span className="text-xs sm:text-sm text-gray-500">Type</span>
            <span className="text-xs sm:text-sm font-medium capitalize">{vehicle.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs sm:text-sm text-gray-500">Model</span>
            <span className="text-xs sm:text-sm font-medium">{vehicle.model}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs sm:text-sm text-gray-500">Year</span>
            <span className="text-xs sm:text-sm font-medium">{vehicle.year}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs sm:text-sm text-gray-500">Color</span>
            <span className="text-xs sm:text-sm font-medium">{vehicle.color}</span>
          </div>
          {vehicle.licensePlate !== 'N/A' && (
            <div className="flex justify-between">
              <span className="text-xs sm:text-sm text-gray-500">License</span>
              <span className="text-xs sm:text-sm font-medium">{vehicle.licensePlate}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-xs sm:text-sm text-gray-500">Status</span>
            <Badge className="bg-green-500 text-xs">Approved</Badge>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-3 sm:mt-4 text-xs sm:text-sm h-8 sm:h-9"
          onClick={onUpdateVehicle}
        >
          Update Vehicle
        </Button>
      </CardContent>
    </Card>
  );
};

export default VehicleInfo;
