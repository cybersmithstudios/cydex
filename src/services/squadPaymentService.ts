// Payment Service for Cydex - Squad Integration
import { SQUAD_CONFIG } from '@/config/squad';

interface PaymentVerificationResult {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

interface PaymentLog {
  reference: string;
  amount: number;
  email: string;
  orderNumber: string;
  status: 'initiated' | 'success' | 'failed' | 'pending';
  timestamp: string;
  gateway: 'squad';
  mode: 'test' | 'live';
  metadata?: Record<string, any>;
  paymentMethod?: string;
}

class SquadPaymentService {
  private readonly isTestMode = import.meta.env.VITE_NODE_ENV !== 'production';
  private readonly publicKey = SQUAD_CONFIG.getPublicKey();
  private readonly secretKey = SQUAD_CONFIG.getSecretKey();
  private readonly apiUrl = SQUAD_CONFIG.getApiUrl();

  /**
   * Get the public key for frontend use
   * @throws {Error} If public key is not configured
   */
  getPublicKey(): string {
    if (!this.publicKey) {
      throw new Error('Squad public key is not configured');
    }
    return this.publicKey;
  }

  /**
   * Convert amount to kobo (Squad uses kobo as the smallest unit)
   * @param amount Amount in Naira
   * @returns Amount in kobo
   * @throws {Error} If amount is invalid
   */
  toKobo(amount: number): number {
    if (isNaN(amount) || amount < 0) {
      throw new Error('Invalid amount provided');
    }
    return Math.round(amount * 100);
  }

  /**
   * Convert amount from kobo to naira
   * @param amount Amount in kobo
   * @returns Amount in Naira
   */
  fromKobo(amount: number): number {
    if (isNaN(amount) || amount < 0) {
      throw new Error('Invalid kobo amount');
    }
    return amount / 100;
  }

  /**
   * Generate unique payment reference
   * @param orderNumber The order number to include in the reference
   * @returns A unique payment reference
   */
  generateReference(orderNumber: string): string {
    if (!orderNumber) {
      throw new Error('Order number is required');
    }
    const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `cydex-${orderNumber}-${Date.now()}-${random}`.toUpperCase();
  }

  /**
   * Create Squad payment configuration
   * @param amount Amount in Naira
   * @param email Customer's email
   * @param orderNumber Order reference number
   * @param customerId Optional customer ID
   * @param metadata Additional metadata to include
   * @returns Squad payment configuration
   */
  createPaymentConfig(
    amount: number,
    email: string,
    orderNumber: string,
    customerId?: string,
    metadata: Record<string, any> = {}
  ) {
    if (!email || !orderNumber) {
      throw new Error('Email and order number are required');
    }

    const defaultMetadata = {
      order_number: orderNumber,
      customer_id: customerId,
      platform: 'Cydex',
      environment: this.isTestMode ? 'test' : 'production',
      timestamp: new Date().toISOString(),
      // Settlement information for escrow handling
      settlement_type: 'escrow',
      hold_funds: true,
    };

    return {
      reference: this.generateReference(orderNumber),
      email,
      amount: this.toKobo(amount),
      currency: 'NGN',
      metadata: {
        ...defaultMetadata,
        ...metadata,
      },
    };
  }

  /**
   * Initialize payment with Squad API
   * Based on Squad API documentation: POST /transaction/initiate
   * @param config Payment configuration
   * @returns Payment initialization response with checkout_url
   */
  async initializePayment(config: {
    amount: number; // Amount in kobo
    email: string;
    transaction_ref?: string;
    currency?: string;
    callback_url?: string;
    customer_name?: string;
    payment_channels?: string[];
    metadata?: Record<string, any>;
  }): Promise<{ success: boolean; data?: any; error?: string; checkout_url?: string }> {
    try {
      // Squad API endpoint: POST /transaction/initiate
      const response = await fetch(`${this.apiUrl}/transaction/initiate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: config.amount, // Already in kobo
          email: config.email,
          currency: config.currency || 'NGN',
          initiate_type: 'inline', // Required by Squad API
          transaction_ref: config.transaction_ref,
          callback_url: config.callback_url,
          customer_name: config.customer_name,
          payment_channels: config.payment_channels || ['card', 'bank', 'ussd', 'transfer'],
          metadata: config.metadata,
        }),
      });

      const responseData = await response.json();

      if (!response.ok || responseData.status !== 200) {
        return {
          success: false,
          error: responseData.message || 'Failed to initialize payment',
          data: responseData,
        };
      }

      // Squad returns: { status: 200, message: "success", data: { checkout_url: "...", ... } }
      return {
        success: true,
        data: responseData.data,
        checkout_url: responseData.data?.checkout_url,
      };
    } catch (error) {
      console.error('Payment initialization error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to initialize payment',
      };
    }
  }

  /**
   * Verify payment with Squad API
   * Based on Squad API documentation: GET /transaction/verify/{transaction_ref}
   * @param transaction_ref Payment transaction reference to verify
   * @returns Verification result with payment status
   */
  async verifyPayment(transaction_ref: string): Promise<PaymentVerificationResult> {
    if (!transaction_ref) {
      return {
        success: false,
        error: 'Transaction reference is required',
        message: 'No payment reference provided',
      };
    }

    try {
      // Squad API endpoint: GET /transaction/verify/{transaction_ref}
      const response = await fetch(
        `${this.apiUrl}/transaction/verify/${encodeURIComponent(transaction_ref)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok || responseData.status !== 200) {
        return {
          success: false,
          error: responseData.message || 'Payment verification failed',
          data: responseData,
        };
      }

      // Squad returns: { status: 200, success: true, message: "Success", data: {...} }
      // Transaction status can be: Success, Failed, Abandoned, or Pending
      return {
        success: true,
        data: responseData.data,
        message: responseData.message || 'Payment verified successfully',
      };
    } catch (error) {
      console.error('Payment verification error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to verify payment',
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
      gateway: 'squad',
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
export const squadPaymentService = new SquadPaymentService();

// Export the class for testing
export default SquadPaymentService;

