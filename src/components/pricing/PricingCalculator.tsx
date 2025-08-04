// Phase 3: Pricing Calculator Component
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Calculator, MapPin, Package, Clock, Users } from 'lucide-react';
import { calculatePrice, formatNaira, type PricingBreakdown, type PricingParams } from '@/services/pricingService';
import { getDistanceAndTimeInfo, geocodeAddress, UI_CAMPUS_LOCATION, type Location } from '@/services/distanceService';
import { getStudentEligibility } from '@/services/studentVerificationService';
import { useAuth } from '@/contexts/AuthContext';

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
  const [breakdown, setBreakdown] = useState<PricingBreakdown | null>(null);
  const [studentInfo, setStudentInfo] = useState({
    isEligible: false,
    hasSubscription: false,
    eligibleForSubscription: false
  });

  useEffect(() => {
    if (user?.email) {
      getStudentEligibility(user.email, user.id).then(info => {
        setStudentInfo({
          isEligible: info.isEligibleForDiscount,
          hasSubscription: info.hasActiveSubscription,
          eligibleForSubscription: info.eligibleForSubscription
        });
      });
    }
  }, [user]);

  const handleCalculate = async () => {
    if (!pickupAddress || !deliveryAddress || !weight) return;

    setIsCalculating(true);
    try {
      // Geocode addresses
      const pickupLocation = await geocodeAddress(pickupAddress) || UI_CAMPUS_LOCATION;
      const deliveryLocation = await geocodeAddress(deliveryAddress) || UI_CAMPUS_LOCATION;

      // Get distance and time info
      const distanceInfo = await getDistanceAndTimeInfo(pickupLocation, deliveryLocation);

      // Prepare pricing parameters
      const params: PricingParams = {
        distanceKm: distanceInfo.distanceKm,
        weightKg: weight,
        isLateNight: distanceInfo.isLateNight,
        isPeakHour: distanceInfo.isPeakHour,
        isStudentOrder: studentInfo.isEligible,
        hasSubscription: studentInfo.hasSubscription,
        includeGreenFee
      };

      // Calculate price
      const priceBreakdown = await calculatePrice(params);
      setBreakdown(priceBreakdown);
      
      if (onPriceCalculated) {
        onPriceCalculated(priceBreakdown, params);
      }
    } catch (error) {
      console.error('Failed to calculate price:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const isFormValid = pickupAddress && deliveryAddress && weight > 0;

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
        {user && studentInfo.isEligible && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-600" />
                <span className="text-green-700 font-medium">UI Student Account</span>
              </div>
              <div className="flex gap-2">
                {studentInfo.hasSubscription ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Subscription Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-green-600 text-green-700">
                    10% Discount Available
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pickup" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Pickup Address
            </Label>
            <Input
              id="pickup"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="Enter pickup location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Delivery Address
            </Label>
            <Input
              id="delivery"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter delivery location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Package Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              min="0.1"
              max="50"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              placeholder="1.0"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="green-fee" className="text-sm font-medium">
              Support Green Initiative (+₦20)
            </Label>
            <Switch
              id="green-fee"
              checked={includeGreenFee}
              onCheckedChange={setIncludeGreenFee}
            />
          </div>
        </div>

        {/* Calculate Button */}
        <Button 
          onClick={handleCalculate}
          disabled={!isFormValid || isCalculating}
          className="w-full"
        >
          {isCalculating ? 'Calculating...' : 'Calculate Price'}
        </Button>

        {/* Price Breakdown */}
        {breakdown && (
          <div className="space-y-4">
            <Separator />
            <div className="space-y-3">
              <h4 className="font-semibold">Price Breakdown</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base rate (up to 2km, &lt;0.5kg)</span>
                  <span>{formatNaira(breakdown.baseRate)}</span>
                </div>
                
                {breakdown.distanceFee > 0 && (
                  <div className="flex justify-between">
                    <span>Distance fee</span>
                    <span>{formatNaira(breakdown.distanceFee)}</span>
                  </div>
                )}
                
                {breakdown.weightFee > 0 && (
                  <div className="flex justify-between">
                    <span>Weight fee</span>
                    <span>{formatNaira(breakdown.weightFee)}</span>
                  </div>
                )}
                
                {breakdown.lateNightFee > 0 && (
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Late night fee
                    </span>
                    <span>{formatNaira(breakdown.lateNightFee)}</span>
                  </div>
                )}
                
                {breakdown.surgeFee > 0 && (
                  <div className="flex justify-between">
                    <span>Peak hour surge</span>
                    <span>{formatNaira(breakdown.surgeFee)}</span>
                  </div>
                )}
                
                {breakdown.studentDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Student discount (10%)</span>
                    <span>-{formatNaira(breakdown.studentDiscount)}</span>
                  </div>
                )}
                
                {breakdown.greenFee > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Green initiative fee</span>
                    <span>{formatNaira(breakdown.greenFee)}</span>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatNaira(breakdown.total)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};