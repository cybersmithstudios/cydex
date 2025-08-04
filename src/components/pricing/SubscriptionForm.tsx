// Phase 3: Student Subscription Management Component
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Crown, Calendar, CreditCard, AlertCircle } from 'lucide-react';
import { formatNaira } from '@/services/pricingService';
import { getStudentEligibility, type StudentSubscription } from '@/services/studentVerificationService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createPaystackPaymentConfig, logPaymentEvent } from '@/utils/paystack';
import { usePaystackPayment } from 'react-paystack';

export const SubscriptionForm: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    isEligible: false,
    hasSubscription: false,
    subscription: null as StudentSubscription | null,
    eligibleForSubscription: false
  });

  const subscriptionPrice = 1000; // ₦1,000 per month

  useEffect(() => {
    if (user?.email) {
      loadStudentInfo();
    }
  }, [user]);

  const loadStudentInfo = async () => {
    if (!user?.email) return;
    
    setLoading(true);
    try {
      const info = await getStudentEligibility(user.email, user.id);
      setStudentInfo({
        isEligible: info.isEligibleForDiscount,
        hasSubscription: info.hasActiveSubscription,
        subscription: info.subscription,
        eligibleForSubscription: info.eligibleForSubscription
      });
    } catch (error) {
      console.error('Failed to load student info:', error);
    } finally {
      setLoading(false);
    }
  };

  const paystackConfig = user ? createPaystackPaymentConfig(
    subscriptionPrice,
    user.email,
    `SUB-${Date.now()}`,
    user.id
  ) : null;

  const initializePayment = usePaystackPayment(paystackConfig || {
    publicKey: '',
    amount: 0,
    email: ''
  });

  const handleSubscribe = () => {
    if (!user || !paystackConfig) return;

    logPaymentEvent('initiated', {
      reference: paystackConfig.reference,
      amount: subscriptionPrice,
      email: user.email,
      orderNumber: paystackConfig.reference
    });

    initializePayment({
      onSuccess: (response) => {
        logPaymentEvent('success', {
          reference: response.reference,
          amount: subscriptionPrice,
          email: user.email,
          orderNumber: paystackConfig.reference,
          status: response.status
        });

        toast({
          title: "Payment Successful!",
          description: "Your student subscription has been activated.",
        });

        // Refresh student info
        loadStudentInfo();
      },
      onClose: () => {
        toast({
          title: "Payment Cancelled",
          description: "You can try again anytime.",
          variant: "destructive"
        });
      },
    });
  };

  if (!user) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="p-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please log in to access student subscription features.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!studentInfo.isEligible) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="p-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Student subscriptions are only available for @ui.edu.ng email addresses.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          Student Subscription
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="text-center space-y-2">
          {studentInfo.hasSubscription && studentInfo.subscription ? (
            <div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 mb-2">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active Subscription
              </Badge>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Expires: {new Date(studentInfo.subscription.end_date || '').toLocaleDateString()}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Badge variant="outline" className="border-yellow-500 text-yellow-700 mb-2">
                No Active Subscription
              </Badge>
              <p className="text-sm text-muted-foreground">
                Subscribe for unlimited deliveries at just {formatNaira(subscriptionPrice)}/month
              </p>
            </div>
          )}
        </div>

        <Separator />

        {/* Subscription Benefits */}
        <div className="space-y-3">
          <h4 className="font-semibold">Subscription Benefits</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Unlimited deliveries within UI campus
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              No per-delivery charges
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Priority delivery during peak hours
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Exclusive student offers and discounts
            </li>
          </ul>
        </div>

        <Separator />

        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Monthly Subscription</span>
            <span className="text-xl font-bold">{formatNaira(subscriptionPrice)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            * Valid only for @ui.edu.ng email addresses
          </p>
        </div>

        {/* Action Button */}
        {studentInfo.eligibleForSubscription ? (
          <Button 
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            {loading ? 'Processing...' : `Subscribe for ${formatNaira(subscriptionPrice)}/month`}
          </Button>
        ) : studentInfo.hasSubscription ? (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Your subscription is active and will auto-renew monthly.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You already have an active subscription or are not eligible.
            </AlertDescription>
          </Alert>
        )}

        {/* Note */}
        <div className="text-xs text-muted-foreground text-center">
          Subscription will be active immediately after successful payment and will auto-renew monthly.
        </div>
      </CardContent>
    </Card>
  );
};