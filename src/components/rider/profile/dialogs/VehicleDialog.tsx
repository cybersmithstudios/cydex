
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface VehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: any;
  onUpdate: () => void;
}

const VehicleDialog = ({ open, onOpenChange, vehicle, onUpdate }: VehicleDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Update Vehicle Information</DialogTitle>
          <DialogDescription className="text-sm">
            Update your vehicle details for delivery operations
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 sm:space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle-type" className="text-sm">Vehicle Type</Label>
              <select 
                id="vehicle-type" 
                defaultValue={vehicle.type}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm h-8 sm:h-9"
              >
                <option value="bicycle">Bicycle</option>
                <option value="e-bike">E-Bike</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="car">Car</option>
                <option value="van">Van</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle-year" className="text-sm">Year</Label>
              <Input id="vehicle-year" defaultValue={vehicle.year} className="text-sm h-8 sm:h-9" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vehicle-model" className="text-sm">Model</Label>
            <Input id="vehicle-model" defaultValue={vehicle.model} className="text-sm h-8 sm:h-9" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle-color" className="text-sm">Color</Label>
              <Input id="vehicle-color" defaultValue={vehicle.color} className="text-sm h-8 sm:h-9" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="license-plate" className="text-sm">License Plate</Label>
              <Input id="license-plate" defaultValue={vehicle.licensePlate} className="text-sm h-8 sm:h-9" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vehicle-docs" className="text-sm">Upload Vehicle Documentation</Label>
            <Input id="vehicle-docs" type="file" className="text-sm h-8 sm:h-9" />
            <p className="text-xs text-gray-500">Upload registration documents or vehicle insurance</p>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-xs sm:text-sm h-8 sm:h-9">
            Cancel
          </Button>
          <Button onClick={onUpdate} className="bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9">
            Update Vehicle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDialog;
