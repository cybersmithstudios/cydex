// Phase 3: Student Subscription Form Component
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Zap, Leaf } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getStudentEligibility, createStudentSubscription } from '@/services/studentVerificationService';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { usePaystackPayment } from 'react-paystack';
import { toast } from 'sonner';

export const SubscriptionForm: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
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

  const subscriptionPrice = 100000; // ₦1,000 in kobo

  const createPaystackPaymentConfig = () => ({
    reference: `sub_${new Date().getTime()}`,
    email: user?.email || '',
    amount: subscriptionPrice,
    publicKey: 'pk_test_your_paystack_public_key', // Replace with actual key
    text: 'Subscribe Now',
    onSuccess: (reference: any) => {
      console.log('Payment successful:', reference);
      handleSubscriptionSuccess(reference.reference);
    },
    onClose: () => {
      console.log('Payment closed');
      toast.info('Payment cancelled');
    },
  });

  const initializePayment = usePaystackPayment(createPaystackPaymentConfig());

  const handleSubscriptionSuccess = async (paymentReference: string) => {
    try {
      setLoading(true);
      const subscription = await createStudentSubscription(user!.id, paymentReference);
      
      if (subscription) {
        toast.success('Subscription activated successfully!');
        // Refresh student info
        const updatedInfo = await getStudentEligibility(user!.email, user!.id);
        setStudentInfo({
          isEligible: updatedInfo.isEligibleForDiscount,
          hasSubscription: updatedInfo.hasActiveSubscription,
          subscription: updatedInfo.subscription,
          eligibleForSubscription: updatedInfo.eligibleForSubscription
        });
      } else {
        toast.error('Failed to activate subscription. Please contact support.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to activate subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = () => {
    if (!user) {
      toast.error('Please log in to subscribe');
      return;
    }
    
    initializePayment({});
  };

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

        {/* Pricing */}
        <div className="p-6 rounded-lg border bg-primary/5">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">₦1,000</div>
            <div className="text-muted-foreground mb-4">per month</div>
            <p className="text-sm text-muted-foreground">
              Exclusive pricing for UI students. Save money on frequent deliveries!
            </p>
          </div>
        </div>

        {/* Action Button */}
        {studentInfo.hasSubscription ? (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Your student subscription is active! Enjoy unlimited deliveries.
            </AlertDescription>
          </Alert>
        ) : (
          <Button 
            onClick={handleSubscribe} 
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? 'Processing...' : 'Subscribe for ₦1,000/month'}
          </Button>
        )}

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Available only for University of Ibadan students. 
            Payment processed securely via Paystack.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};