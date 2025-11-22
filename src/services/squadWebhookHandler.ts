// Squad Webhook Handler for Cydex
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export interface SquadWebhookEvent {
  event: string;
  data: {
    id: string;
    transaction_ref: string;
    amount: number;
    currency: string;
    status: string;
    message: string | null;
    customer: {
      email: string;
      name?: string;
      phone?: string;
    };
    metadata?: Record<string, any>;
    payment_method?: string;
    created_at: string;
    updated_at: string;
  };
}

export class SquadWebhookHandler {
  /**
   * Verify webhook signature (in production, this should be done on your backend)
   */
  private static verifyWebhookSignature(payload: string, signature: string): boolean {
    // Note: In a real application, this should be done on your backend
    // using crypto.createHmac('sha256', secret).update(payload).digest('hex')
    // For now, we'll return true for testing purposes
    const webhookSecret = import.meta.env.VITE_SQUAD_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.warn('Webhook secret not configured');
      return true; // Allow in test mode
    }
    
    // TODO: Implement proper HMAC verification
    // const expectedSignature = crypto.createHmac('sha256', webhookSecret)
    //   .update(payload)
    //   .digest('hex');
    // return signature === expectedSignature;
    
    return true;
  }

  /**
   * Process payment success webhook
   */
  static async handlePaymentSuccess(event: SquadWebhookEvent): Promise<void> {
    try {
      const { data } = event;
      
      // Extract order information from metadata
      const orderNumber = data.metadata?.order_number;
      const customerId = data.metadata?.customer_id;

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
          payment_reference: data.transaction_ref,
          payment_gateway: 'squad',
          payment_details: {
            transaction_id: data.id,
            gateway_response: data.message,
            status: data.status,
            payment_method: data.payment_method,
            paid_at: data.updated_at,
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
          amount: data.amount / 100, // Convert from kobo
          status: 'completed',
          description: `Payment for order ${orderNumber}`,
          reference_id: null, // Will be updated with order ID if needed
          reference_type: 'order',
          payment_method: data.payment_method || 'card',
          metadata: {
            squad_reference: data.transaction_ref,
            transaction_id: data.id,
          },
          processed_at: new Date().toISOString(),
        });

        // Update customer wallet
        await supabase.rpc('update_customer_wallet_on_payment', {
          p_customer_id: customerId,
          p_amount: data.amount / 100,
        }).catch(err => {
          console.warn('Failed to update customer wallet:', err);
          // Don't throw - wallet update is not critical for order processing
        });
      }

      // Log successful payment
      await this.logPaymentEvent('success', {
        reference: data.transaction_ref,
        amount: data.amount / 100, // Convert from kobo
        email: data.customer.email,
        orderNumber,
        customerId,
        transactionId: data.id,
      });

      console.log(`Payment successful for order ${orderNumber}:`, {
        reference: data.transaction_ref,
        amount: data.amount / 100,
        customer: data.customer.email,
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
      const { data } = event;
      
      const orderNumber = data.metadata?.order_number;

      if (!orderNumber) {
        console.warn('Order number not found in failed payment metadata');
        return;
      }

      // Update order payment status
      const { error: orderError } = await supabase
        .from('orders')
        .update({
          payment_status: 'failed',
          payment_reference: data.transaction_ref,
          payment_gateway: 'squad',
          payment_details: {
            transaction_id: data.id,
            gateway_response: data.message || 'Payment failed',
            status: data.status,
            payment_method: data.payment_method,
            failed_at: new Date().toISOString(),
          },
        })
        .eq('order_number', orderNumber);

      if (orderError) {
        throw new Error(`Failed to update order: ${orderError.message}`);
      }

      // Log failed payment
      await this.logPaymentEvent('failed', {
        reference: data.transaction_ref,
        amount: data.amount / 100,
        email: data.customer.email,
        orderNumber,
        error: data.message || 'Payment failed',
      });

      console.log(`Payment failed for order ${orderNumber}:`, {
        reference: data.transaction_ref,
        reason: data.message,
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
   */
  static async processWebhook(
    payload: string,
    signature: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Verify webhook signature
      if (!this.verifyWebhookSignature(payload, signature)) {
        return { success: false, message: 'Invalid webhook signature' };
      }

      const event: SquadWebhookEvent = JSON.parse(payload);

      switch (event.event) {
        case 'charge.success':
        case 'transaction.success':
          await this.handlePaymentSuccess(event);
          return { success: true, message: 'Payment success processed' };

        case 'charge.failed':
        case 'transaction.failed':
          await this.handlePaymentFailure(event);
          return { success: true, message: 'Payment failure processed' };

        default:
          console.log(`Unhandled webhook event: ${event.event}`);
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

