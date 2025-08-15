// Phase 3: Pricing Calculator Component
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, Calculator } from 'lucide-react';
import { calculatePrice, formatNaira, PricingBreakdown, PricingParams } from '@/services/pricingService';
import { DistanceService } from '@/services/distanceService';
import { getStudentEligibility } from '@/services/studentVerificationService';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PricingCalculatorProps {
  onPriceCalculated?: (breakdown: PricingBreakdown, params: PricingParams) => void;
  initialPickup?: string;
  initialDelivery?: string;
  initialWeight?: number;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  onPriceCalculated,
  initialPickup = '',
  initialDelivery = '',
  initialWeight = 1
}) => {
  const { user } = useAuth();
  const [pickupAddress, setPickupAddress] = useState(initialPickup);
  const [deliveryAddress, setDeliveryAddress] = useState(initialDelivery);
  const [weight, setWeight] = useState(initialWeight);
  const [includeGreenFee, setIncludeGreenFee] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [priceBreakdown, setPriceBreakdown] = useState<PricingBreakdown | null>(null);
  const [studentInfo, setStudentInfo] = useState({
    isEligible: false,
    hasSubscription: false,
    eligibleForSubscription: false
  });

  useEffect(() => {
    const loadStudentInfo = async () => {
      if (user?.email) {
        const info = await getStudentEligibility(user.email, user.id);
        setStudentInfo({
          isEligible: info.isEligibleForDiscount,
          hasSubscription: info.hasActiveSubscription,
          eligibleForSubscription: info.eligibleForSubscription
        });
      }
    };
    
    loadStudentInfo();
  }, [user]);

  const handleCalculate = async () => {
    if (!pickupAddress || !deliveryAddress || weight <= 0) {
      return;
    }

    setIsCalculating(true);
    try {
      // Use the new DistanceService
      const distanceService = new DistanceService();
      
      // Calculate distance using Google Maps API
      const distanceResult = await distanceService.calculateDistance(pickupAddress, deliveryAddress);
      
      if (distanceResult.status !== 'OK') {
        throw new Error('Could not calculate distance');
      }

      // Prepare pricing parameters
      const pricingParams: PricingParams = {
        distanceKm: distanceResult.distance_km,
        weightKg: weight,
        isLateNight: distanceService.isLateNight(),
        isPeakHour: distanceService.isPeakHour(),
        isStudentOrder: studentInfo.isEligible,
        hasSubscription: studentInfo.hasSubscription,
        includeGreenFee
      };

      // Calculate price
      const breakdown = await calculatePrice(pricingParams);
      setPriceBreakdown(breakdown);
      
      // Call callback if provided
      onPriceCalculated?.(breakdown, pricingParams);
    } catch (error) {
      console.error('Failed to calculate price:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Delivery Price Calculator
        </CardTitle>
        <p className="text-sm text-gray-600">
          Calculate delivery cost based on distance, weight, and time
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pickup">Pickup Address</Label>
            <Input
              id="pickup"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="e.g., University of Ibadan"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="delivery">Delivery Address</Label>
            <Input
              id="delivery"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="e.g., Bodija Market"
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              min="0.1"
              max="10"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="green-fee"
              checked={includeGreenFee}
              onCheckedChange={setIncludeGreenFee}
            />
            <Label htmlFor="green-fee">Include Green Fee (₦20)</Label>
          </div>
        </div>

        {studentInfo.isEligible && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              UI Student discount applied (10% off)
              {studentInfo.hasSubscription && ' + Subscription discount'}
            </AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={handleCalculate} 
          disabled={isCalculating || !pickupAddress || !deliveryAddress || weight <= 0}
          className="w-full"
        >
          {isCalculating ? 'Calculating...' : 'Calculate Price'}
        </Button>

        {priceBreakdown && (
          <div className="space-y-3 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Price:</span>
              <span className="text-xl font-bold text-green-700">
                {formatNaira(priceBreakdown.total)}
              </span>
            </div>
            
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Base Rate:</span>
                <span>{formatNaira(priceBreakdown.baseRate)}</span>
              </div>
              {priceBreakdown.distanceFee > 0 && (
                <div className="flex justify-between">
                  <span>Distance Fee:</span>
                  <span>{formatNaira(priceBreakdown.distanceFee)}</span>
                </div>
              )}
              {priceBreakdown.weightFee > 0 && (
                <div className="flex justify-between">
                  <span>Weight Fee:</span>
                  <span>{formatNaira(priceBreakdown.weightFee)}</span>
                </div>
              )}
              {priceBreakdown.lateNightFee > 0 && (
                <div className="flex justify-between">
                  <span>Late Night Fee:</span>
                  <span>{formatNaira(priceBreakdown.lateNightFee)}</span>
                </div>
              )}
              {priceBreakdown.surgeFee > 0 && (
                <div className="flex justify-between">
                  <span>Peak Hour Fee:</span>
                  <span>{formatNaira(priceBreakdown.surgeFee)}</span>
                </div>
              )}
              {priceBreakdown.studentDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Student Discount:</span>
                  <span>-{formatNaira(priceBreakdown.studentDiscount)}</span>
                </div>
              )}
              {priceBreakdown.greenFee > 0 && (
                <div className="flex justify-between">
                  <span>Green Fee:</span>
                  <span>{formatNaira(priceBreakdown.greenFee)}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};