// Phase 3: Pricing Calculator Component
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, Calculator } from 'lucide-react';
import { calculatePrice, formatNaira, PricingBreakdown, PricingParams } from '@/services/pricingService';
import { geocodeAddress, getDistanceAndTimeInfo, UI_CAMPUS_LOCATION } from '@/services/distanceService';
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
      // Geocode addresses
      const pickupLocation = await geocodeAddress(pickupAddress) || UI_CAMPUS_LOCATION;
      const deliveryLocation = await geocodeAddress(deliveryAddress);
      
      if (!deliveryLocation) {
        throw new Error('Could not geocode delivery address');
      }

      // Get distance and time information
      const distanceInfo = await getDistanceAndTimeInfo(pickupLocation, deliveryLocation);
      
      // Prepare pricing parameters
      const pricingParams: PricingParams = {
        distanceKm: distanceInfo.distanceKm,
        weightKg: weight,
        isLateNight: distanceInfo.isLateNight,
        isPeakHour: distanceInfo.isPeakHour,
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
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Student Status Banner */}
        {studentInfo.isEligible && (
          <Alert className="border-green-200 bg-green-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {studentInfo.hasSubscription 
                ? "🎓 You have an active student subscription! Enjoy unlimited deliveries."
                : "🎓 Student discount available! Get 10% off your delivery or subscribe for unlimited deliveries."
              }
            </AlertDescription>
          </Alert>
        )}

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickup">Pickup Address</Label>
            <Input
              id="pickup"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="Enter pickup address"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="delivery">Delivery Address</Label>
            <Input
              id="delivery"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter delivery address"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Package Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            min="0.1"
            max="20"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="green-fee">Include Green Fee (₦20)</Label>
          <Switch
            id="green-fee"
            checked={includeGreenFee}
            onCheckedChange={setIncludeGreenFee}
          />
        </div>

        <Button 
          onClick={handleCalculate} 
          disabled={isCalculating || !pickupAddress || !deliveryAddress || weight <= 0}
          className="w-full"
        >
          {isCalculating ? 'Calculating...' : 'Calculate Price'}
        </Button>

        {/* Price Breakdown */}
        {priceBreakdown && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">Price Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Base Rate (up to 2km, &lt;0.5kg):</span>
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
                <div className="flex justify-between text-amber-600">
                  <span>Late Night Fee (8PM-6AM):</span>
                  <span>{formatNaira(priceBreakdown.lateNightFee)}</span>
                </div>
              )}
              
              {priceBreakdown.surgeFee > 0 && (
                <div className="flex justify-between text-orange-600">
                  <span>Peak Hour Surge (12PM-2PM):</span>
                  <span>{formatNaira(priceBreakdown.surgeFee)}</span>
                </div>
              )}
              
              {priceBreakdown.studentDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Student Discount (10%):</span>
                  <span>-{formatNaira(priceBreakdown.studentDiscount)}</span>
                </div>
              )}
              
              {priceBreakdown.greenFee > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Green Fee:</span>
                  <span>{formatNaira(priceBreakdown.greenFee)}</span>
                </div>
              )}
              
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-primary">{formatNaira(priceBreakdown.total)}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};