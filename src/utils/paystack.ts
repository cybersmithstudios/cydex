// Paystack Configuration and Utilities for Cydex

export const PAYSTACK_KEYS = {
  TEST_PUBLIC_KEY: 'pk_test_b11301f99f310c1a5002e66379e5eaa5906b7e63',
  TEST_SECRET_KEY: 'sk_test_e2c8097133b859e014e2dff1c15c5c6fb82e6ef8',
};

export const PAYSTACK_CONFIG = {
  CURRENCY: 'NGN',
  IS_TEST_MODE: true, // Set to false for production
  
  // Get the public key for frontend use
  getPublicKey: () => PAYSTACK_KEYS.TEST_PUBLIC_KEY,
  
  // Convert amount to kobo (Paystack uses kobo as the smallest unit)
  toKobo: (amount: number): number => Math.round(amount * 100),
  
  // Convert amount from kobo to naira
  fromKobo: (amount: number): number => amount / 100,
  
  // Generate unique reference
  generateReference: (prefix: string = 'CYD'): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${prefix}-${timestamp}-${random}`;
  },
};

// Create Paystack payment configuration
export const createPaystackPaymentConfig = (
  amount: number,
  email: string,
  orderNumber: string,
  customerId?: string
) => {
  return {
    reference: `${orderNumber}-${Date.now()}`,
    email,
    amount: PAYSTACK_CONFIG.toKobo(amount),
    publicKey: PAYSTACK_CONFIG.getPublicKey(),
    currency: PAYSTACK_CONFIG.CURRENCY,
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
          value: customerId || '',
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

// Log payment events
export const logPaymentEvent = (
  event: 'initiated' | 'success' | 'failed',
  data: {
    reference: string;
    amount: number;
    email: string;
    orderNumber: string;
    status?: string;
  }
) => {
  console.log(`[Paystack ${event.toUpperCase()}]`, {
    timestamp: new Date().toISOString(),
    mode: PAYSTACK_CONFIG.IS_TEST_MODE ? 'TEST' : 'LIVE',
    ...data,
  });
};

// Format currency for display
export const formatNaira = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}; 