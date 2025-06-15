
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { MapPin, Save } from 'lucide-react';

interface DeliveryPreferences {
  maxDistance: number;
  preferredZones: string[];
  availableDays: string[];
}

interface DeliveryPreferencesFormProps {
  preferences: DeliveryPreferences;
  editing: boolean;
  onDistanceChange: (value: number[]) => void;
  onSave: () => Promise<void>;
}

const DeliveryPreferencesForm = ({ preferences, editing, onDistanceChange, onSave }: DeliveryPreferencesFormProps) => {
  const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Delivery Preferences
        </CardTitle>
        <CardDescription>Configure your delivery operation settings</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Maximum Delivery Distance: {preferences.maxDistance} km</Label>
            <Slider
              value={[preferences.maxDistance]}
              onValueChange={onDistanceChange}
              max={50}
              min={5}
              step={5}
              className="w-full"
              disabled={!editing}
            />
          </div>

          <div className="space-y-3">
            <Label>Preferred Delivery Zones</Label>
            <Input 
              placeholder="No preferred zones set"
              disabled
              className="bg-gray-50"
              value=""
            />
            <p className="text-xs text-gray-500">Preferred zones will be configured by administrators based on demand</p>
          </div>

          <div className="space-y-3">
            <Label>Available Days</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableDays.map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={day}
                    checked={preferences.availableDays.includes(day)}
                    disabled={true}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={day} className="text-sm">{day.slice(0, 3)}</Label>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">Available days are currently fixed. Contact support to modify.</p>
          </div>
        </div>

        {editing && (
          <div className="mt-6 flex justify-end">
            <Button onClick={onSave} className="bg-primary hover:bg-primary-hover text-black">
              <Save className="h-4 w-4 mr-2" />
              Save Delivery Preferences
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryPreferencesForm;
