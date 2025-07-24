
import React, { useState, useEffect } from 'react';
import { usePaystackPayment } from 'react-paystack';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from 'sonner';
import { paymentService } from '@/services/paymentService';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: (reference: string) => void;
  onError: (error: Error) => void;
  orderNumber: string;
  customerEmail: string;
  customerId?: string;
  metadata?: Record<string, any>;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  onSuccess,
  onError,
  orderNumber,
  customerEmail,
  customerId,
  metadata = {},
}): JSX.Element | null => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState<any>(null);
  const { user } = useAuth();

  // Initialize payment config when modal opens
  useEffect(() => {
    if (!isOpen) return;

    try {
      const config = paymentService.createPaymentConfig(
        amount,
        customerEmail,
        orderNumber,
        customerId || user?.id,
        {
          ...metadata,
          source: 'web_checkout',
          ui_version: '1.0.0',
        }
      );
      
      setPaymentConfig(config);
    } catch (error) {
      console.error('Error initializing payment:', error);
      toast.error('Failed to initialize payment. Please try again.');
      onError(error instanceof Error ? error : new Error('Payment initialization failed'));
      onClose();
    }
  }, [isOpen, amount, customerEmail, orderNumber, customerId, user?.id, metadata, onError, onClose]);

  // Define the payment config type that matches react-paystack's expected props
  const getPaymentConfig = () => {
    if (!paymentConfig) {
      return {
        email: customerEmail,
        amount: 0,
        publicKey: paymentService.getPublicKey(),
        text: 'Pay Now',
        onSuccess: () => {},
        onClose: () => {},
      };
    }
    return {
      ...paymentConfig,
      text: 'Pay Now',
      onSuccess: () => {},
      onClose: () => {},
    };
  };

  const initializePayment = usePaystackPayment(getPaymentConfig());

  const handlePayment = async () => {
    if (!paymentConfig) {
      toast.error('Payment configuration not ready. Please try again.');
      return;
    }

    // Close our dialog first so Paystack iframe is unobstructed
    onClose();

    setIsLoading(true);

    try {
      // Initialize payment with success and error callbacks
      await new Promise<void>((resolve, reject) => {
        initializePayment({
          onSuccess: async (response) => {
            try {
              // Verify the payment with our backend
              const verification = await paymentService.verifyPayment(response.reference);
              
              if (verification.success) {
                toast.success('Payment successful!');
                onSuccess(response.reference);
                // Navigate to confirmation page
                navigate('/customer/order-confirmation', {
                  state: {
                    orderNumber,
                    amount,
                  },
                });
                resolve();
              } else {
                const error = new Error(verification.error || 'Payment verification failed');
                onError(error);
                reject(error);
              }
            } catch (error) {
              console.error('Payment verification error:', error);
              const errorObj = error instanceof Error ? error : new Error('Payment verification failed');
              onError(errorObj);
              toast.error('Payment verification failed. Please contact support.');
              reject(errorObj);
            } finally {
              setIsLoading(false);
            }
          },
          onClose: () => {
            setIsLoading(false);
            onClose();
            reject(new Error('Payment was closed by user'));
          },
        });
      });
    } catch (error) {
      // Error is already handled in the promise callbacks
      console.error('Payment initialization error:', error);
      if (error instanceof Error) {
        onError(error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>
            Secure payment powered by Paystack. Your payment information is encrypted and secure.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-gray-600">Order Number:</span>
            <span className="font-medium">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-gray-600">Customer:</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-600">Amount:</span>
            <span className="font-bold text-lg">₦{amount.toLocaleString()}</span>
          </div>
          
          {/* Payment Method Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Choose Payment Method</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-gray-300 rounded-lg p-3 text-center bg-gray-50">
                <div className="text-gray-400 mb-1">💰</div>
                <p className="text-sm font-medium text-gray-500">Wallet</p>
                <p className="text-xs text-gray-400 mt-1">Coming Soon</p>
              </div>
              <div className="border-2 border-primary rounded-lg p-3 text-center bg-primary/5">
                <div className="text-primary mb-1">💳</div>
                <p className="text-sm font-medium text-primary">Paystack</p>
                <p className="text-xs text-gray-600 mt-1">Available</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path 
                    fillRule="evenodd" 
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h.01a1 1 0 100-2H10V9a1 1 0 00-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Test Mode
                </h3>
                <div className="mt-1 text-sm text-blue-700">
                  <p>This is a test transaction. No real money will be charged.</p>
                  <p className="mt-1 font-mono text-xs bg-blue-100 p-1 rounded">
                    Use card: 4084 0840 8408 4081 (any future date, any 3-digit CVV)
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/80 text-black font-semibold py-3"
            onClick={handlePayment}
            disabled={isLoading || !paymentConfig}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay with Paystack - ₦${amount.toLocaleString()}`
            )}
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Secured by Paystack • SSL Encrypted
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
