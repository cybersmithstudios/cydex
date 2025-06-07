// Paystack Configuration for Cydex
export const PAYSTACK_CONFIG = {
  // Test Keys - Replace with production keys when going live
  TEST_PUBLIC_KEY: 'pk_test_b11301f99f310c1a5002e66379e5eaa5906b7e63',
  TEST_SECRET_KEY: 'sk_test_e2c8097133b859e014e2dff1c15c5c6fb82e6ef8',
  
  // Production Keys (to be filled when ready for production)
  PROD_PUBLIC_KEY: '',
  PROD_SECRET_KEY: '',
  
  // Environment check
  IS_PRODUCTION: import.meta.env.PROD,
  
  // Currency settings
  CURRENCY: 'NGN',
  
  // Payment settings
  CALLBACK_URL: import.meta.env.VITE_APP_URL || 'http://localhost:8080',
  
  // Get the appropriate public key based on environment
  getPublicKey: () => {
    return PAYSTACK_CONFIG.IS_PRODUCTION 
      ? PAYSTACK_CONFIG.PROD_PUBLIC_KEY 
      : PAYSTACK_CONFIG.TEST_PUBLIC_KEY;
  },
  
  // Get the appropriate secret key based on environment
  getSecretKey: () => {
    return PAYSTACK_CONFIG.IS_PRODUCTION 
      ? PAYSTACK_CONFIG.PROD_SECRET_KEY 
      : PAYSTACK_CONFIG.TEST_SECRET_KEY;
  },
  
  // Convert amount to kobo (Paystack uses kobo as the smallest unit)
  toKobo: (amount: number): number => {
    return Math.round(amount * 100);
  },
  
  // Convert amount from kobo to naira
  fromKobo: (amount: number): number => {
    return amount / 100;
  },
  
  // Generate unique reference
  generateReference: (prefix: string = 'CYD'): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${prefix}-${timestamp}-${random}`;
  },
  
  // Payment methods configuration
  PAYMENT_METHODS: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
  
  // Webhook configuration
  WEBHOOK_SECRET: import.meta.env.VITE_PAYSTACK_WEBHOOK_SECRET || '',
}; 