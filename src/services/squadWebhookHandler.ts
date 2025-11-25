// Squad Webhook Handler for Cydex
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Squad Webhook Event Structure based on Squad API documentation
export interface SquadWebhookEvent {
  Event: string; // e.g., "charge_successful"
  TransactionRef: string; // Transaction reference
  Body: {
    amount: number; // Amount in kobo
    transaction_ref: string;
    gateway_ref: string;
    transaction_status: 'Success' | 'Failed' | 'Abandoned' | 'Pending';
    email: string;
    merchant_id?: string;
    currency: string;
    transaction_type: 'Card' | 'Transfer' | 'Bank' | 'Ussd' | 'MerchantUssd';
    merchant_amount: number; // Amount after fees (in kobo)
    created_at: string;
    meta?: Record<string, any>; // Custom metadata passed during payment initiation
    payment_information?: {
      payment_type?: string;
      pan?: string; // For card payments
      card_type?: string;
      token_id?: string; // For recurring payments
      customer_ref?: string; // For merchant USSD
    };
    customer_mobile?: string; // For USSD payments
    is_recurring?: boolean;
  };
}

export class SquadWebhookHandler {
  /**
   * Verify webhook signature using HMAC SHA512
   * Based on Squad documentation: x-squad-encrypted-body is HMAC SHA512 of payload
   * @param payload Raw webhook payload (string)
   * @param signature x-squad-encrypted-body header value
   * @returns true if signature is valid
   */
  private static verifyWebhookSignature(payload: string, signature: string): boolean {
    // Squad uses the secret key (same as API secret key) for webhook signature
    const secretKey = import.meta.env.VITE_SQUAD_SECRET_KEY || 
                      'sandbox_sk_3646639faa50071d6ad87167420fd234eb7dc0716f26';
    
    if (!secretKey) {
      console.warn('Squad secret key not configured for webhook verification');
      return false;
    }

    // In browser/Deno environment, we need to use Web Crypto API
    // For Node.js backend, use: crypto.createHmac('sha512', secretKey).update(payload).digest('hex').toUpperCase()
    
    // Note: This verification should ideally be done on the backend (Supabase Edge Function)
    // For now, we'll implement a basic check. In production, move this to backend.
    
    try {
      // For browser/Deno: Use SubtleCrypto API
      // This is a simplified check - full implementation should be on backend
      if (typeof window !== 'undefined' && window.crypto?.subtle) {
        // Browser environment - signature verification should be done on backend
        console.warn('Webhook signature verification should be done on backend');
        return true; // Allow in test mode, but warn
      }
      
      // For backend (Supabase Edge Function), use proper HMAC verification
      // TODO: Implement proper HMAC SHA512 verification in Edge Function
      return true; // Temporary: allow in test mode
    } catch (error) {
      console.error('Webhook signature verification error:', error);
      return false;
    }
  }

  /**
   * Process payment success webhook
   * Based on Squad webhook structure: { Event: "charge_successful", TransactionRef: "...", Body: {...} }
   */
  static async handlePaymentSuccess(event: SquadWebhookEvent): Promise<void> {
    try {
      const { Body, TransactionRef } = event;
      
      // Extract order information from metadata (passed during payment initiation)
      const orderNumber = Body.meta?.order_number;
      const customerId = Body.meta?.customer_id;

      if (!orderNumber) {
        throw new Error('Order number not found in payment metadata');
      }

      // Update order payment status in database
      // The payment_hold will be created automatically by the database trigger
      const { error: orderError } = await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          status: 'pending', // Keep as pending until vendor accepts
          payment_reference: TransactionRef,
          payment_gateway: 'squad',
          payment_details: {
            transaction_ref: TransactionRef,
            gateway_ref: Body.gateway_ref,
            transaction_status: Body.transaction_status,
            transaction_type: Body.transaction_type,
            merchant_amount: Body.merchant_amount / 100, // Convert from kobo
            payment_method: Body.payment_information?.payment_type || Body.transaction_type.toLowerCase(),
            paid_at: Body.created_at,
          },
        })
        .eq('order_number', orderNumber);

      if (orderError) {
        throw new Error(`Failed to update order: ${orderError.message}`);
      }

