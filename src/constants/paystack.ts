// Paystack Configuration Constants for Cydex

export const PAYSTACK_KEYS = {
  // Test Keys (provided by user)
  TEST_PUBLIC_KEY: 'pk_test_b11301f99f310c1a5002e66379e5eaa5906b7e63',
  TEST_SECRET_KEY: 'sk_test_e2c8097133b859e014e2dff1c15c5c6fb82e6ef8',
  
  // Production Keys (to be filled when going live)
  PROD_PUBLIC_KEY: '',
  PROD_SECRET_KEY: '',
} as const;

export const PAYSTACK_CONFIG = {
  // Environment
  IS_PRODUCTION: false, // Set to true for production
  
  // API URLs
  API_BASE_URL: 'https://api.paystack.co',
  
  // Currency
  CURRENCY: 'NGN',
  
  // Payment limits (in Naira)
  MIN_AMOUNT: 1,
  MAX_AMOUNT: 10000000, // 10 million naira
  
  // Supported payment channels
  PAYMENT_CHANNELS: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
  
  // Test card details for testing
  TEST_CARDS: {
    SUCCESSFUL_VISA: {
      number: '4084084084084081',
      expiry: '12/25',
      cvv: '408',
    },
    FAILED_VISA: {
      number: '4084084084084099',
      expiry: '12/25',
      cvv: '408',
    },
  },
} as const;

// Helper functions
export const getPublicKey = (): string => {
  return PAYSTACK_CONFIG.IS_PRODUCTION 
    ? PAYSTACK_KEYS.PROD_PUBLIC_KEY 
    : PAYSTACK_KEYS.TEST_PUBLIC_KEY;
};

export const getSecretKey = (): string => {
  return PAYSTACK_CONFIG.IS_PRODUCTION 
    ? PAYSTACK_KEYS.PROD_SECRET_KEY 
    : PAYSTACK_KEYS.TEST_SECRET_KEY;
};

export const toKobo = (amount: number): number => {
  return Math.round(amount * 100);
};

export const fromKobo = (amount: number): number => {
  return amount / 100;
};

export const generatePaymentReference = (prefix: string = 'CYD'): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}-${timestamp}-${random}`;
}; 