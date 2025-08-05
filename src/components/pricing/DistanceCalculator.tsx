import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MapPin, Clock, Car } from 'lucide-react';

interface DistanceResult {
  distance_km: number;
  duration_minutes: number;
  origin: string;
  destination: string;
  status: string;
  estimated_delivery_time_minutes: number;
  is_late_night: boolean;
  is_peak_hour: boolean;
  cached: boolean;
}

export const DistanceCalculator: React.FC = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DistanceResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateDistance = async () => {
    if (!pickupAddress || !deliveryAddress) {
      setError('Please enter both pickup and delivery addresses');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/calculate-distance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupAddress,
          deliveryAddress
        })
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to calculate distance');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTimeStatusColor = (isLateNight: boolean, isPeakHour: boolean) => {
    if (isLateNight) return 'text-red-600';
    if (isPeakHour) return 'text-orange-600';
    return 'text-green-600';
  };

  const getTimeStatusText = (isLateNight: boolean, isPeakHour: boolean) => {
    if (isLateNight) return 'Late Night Delivery';
    if (isPeakHour) return 'Peak Hour';
    return 'Normal Hours';
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Distance Calculator
        </CardTitle>
        <p className="text-sm text-gray-600">
          Calculate delivery distance and time using Google Maps
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Pickup Address</label>
          <Input
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            placeholder="e.g., University of Ibadan, Ibadan"
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Delivery Address</label>
          <Input
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="e.g., Bodija Market, Ibadan"
            className="mt-1"
          />
        </div>

        <Button 
          onClick={calculateDistance} 
          disabled={loading || !pickupAddress || !deliveryAddress}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Car className="mr-2 h-4 w-4" />
              Calculate Distance
            </>
          )}
        </Button>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-3 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Distance:</span>
              <span className="font-semibold">{result.distance_km} km</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Travel Time:</span>
              <span className="font-semibold">{result.duration_minutes} min</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estimated Delivery:</span>
              <span className="font-semibold">{result.estimated_delivery_time_minutes} min</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Time Status:</span>
              <span className={`text-sm font-medium ${getTimeStatusColor(result.is_late_night, result.is_peak_hour)}`}>
                {getTimeStatusText(result.is_late_night, result.is_peak_hour)}
              </span>
            </div>

            {result.cached && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Source:</span>
                <span className="text-sm text-blue-600">Cached Result</span>
              </div>
            )}

            <div className="pt-2 border-t border-green-200">
              <div className="text-xs text-gray-600">
                <div><strong>From:</strong> {result.origin}</div>
                <div><strong>To:</strong> {result.destination}</div>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Uses Google Maps Distance Matrix API</p>
          <p>• Calculates actual driving distance and time</p>
          <p>• Considers traffic conditions</p>
          <p>• Results are cached for 24 hours</p>
        </div>
      </CardContent>
    </Card>
  );
}; 