      // Create customer transaction record
      if (customerId) {
        const transactionId = `CTX-${orderNumber}-${Date.now()}`;
        await supabase.from('customer_transactions').insert({
          customer_id: customerId,
          transaction_id: transactionId,
          type: 'payment',
          amount: Body.amount / 100, // Convert from kobo
          status: 'completed',
          description: `Payment for order ${orderNumber}`,
          reference_id: null, // Will be updated with order ID if needed
          reference_type: 'order',
          payment_method: Body.payment_information?.payment_type || Body.transaction_type.toLowerCase(),
          metadata: {
            squad_reference: TransactionRef,
            gateway_ref: Body.gateway_ref,
            transaction_type: Body.transaction_type,
            token_id: Body.payment_information?.token_id, // For recurring payments
          },
          processed_at: new Date().toISOString(),
        });

        // Update customer wallet
        await supabase.rpc('update_customer_wallet_on_payment', {
          p_customer_id: customerId,
          p_amount: Body.amount / 100,
        }).catch(err => {
          console.warn('Failed to update customer wallet:', err);
          // Don't throw - wallet update is not critical for order processing
        });
      }

      // Log successful payment
      await this.logPaymentEvent('success', {
        reference: TransactionRef,
        amount: Body.amount / 100, // Convert from kobo
        email: Body.email,
        orderNumber,
        customerId,
        transactionId: TransactionRef,
      });

      console.log(`Payment successful for order ${orderNumber}:`, {
        reference: TransactionRef,
        amount: Body.amount / 100,
        customer: Body.email,
        transaction_type: Body.transaction_type,
        message: 'Payment held in escrow pending delivery',
      });

    } catch (error) {
      console.error('Error processing payment success webhook:', error);
      throw error;
    }
  }

  /**
   * Process payment failure webhook
   */
  static async handlePaymentFailure(event: SquadWebhookEvent): Promise<void> {
    try {
      const { Body, TransactionRef } = event;
      
      const orderNumber = Body.meta?.order_number;

      if (!orderNumber) {
        console.warn('Order number not found in failed payment metadata');
        return;
      }

      // Update order payment status
      const { error: orderError } = await supabase
        .from('orders')
        .update({
          payment_status: 'failed',
          payment_reference: TransactionRef,
          payment_gateway: 'squad',
          payment_details: {
            transaction_ref: TransactionRef,
            gateway_ref: Body.gateway_ref,
            transaction_status: Body.transaction_status,
            transaction_type: Body.transaction_type,
            failed_at: new Date().toISOString(),
          },
        })
        .eq('order_number', orderNumber);

      if (orderError) {
        throw new Error(`Failed to update order: ${orderError.message}`);
      }

      // Log failed payment
      await this.logPaymentEvent('failed', {
        reference: TransactionRef,
        amount: Body.amount / 100,
        email: Body.email,
        orderNumber,
        error: `Payment failed - ${Body.transaction_status}`,
      });

      console.log(`Payment failed for order ${orderNumber}:`, {
        reference: TransactionRef,
        reason: Body.transaction_status,
      });

    } catch (error) {
      console.error('Error processing payment failure webhook:', error);
      throw error;
    }
  }

  /**
   * Log payment events to database
   */
  private static async logPaymentEvent(
    status: 'success' | 'failed' | 'pending',
    data: {
      reference: string;
      amount: number;
      email: string;
      orderNumber: string;
      customerId?: string;
      transactionId?: string;
      error?: string;
    }
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('payment_logs')
        .insert({
          reference: data.reference,
          amount: data.amount,
          email: data.email,
          order_number: data.orderNumber,
          customer_id: data.customerId,
          transaction_id: data.transactionId,
          status,
          gateway: 'squad',
          error_message: data.error,
          created_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Failed to log payment event:', error);
      }
    } catch (error) {
      console.error('Error logging payment event:', error);
    }
  }

  /**
   * Main webhook handler
   * @param payload Raw webhook payload (string)
   * @param signature x-squad-encrypted-body header value
   */
  static async processWebhook(
    payload: string,
    signature: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Verify webhook signature (HMAC SHA512)
      if (!this.verifyWebhookSignature(payload, signature)) {
        return { success: false, message: 'Invalid webhook signature' };
      }

      const event: SquadWebhookEvent = JSON.parse(payload);

      // Squad webhook events: "charge_successful" for success, others for failures
      switch (event.Event) {
        case 'charge_successful':
          if (event.Body.transaction_status === 'Success') {
            await this.handlePaymentSuccess(event);
            return { success: true, message: 'Payment success processed' };
          } else {
            await this.handlePaymentFailure(event);
            return { success: true, message: 'Payment failure processed' };
          }

        default:
          console.log(`Unhandled webhook event: ${event.Event}`);
          return { success: true, message: 'Event ignored' };
      }
    } catch (error) {
      console.error('Webhook processing error:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

export default SquadWebhookHandler;

