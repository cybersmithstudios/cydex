// Pricing page for customers to calculate delivery costs
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { PricingCalculator } from '@/components/pricing/PricingCalculator';
import { SubscriptionForm } from '@/components/pricing/SubscriptionForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Crown, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PricingPage = () => {
  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Delivery Pricing</h1>
          <p className="text-muted-foreground">
            Calculate your delivery cost and explore our student subscription options
          </p>
        </div>

        {/* Pricing Information */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Our transparent pricing includes base rate, distance, weight, and time-based fees. 
            UI students get special discounts and subscription options.
          </AlertDescription>
        </Alert>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pricing Calculator */}
          <div>
            <PricingCalculator />
          </div>

          {/* Student Subscription */}
          <div>
            <SubscriptionForm />
          </div>
        </div>

        {/* Pricing Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              How Our Pricing Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold">Base Pricing</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Base rate: ₦200 (up to 2km, &lt;0.5kg)</li>
                  <li>• Distance: ₦75 per additional km</li>
                  <li>• Weight: ₦100 (0.5-5kg), ₦300 (5-10kg)</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Time-Based Fees</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Late night (8 PM - 6 AM): +₦100</li>
                  <li>• Peak hours (12 PM - 2 PM): +20%</li>
                  <li>• Green initiative fee: ₦20 (optional)</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Student Benefits</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• 10% discount with @ui.edu.ng email</li>
                  <li>• ₦1,000/month unlimited subscription</li>
                  <li>• Priority delivery during peak hours</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Transparency Promise</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• No hidden fees</li>
                  <li>• Real-time price calculation</li>
                  <li>• Detailed breakdown shown</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PricingPage;