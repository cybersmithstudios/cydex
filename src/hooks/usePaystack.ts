
import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { toast } from 'sonner';

// Paystack Configuration
const PAYSTACK_CONFIG = {
  TEST_PUBLIC_KEY: 'pk_test_b11301f99f310c1a5002e66379e5eaa5906b7e63',
  TEST_SECRET_KEY: 'sk_test_e2c8097133b859e014e2dff1c15c5c6fb82e6ef8',
  CURRENCY: 'NGN',
};

interface PaymentConfig {
  amount: number;
  email: string;
  orderNumber: string;
  customerId?: string;
  onSuccess: (response: any) => void;
  onError: () => void;
}

interface PaystackResponse {
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
}

export const usePaystack = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createPaymentConfig = (config: PaymentConfig) => {
    return {
      reference: `${config.orderNumber}-${Date.now()}`,
      email: config.email,
      amount: config.amount * 100, // Convert to kobo
      publicKey: PAYSTACK_CONFIG.TEST_PUBLIC_KEY,
      currency: PAYSTACK_CONFIG.CURRENCY,
      metadata: {
        custom_fields: [
          {
            display_name: 'Order Number',
            variable_name: 'order_number',
            value: config.orderNumber,
          },
          {
            display_name: 'Customer ID',
            variable_name: 'customer_id',
            value: config.customerId || '',
          },
          {
            display_name: 'Platform',
            variable_name: 'platform',
            value: 'Cydex',
          },
        ],
      },
    };
  };

  const initializePayment = (config: PaymentConfig) => {
    if (!config.email) {
      toast.error('Email is required for payment');
      return;
    }

    if (config.amount <= 0) {
      toast.error('Invalid payment amount');
      return;
    }

    const paymentConfig = createPaymentConfig(config);
    const paystackPayment = usePaystackPayment(paymentConfig);

    setIsLoading(true);

    // Log payment initiation
    console.log('Initiating Paystack payment:', {
      reference: paymentConfig.reference,
      amount: config.amount,
      email: config.email,
      orderNumber: config.orderNumber,
    });

    paystackPayment(
      (response: PaystackResponse) => {
        setIsLoading(false);
        console.log('Payment successful:', response);
        toast.success('Payment completed successfully!');
        config.onSuccess(response);
      },
      () => {
        setIsLoading(false);
        console.log('Payment failed or cancelled');
        toast.error('Payment failed or was cancelled');
        config.onError();
      }
    );
  };

  // Verify payment on the backend (this would typically be called from your backend)
  const verifyPayment = async (reference: string) => {
    try {
      const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_CONFIG.TEST_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  };

  return {
    initializePayment,
    verifyPayment,
    isLoading,
  };
}; 
