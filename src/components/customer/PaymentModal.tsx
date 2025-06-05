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
    publicKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Replace with your Paystack public key
    currency: 'NGN',
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    // Initialize payment
    initializePayment(
      () => {
        toast.success('Payment successful');
        onSuccess();
        onClose();
      },
      () => {
        toast.error('Payment failed');
        onError();
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>
            Please complete your payment to process your order.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Order Number:</span>
            <span className="font-medium">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Amount:</span>
            <span className="font-medium">₦{amount.toLocaleString()}</span>
          </div>
          <Button 
            className="w-full bg-primary hover:bg-primary/80 text-black"
            onClick={handlePayment}
          >
            Pay Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 