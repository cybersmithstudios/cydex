// Simplified Pricing Calculator - Flat Rate Implementation
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertCircle, Calculator } from 'lucide-react';
import { calculatePrice, formatNaira, PricingBreakdown, PricingParams } from '@/services/pricingService';
import { getStudentEligibility } from '@/services/studentVerificationService';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DELIVERY_FEE } from '@/constants/delivery';

interface PricingCalculatorProps {
  onPriceCalculated?: (breakdown: PricingBreakdown, params: PricingParams) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  onPriceCalculated
}) => {
  const { user } = useAuth();
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
    setIsCalculating(true);
    try {
      // Prepare pricing parameters for flat rate
      const pricingParams: PricingParams = {
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
          Simple flat rate pricing: ₦{DELIVERY_FEE} per delivery
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="font-semibold text-blue-900 mb-2">Flat Rate Pricing</h3>
          <p className="text-sm text-blue-700">
            All deliveries are charged a flat rate of ₦{DELIVERY_FEE}, regardless of distance or weight.
            This ensures predictable pricing for all customers.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="green-fee"
            checked={includeGreenFee}
            onCheckedChange={setIncludeGreenFee}
          />
          <Label htmlFor="green-fee">Include Green Fee (₦20)</Label>
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
          disabled={isCalculating}
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