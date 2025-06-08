
import React from 'react';
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

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: () => void;
  onError: () => void;
  orderNumber: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  onSuccess,
  onError,
  orderNumber,
}) => {
  const { user } = useAuth();

  const config = {
    reference: `${orderNumber}-${Date.now()}`,
    email: user?.email || '',
    amount: amount * 100, // Convert to kobo
    publicKey: 'pk_test_b11301f99f310c1a5002e66379e5eaa5906b7e63',
    currency: 'NGN',
    metadata: {
      custom_fields: [
        {
          display_name: 'Order Number',
          variable_name: 'order_number',
          value: orderNumber,
        },
        {
          display_name: 'Customer ID',
          variable_name: 'customer_id',
          value: user?.id || '',
        },
        {
          display_name: 'Platform',
          variable_name: 'platform',
          value: 'Cydex',
        },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    // Initialize payment with only success callback as per react-paystack v6.0.0
    initializePayment({
      onSuccess: () => {
      toast.success('Payment successful');
      onSuccess();
      onClose();
    },
    onClose: () => {
      onClose();
    },
  });
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
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800">
                  <strong>Test Mode:</strong> This is a test transaction. No real money will be charged.
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/80 text-black font-semibold py-3"
            onClick={handlePayment}
          >
            Pay ₦{amount.toLocaleString()} Now
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
