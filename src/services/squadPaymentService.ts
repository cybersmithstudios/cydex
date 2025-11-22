// Payment Service for Cydex - Squad Integration

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
  private readonly publicKey = import.meta.env.VITE_SQUAD_PUBLIC_KEY;
  private readonly secretKey = import.meta.env.VITE_SQUAD_SECRET_KEY;
  private readonly apiUrl = import.meta.env.VITE_SQUAD_API_URL || 'https://sandbox-api-demo.squadco.com';

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
   * @param config Payment configuration
   * @returns Payment initialization response
   */
  async initializePayment(config: {
    amount: number;
    email: string;
    reference: string;
    currency?: string;
    callback_url?: string;
    metadata?: Record<string, any>;
  }): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${this.apiUrl}/payment/initiate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: config.amount,
          email: config.email,
          currency: config.currency || 'NGN',
          reference: config.reference,
          callback_url: config.callback_url,
          metadata: config.metadata,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to initialize payment');
      }

      const responseData = await response.json();

      if (!responseData.status) {
        return {
          success: false,
          error: responseData.message || 'Payment initialization failed',
          data: responseData,
        };
      }

      return {
        success: true,
        data: responseData.data,
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
   * @param reference Payment reference to verify
   * @returns Verification result with payment status
   */
  async verifyPayment(reference: string): Promise<PaymentVerificationResult> {
    if (!reference) {
      return {
        success: false,
        error: 'Reference is required',
        message: 'No payment reference provided',
      };
    }

    try {
      const response = await fetch(
        `${this.apiUrl}/transaction/verify/${encodeURIComponent(reference)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to verify payment');
      }

      const responseData = await response.json();

      if (!responseData.status) {
        return {
          success: false,
          error: responseData.message || 'Payment verification failed',
          data: responseData,
        };
      }

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

