// Payment Service for Cydex - Squad Integration
// This is a wrapper around squadPaymentService for backward compatibility
import { squadPaymentService } from './squadPaymentService';
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

class PaymentService {
  /**
   * Get the public key for frontend use
   * @throws {Error} If public key is not configured
   */
  getPublicKey(): string {
    return SQUAD_CONFIG.getPublicKey();
  }

  /**
   * Convert amount to kobo (Squad's smallest unit)
   * @param amount Amount in Naira
   * @returns Amount in kobo
   */
  toKobo(amount: number): number {
    return squadPaymentService.toKobo(amount);
  }

  /**
   * Convert amount from kobo to naira
   * @param amount Amount in kobo
   * @returns Amount in Naira
   */
  fromKobo(amount: number): number {
    return squadPaymentService.fromKobo(amount);
  }

  /**
   * Generate unique payment reference
   * @param orderNumber The order number to include in the reference
   * @returns A unique payment reference
   */
  generateReference(orderNumber: string): string {
    return squadPaymentService.generateReference(orderNumber);
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
    return squadPaymentService.createPaymentConfig(
      amount,
      email,
      orderNumber,
      customerId,
      metadata
    );
  }

  /**
   * Verify payment with Squad API
   * @param reference Payment transaction reference to verify
   * @returns Verification result with payment status
   */
  async verifyPayment(reference: string): Promise<PaymentVerificationResult> {
    return squadPaymentService.verifyPayment(reference);
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
    squadPaymentService.logPayment(status, data);
  }

  /**
   * Format currency for display
   */
  formatCurrency(amount: number): string {
    return squadPaymentService.formatCurrency(amount);
  }

  /**
   * Validate payment data
   */
  validatePaymentData(amount: number, email: string): { isValid: boolean; error?: string } {
    return squadPaymentService.validatePaymentData(amount, email);
  }
}

// Export a singleton instance
export const paymentService = new PaymentService();

// Export the class for testing
export default PaymentService; 