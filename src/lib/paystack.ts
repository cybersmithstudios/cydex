// Paystack Utilities for Cydex
import { PAYSTACK_CONFIG } from '@/config/paystack';

export interface PaystackPaymentData {
  reference: string;
  amount: number; // Amount in kobo
  email: string;
  currency?: string;
  metadata?: {
    custom_fields?: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
    [key: string]: any;
  };
}

export interface PaystackResponse {
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
  redirecturl?: string;
}

export interface PaystackTransactionVerification {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: any;
    log: any;
    fees: number;
    fees_split: any;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string | null;
    };
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: any;
      risk_action: string;
      international_format_phone: string | null;
    };
    plan: any;
    order_id: string | null;
    paidAt: string;
    createdAt: string;
    requested_amount: number;
    pos_transaction_data: any;
    source: any;
    fees_breakdown: any;
  };
}

/**
 * Creates Paystack payment configuration
 */
export const createPaystackConfig = (
  amount: number,
  email: string,
  orderNumber: string,
  customerId?: string
): PaystackPaymentData => {
  return {
    reference: PAYSTACK_CONFIG.generateReference(orderNumber),
    amount: PAYSTACK_CONFIG.toKobo(amount),
    email,
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

/**
 * Verify Paystack transaction
 */
export const verifyPaystackTransaction = async (
  reference: string
): Promise<PaystackTransactionVerification> => {
  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_CONFIG.getSecretKey()}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Payment verification failed: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Format currency amount for display
 */
export const formatCurrency = (amount: number, includeSymbol: boolean = true): string => {
  const formatted = new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return includeSymbol ? `₦${formatted}` : formatted;
};

/**
 * Log payment transaction for debugging/tracking
 */
export const logPaymentTransaction = (
  type: 'success' | 'failure' | 'initiated',
  data: {
    reference?: string;
    amount: number;
    email: string;
    orderNumber: string;
    status?: string;
    error?: string;
  }
): void => {
  const logData = {
    timestamp: new Date().toISOString(),
    type,
    platform: 'Cydex',
    paymentGateway: 'Paystack',
    environment: PAYSTACK_CONFIG.IS_PRODUCTION ? 'production' : 'test',
    ...data,
  };

  console.log(`[Paystack ${type.toUpperCase()}]`, logData);

  // In production, you might want to send this to a logging service
  if (PAYSTACK_CONFIG.IS_PRODUCTION) {
    // TODO: Send to logging service (e.g., Sentry, LogRocket, etc.)
  }
};

/**
 * Validate payment amount
 */
export const validatePaymentAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 100000000; // Max 1 billion kobo (10 million naira)
};

/**
 * Validate email for payment
 */
export const validatePaymentEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}; 