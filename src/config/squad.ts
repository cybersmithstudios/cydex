// Squad Payment Gateway Configuration for Cydex

export const SQUAD_CONFIG = {
  // Test Keys - Replace with production keys when going live
  TEST_PUBLIC_KEY: import.meta.env.VITE_SQUAD_PUBLIC_KEY || '',
  TEST_SECRET_KEY: import.meta.env.VITE_SQUAD_SECRET_KEY || '',
  
  // Production Keys (to be filled when ready for production)
  PROD_PUBLIC_KEY: import.meta.env.VITE_SQUAD_PROD_PUBLIC_KEY || '',
  PROD_SECRET_KEY: import.meta.env.VITE_SQUAD_PROD_SECRET_KEY || '',
  
  // Environment check
  IS_PRODUCTION: import.meta.env.PROD || import.meta.env.VITE_NODE_ENV === 'production',
  
  // Currency settings
  CURRENCY: 'NGN',
  
  // API Base URL
  API_BASE_URL: import.meta.env.VITE_SQUAD_API_URL || 'https://sandbox-api-demo.squadco.com',
  PROD_API_BASE_URL: 'https://api.squadco.com',
  
  // Payment settings
  CALLBACK_URL: import.meta.env.VITE_APP_URL || 'http://localhost:8080',
  
  // Get the appropriate public key based on environment
  getPublicKey: () => {
    return SQUAD_CONFIG.IS_PRODUCTION 
      ? SQUAD_CONFIG.PROD_PUBLIC_KEY 
      : SQUAD_CONFIG.TEST_PUBLIC_KEY;
  },
  
  // Get the appropriate secret key based on environment
  getSecretKey: () => {
    return SQUAD_CONFIG.IS_PRODUCTION 
      ? SQUAD_CONFIG.PROD_SECRET_KEY 
      : SQUAD_CONFIG.TEST_SECRET_KEY;
  },
  
  // Get the appropriate API URL based on environment
  getApiUrl: () => {
    return SQUAD_CONFIG.IS_PRODUCTION 
      ? SQUAD_CONFIG.PROD_API_BASE_URL 
      : SQUAD_CONFIG.API_BASE_URL;
  },
  
  // Convert amount to kobo (Squad uses kobo as the smallest unit, same as Paystack)
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
  WEBHOOK_SECRET: import.meta.env.VITE_SQUAD_WEBHOOK_SECRET || '',
};

