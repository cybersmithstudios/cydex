
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, Bike } from 'lucide-react';

interface VehicleInfoProps {
  vehicle: any;
  onUpdateVehicle: () => void;
}

const VehicleInfo = ({ vehicle, onUpdateVehicle }: VehicleInfoProps) => {
  if (!vehicle) return null;

  const getVehicleIcon = () => {
    if (vehicle.type === 'walking' || vehicle.type === 'bicycle') {
      return <Bike className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />;
    }
    return <Car className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />;
  };

  const getVehicleDisplayName = () => {
    switch (vehicle.type) {
      case 'walking':
        return 'Walking';
      case 'bicycle':
        return 'Bicycle';
      case 'motorcycle':
        return 'Motorcycle';
      case 'car':
        return 'Car';
      default:
        return vehicle.type;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center">
          {getVehicleIcon()}
          Vehicle Info
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between">
            <span className="text-xs sm:text-sm text-gray-500">Type</span>
            <span className="text-xs sm:text-sm font-medium capitalize">{getVehicleDisplayName()}</span>
          </div>
          
          {vehicle.type !== 'walking' && (
            <>
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm text-gray-500">Model</span>
                <span className="text-xs sm:text-sm font-medium">
                  {vehicle.type === 'bicycle' ? 'Eco-friendly Bike' : vehicle.model}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm text-gray-500">Year</span>
                <span className="text-xs sm:text-sm font-medium">{vehicle.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm text-gray-500">Color</span>
                <span className="text-xs sm:text-sm font-medium">{vehicle.color}</span>
              </div>
              {vehicle.licensePlate !== 'N/A' && vehicle.type !== 'bicycle' && (
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-gray-500">License</span>
                  <span className="text-xs sm:text-sm font-medium">{vehicle.licensePlate}</span>
                </div>
              )}
            </>
          )}
          
          <div className="flex justify-between">
            <span className="text-xs sm:text-sm text-gray-500">Status</span>
            <Badge className="bg-yellow-500 text-xs">Pending Verification</Badge>
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
