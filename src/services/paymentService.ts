// Payment Service for Cydex - Paystack Integration

export interface PaymentVerificationResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface PaymentLog {
  reference: string;
  amount: number;
  email: string;
  orderNumber: string;
  status: 'initiated' | 'success' | 'failed';
  timestamp: string;
  gateway: 'paystack';
  mode: 'test' | 'live';
}

class PaymentService {
  private readonly TEST_SECRET_KEY = 'sk_test_e2c8097133b859e014e2dff1c15c5c6fb82e6ef8';
  private readonly TEST_PUBLIC_KEY = 'pk_test_b11301f99f310c1a5002e66379e5eaa5906b7e63';
  private readonly isTestMode = true; // Set to false for production

  /**
   * Get the public key for frontend use
   */
  getPublicKey(): string {
    return this.TEST_PUBLIC_KEY;
  }

  /**
   * Convert amount to kobo (Paystack's smallest unit)
   */
  toKobo(amount: number): number {
    return Math.round(amount * 100);
  }

  /**
   * Convert amount from kobo to naira
   */
  fromKobo(amount: number): number {
    return amount / 100;
  }

  /**
   * Generate unique payment reference
   */
  generateReference(orderNumber: string): string {
    return `${orderNumber}-${Date.now()}`;
  }

  /**
   * Create Paystack payment configuration
   */
  createPaymentConfig(
    amount: number,
    email: string,
    orderNumber: string,
    customerId?: string
  ) {
    return {
      reference: this.generateReference(orderNumber),
      email,
      amount: this.toKobo(amount),
      publicKey: this.getPublicKey(),
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
  }

  /**
   * Verify payment with Paystack API
   * Note: In production, this should be called from your backend for security
   */
  async verifyPayment(reference: string): Promise<PaymentVerificationResult> {
    try {
      const response = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.TEST_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        success: data.status === true && data.data.status === 'success',
        data: data.data,
      };
    } catch (error) {
      console.error('Payment verification failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Verification failed',
      };
    }
  }

  /**
   * Log payment events for debugging and tracking
   */
  logPayment(
    status: 'initiated' | 'success' | 'failed',
    data: {
      reference: string;
      amount: number;
      email: string;
      orderNumber: string;
      error?: string;
    }
  ): void {
    const log: PaymentLog = {
      ...data,
      status,
      timestamp: new Date().toISOString(),
      gateway: 'paystack',
      mode: this.isTestMode ? 'test' : 'live',
    };

    console.log(`[PAYMENT ${status.toUpperCase()}]`, log);

    // In production, you might want to send this to your analytics/logging service
    if (!this.isTestMode) {
      // TODO: Send to logging service (e.g., Supabase, Sentry, etc.)
    }
  }

  /**
   * Format currency for display
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  /**
   * Validate payment data
   */
  validatePaymentData(amount: number, email: string): { isValid: boolean; error?: string } {
    if (amount <= 0) {
      return { isValid: false, error: 'Amount must be greater than 0' };
    }

    if (amount > 10000000) { // 100 million naira limit
      return { isValid: false, error: 'Amount exceeds maximum limit' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Invalid email address' };
    }

    return { isValid: true };
  }
}

// Export a singleton instance
export const paymentService = new PaymentService();

// Export the class for testing
export default PaymentService; 