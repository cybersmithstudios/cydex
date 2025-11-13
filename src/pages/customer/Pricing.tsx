// Phase 3: Pricing Page
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { PricingCalculator } from '@/components/pricing/PricingCalculator';
import { SubscriptionForm } from '@/components/pricing/SubscriptionForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, CreditCard, Leaf } from 'lucide-react';

const Pricing = () => {
  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="p-2 sm:p-4 md:p-6 max-w-full mx-auto space-y-3 sm:space-y-4 md:space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Pricing & Subscriptions</h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Simple flat rate pricing: ₦500 per delivery. 
            Special discounts available for University of Ibadan students.
          </p>
        </div>

        {/* Pricing Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base font-medium flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Flat Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-2xl sm:text-3xl font-bold">₦500</div>
              <p className="text-xs sm:text-sm text-gray-500">Per delivery</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base font-medium flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Student Discount
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-2xl sm:text-3xl font-bold">10%</div>
              <p className="text-xs sm:text-sm text-gray-500">For @ui.edu.ng emails</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base font-medium flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                Green Fee
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-2xl sm:text-3xl font-bold">₦20</div>
              <p className="text-xs sm:text-sm text-gray-500">Optional sustainability</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Calculate Your Delivery Cost</CardTitle>
            <CardDescription className="text-sm">
              Simple flat rate pricing with optional discounts
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Tabs defaultValue="calculator" className="w-full">
              <TabsList className="mb-3 sm:mb-4 w-full">
                <TabsTrigger value="calculator" className="text-xs sm:text-sm flex-1">Price Calculator</TabsTrigger>
                <TabsTrigger value="subscription" className="text-xs sm:text-sm flex-1">Student Plans</TabsTrigger>
              </TabsList>
              
              <TabsContent value="calculator" className="mt-6">
                <PricingCalculator />
              </TabsContent>
              
              <TabsContent value="subscription" className="mt-6">
                <SubscriptionForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Pricing Information */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Pricing Details</CardTitle>
            <CardDescription className="text-sm">
              Understanding our simple and transparent pricing structure
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Flat Rate Pricing</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• All deliveries: ₦500 flat rate</li>
                  <li>• No distance or weight calculations</li>
                  <li>• Predictable pricing for all customers</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Available Discounts</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• UI students: 10% discount (₦450)</li>
                  <li>• Green fee: ₦20 (optional)</li>
                  <li>• Student subscription plans available</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Pricing;