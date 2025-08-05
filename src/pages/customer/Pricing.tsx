// Phase 3: Pricing Page
import React from 'react';
import { PricingCalculator } from '@/components/pricing/PricingCalculator';
import { SubscriptionForm } from '@/components/pricing/SubscriptionForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Pricing = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Pricing & Subscriptions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Calculate delivery costs and explore our student subscription plans. 
          Transparent pricing with special discounts for University of Ibadan students.
        </p>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="calculator">Price Calculator</TabsTrigger>
          <TabsTrigger value="subscription">Student Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="mt-8">
          <PricingCalculator />
        </TabsContent>
        
        <TabsContent value="subscription" className="mt-8">
          <SubscriptionForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pricing;