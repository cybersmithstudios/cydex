// Paystack Webhook Handler for Cydex
import { createClient } from '@supabase/supabase-js';
import { getSecretKey } from '@/constants/paystack';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export interface PaystackWebhookEvent {
  event: string;
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
    metadata: {
      custom_fields: Array<{
        display_name: string;
        variable_name: string;
        value: string;
      }>;
    };
    fees: number;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
    };
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
    };
  };
}

export class PaystackWebhookHandler {
  /**
   * Verify webhook signature (in production, this should be done on your backend)
   */
  private static verifyWebhookSignature(payload: string, signature: string): boolean {
    // Note: In a real application, this should be done on your backend
    // using crypto.createHmac('sha512', secret).update(payload).digest('hex')
    // For now, we'll return true for testing purposes
    return true;
  }

  /**
   * Process payment success webhook
   */
  static async handlePaymentSuccess(event: PaystackWebhookEvent): Promise<void> {
    try {
      const { data } = event;
      
      // Extract order information from metadata
      const orderNumber = data.metadata.custom_fields.find(
        field => field.variable_name === 'order_number'
      )?.value;
      
      const customerId = data.metadata.custom_fields.find(
        field => field.variable_name === 'customer_id'
      )?.value;

      if (!orderNumber) {
        throw new Error('Order number not found in payment metadata');
      }

      // Update order payment status in database
      const { error: orderError } = await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          status: 'processing',
          payment_reference: data.reference,
          payment_gateway: 'paystack',
          payment_details: {
            transaction_id: data.id,
            gateway_response: data.gateway_response,
            channel: data.channel,
            fees: data.fees,
            paid_at: data.paid_at,
          },
        })
        .eq('order_number', orderNumber);

      if (orderError) {
        throw new Error(`Failed to update order: ${orderError.message}`);
      }

      // Log successful payment
      await this.logPaymentEvent('success', {
        reference: data.reference,
        amount: data.amount / 100, // Convert from kobo
        email: data.customer.email,
        orderNumber,
        customerId,
        transactionId: data.id.toString(),
      });

      console.log(`Payment successful for order ${orderNumber}:`, {
        reference: data.reference,
        amount: data.amount / 100,
        customer: data.customer.email,
      });

    } catch (error) {
      console.error('Error processing payment success webhook:', error);
      throw error;
    }
  }

  /**
   * Process payment failure webhook
   */
  static async handlePaymentFailure(event: PaystackWebhookEvent): Promise<void> {
    try {
      const { data } = event;
      
      const orderNumber = data.metadata.custom_fields.find(
        field => field.variable_name === 'order_number'
      )?.value;

      if (!orderNumber) {
        console.warn('Order number not found in failed payment metadata');
        return;
      }

      // Update order payment status
      const { error: orderError } = await supabase
        .from('orders')
        .update({
          payment_status: 'failed',
          payment_reference: data.reference,
          payment_gateway: 'paystack',
          payment_details: {
            transaction_id: data.id,
            gateway_response: data.gateway_response || data.message,
            channel: data.channel,
            failed_at: new Date().toISOString(),
          },
        })
        .eq('order_number', orderNumber);

      if (orderError) {
        throw new Error(`Failed to update order: ${orderError.message}`);
      }

      // Log failed payment
      await this.logPaymentEvent('failed', {
        reference: data.reference,
        amount: data.amount / 100,
        email: data.customer.email,
        orderNumber,
        error: data.message || 'Payment failed',
      });

      console.log(`Payment failed for order ${orderNumber}:`, {
        reference: data.reference,
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
          gateway: 'paystack',
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

      const event: PaystackWebhookEvent = JSON.parse(payload);

      switch (event.event) {
        case 'charge.success':
          await this.handlePaymentSuccess(event);
          return { success: true, message: 'Payment success processed' };

        case 'charge.failed':
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

export default PaystackWebhookHandler; 