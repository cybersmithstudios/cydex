// Phase 3: Student Subscription Form Component
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Zap, Leaf } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getStudentEligibility } from '@/services/studentVerificationService';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from 'sonner';

export const SubscriptionForm: React.FC = () => {
  const { user } = useAuth();
  const [studentInfo, setStudentInfo] = useState({
    isEligible: false,
    hasSubscription: false,
    subscription: null,
    eligibleForSubscription: false
  });

  useEffect(() => {
    const loadStudentInfo = async () => {
      if (user?.email) {
        const info = await getStudentEligibility(user.email, user.id);
        setStudentInfo({
          isEligible: info.isEligibleForDiscount,
          hasSubscription: info.hasActiveSubscription,
          subscription: info.subscription,
          eligibleForSubscription: info.eligibleForSubscription
        });
      }
    };
    
    loadStudentInfo();
  }, [user]);

  if (!user) {
    return (
      <Alert>
        <AlertDescription>
          Please log in to view subscription options.
        </AlertDescription>
      </Alert>
    );
  }

  if (!studentInfo.isEligible) {
    return (
      <Alert>
        <AlertDescription>
          Student subscriptions are only available for University of Ibadan students with @ui.edu.ng email addresses.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Student Subscription
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="p-4 rounded-lg border bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Subscription Status</span>
            <Badge variant={studentInfo.hasSubscription ? 'default' : 'secondary'}>
              {studentInfo.hasSubscription ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          {studentInfo.hasSubscription && studentInfo.subscription && (
            <p className="text-sm text-muted-foreground">
              Valid until: {new Date(studentInfo.subscription.end_date!).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Subscription Benefits */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Subscription Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Unlimited Deliveries</h4>
                <p className="text-sm text-muted-foreground">No per-delivery charges</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Priority Service</h4>
                <p className="text-sm text-muted-foreground">Faster delivery times</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <Leaf className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Eco Impact</h4>
                <p className="text-sm text-muted-foreground">Support sustainability</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing (informational only for now) */}
        <div className="p-6 rounded-lg border bg-primary/5">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">₦1,000</div>
            <div className="text-muted-foreground mb-4">per month (coming soon)</div>
            <p className="text-sm text-muted-foreground">
              Exclusive pricing for UI students. Subscription payments will be processed via Squad soon.
            </p>
          </div>
        </div>

        {/* Action / status */}
        <Alert className="border-blue-200 bg-blue-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Student subscription payments are not yet live. This feature will be enabled with Squad in a future update.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};