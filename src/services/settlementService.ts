// Settlement Service for Cydex Platform
// Handles fund settlement, escrow management, and payout operations

import { supabase } from '@/integrations/supabase/client';

interface SettlementCalculation {
  vendorAmount: number;
  riderAmount: number;
  platformFee: number;
  total: number;
}

interface PaymentHold {
  id: string;
  order_id: string;
  payment_reference: string;
  total_amount: number;
  vendor_amount: number;
  rider_amount: number;
  platform_fee: number;
  status: 'held' | 'partial_release' | 'released' | 'refunded';
}

interface Settlement {
  id: string;
  order_id: string;
  recipient_id: string;
  recipient_type: 'vendor' | 'rider';
  amount: number;
  fee: number;
  net_amount: number;
  status: 'pending' | 'completed' | 'failed';
}

class SettlementService {
  /**
   * Calculate settlement amounts for an order
   */
  async calculateSettlement(orderId: string): Promise<SettlementCalculation> {
    const { data: order, error } = await supabase
      .from('orders')
      .select('subtotal, delivery_fee, total_amount')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      throw new Error(`Failed to fetch order: ${error?.message || 'Order not found'}`);
    }

    // Platform takes 10% from vendor sales
    const platformFee = order.subtotal * 0.10;
    const vendorAmount = order.subtotal - platformFee;
    const riderAmount = order.delivery_fee;

    return {
      vendorAmount,
      riderAmount,
      platformFee,
      total: order.total_amount,
    };
  }

  /**
   * Get payment hold for an order
   */
  async getPaymentHold(orderId: string): Promise<PaymentHold | null> {
    const { data, error } = await supabase
      .from('payment_holds')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error) {
      console.error('Error fetching payment hold:', error);
      return null;
    }

    return data as PaymentHold;
  }

  /**
   * Get settlements for an order
   */
  async getOrderSettlements(orderId: string): Promise<Settlement[]> {
    const { data, error } = await supabase
      .from('settlements')
      .select('*')
      .eq('order_id', orderId);

    if (error) {
      console.error('Error fetching settlements:', error);
      return [];
    }

    return data as Settlement[];
  }

  /**
   * Get user settlements (vendor or rider)
   */
  async getUserSettlements(
    userId: string,
    userType: 'vendor' | 'rider'
  ): Promise<Settlement[]> {
    const { data, error } = await supabase
      .from('settlements')
      .select('*')
      .eq('recipient_id', userId)
      .eq('recipient_type', userType)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user settlements:', error);
      return [];
    }

    return data as Settlement[];
  }

  /**
   * Get vendor wallet balance
   */
  async getVendorWalletBalance(vendorId: string) {
    const { data, error } = await supabase
      .from('vendor_wallet')
      .select('*')
      .eq('vendor_id', vendorId)
      .single();

    if (error) {
      // Wallet doesn't exist yet, return zero balance
      return {
        available_balance: 0,
        pending_balance: 0,
        total_earned: 0,
        total_withdrawn: 0,
      };
    }

    return data;
  }

  /**
   * Get rider wallet balance
   */
  async getRiderWalletBalance(riderId: string) {
    const { data, error } = await supabase
      .from('rider_wallet')
      .select('*')
      .eq('rider_id', riderId)
      .single();

    if (error) {
      // Wallet doesn't exist yet, return zero balance
      return {
        available_balance: 0,
        pending_balance: 0,
        total_earned: 0,
        total_withdrawn: 0,
        carbon_credits: 0,
      };
    }

    return data;
  }

  /**
   * Get customer wallet balance
   */
  async getCustomerWalletBalance(customerId: string) {
    const { data, error } = await supabase
      .from('customer_wallet')
      .select('*')
      .eq('customer_id', customerId)
      .single();

    if (error) {
      // Wallet doesn't exist yet, return zero balance
      return {
        available_balance: 0,
        bonus_balance: 0,
        carbon_credits: 0,
        total_spent: 0,
      };
    }

    return data;
  }

  /**
   * Get pending earnings for rider
   */
  async getRiderPendingEarnings(riderId: string) {
    const { data, error } = await supabase
      .from('rider_earnings')
      .select('total_earnings')
      .eq('rider_id', riderId)
      .in('status', ['pending', 'held']);

    if (error) {
      console.error('Error fetching pending earnings:', error);
      return 0;
    }

    return data.reduce((sum, earning) => sum + Number(earning.total_earnings), 0);
  }

  /**
   * Get pending balance for vendor
   */
  async getVendorPendingBalance(vendorId: string) {
    // Get orders that are paid but not yet delivered
    const { data, error } = await supabase
      .from('orders')
      .select('subtotal')
      .eq('vendor_id', vendorId)
      .eq('payment_status', 'paid')
      .neq('status', 'delivered');

    if (error) {
      console.error('Error fetching pending balance:', error);
      return 0;
    }

    // Calculate vendor's share (90% of subtotal)
    return data.reduce((sum, order) => sum + (Number(order.subtotal) * 0.9), 0);
  }

  /**
   * Request vendor payout
   */
  async requestVendorPayout(
    vendorId: string,
    amount: number,
    bankAccountId: string
  ) {
    // Check available balance
    const wallet = await this.getVendorWalletBalance(vendorId);
    
    if (wallet.available_balance < amount) {
      throw new Error('Insufficient balance for payout');
    }

    // Calculate fee (1.5%)
    const fee = amount * 0.015;
    const netAmount = amount - fee;

    // Create payout request
    const { data, error } = await supabase
      .from('vendor_payout_requests')
      .insert({
        vendor_id: vendorId,
        bank_account_id: bankAccountId,
        amount,
        fee,
        net_amount: netAmount,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create payout request: ${error.message}`);
    }

    // Update wallet to reflect pending payout
    await supabase
      .from('vendor_wallet')
      .update({
        available_balance: wallet.available_balance - amount,
        updated_at: new Date().toISOString(),
      })
      .eq('vendor_id', vendorId);

    return data;
  }

  /**
   * Request rider payout
   */
  async requestRiderPayout(
    riderId: string,
    amount: number,
    bankAccountId: string
  ) {
    // Check available balance
    const wallet = await this.getRiderWalletBalance(riderId);
    
    if (wallet.available_balance < amount) {
      throw new Error('Insufficient balance for payout');
    }

    // Calculate fee (1.5%)
    const fee = amount * 0.015;
    const netAmount = amount - fee;

    // Create payout request
    const { data, error } = await supabase
      .from('rider_payout_requests')
      .insert({
        rider_id: riderId,
        bank_account_id: bankAccountId,
        amount,
        fee,
        net_amount: netAmount,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create payout request: ${error.message}`);
    }

    // Update wallet to reflect pending payout
    await supabase
      .from('rider_wallet')
      .update({
        available_balance: wallet.available_balance - amount,
        updated_at: new Date().toISOString(),
      })
      .eq('rider_id', riderId);

    return data;
  }

  /**
   * Get transaction history for user
   */
  async getTransactionHistory(
    userId: string,
    userType: 'vendor' | 'rider' | 'customer',
    limit = 50
  ) {
    let tableName = '';
    let idField = '';

    switch (userType) {
      case 'vendor':
        tableName = 'vendor_transactions';
        idField = 'vendor_id';
        break;
      case 'rider':
        tableName = 'rider_transactions';
        idField = 'rider_id';
        break;
      case 'customer':
        tableName = 'customer_transactions';
        idField = 'customer_id';
        break;
    }

    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq(idField, userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching transaction history:', error);
      return [];
    }

    return data;
  }

  /**
   * Check if order can be refunded
   */
  async canRefundOrder(orderId: string): Promise<boolean> {
    const { data: order, error } = await supabase
      .from('orders')
      .select('status, payment_status, created_at')
      .eq('id', orderId)
      .single();

    if (error || !order) return false;

    // Can refund if order is not delivered and payment is confirmed
    if (order.status === 'delivered') return false;
    if (order.payment_status !== 'paid') return false;

    // Check if order is within refund window (e.g., 24 hours)
    const orderDate = new Date(order.created_at);
    const now = new Date();
    const hoursSinceOrder = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);

    return hoursSinceOrder <= 24;
  }

  /**
   * Process refund for cancelled order
   */
  async processRefund(orderId: string, reason: string) {
    // Get order and payment hold
    const { data: order } = await supabase
      .from('orders')
      .select('*, payment_holds(*)')
      .eq('id', orderId)
      .single();

    if (!order) {
      throw new Error('Order not found');
    }

    if (!(await this.canRefundOrder(orderId))) {
      throw new Error('Order cannot be refunded');
    }

    // Update payment hold status
    await supabase
      .from('payment_holds')
      .update({
        status: 'refunded',
        updated_at: new Date().toISOString(),
      })
      .eq('order_id', orderId);

    // Create customer transaction for refund
    const transactionId = `REFUND-${order.order_number}-${Date.now()}`;
    await supabase
      .from('customer_transactions')
      .insert({
        customer_id: order.customer_id,
        transaction_id: transactionId,
        type: 'refund',
        amount: order.total_amount,
        status: 'completed',
        description: `Refund for cancelled order ${order.order_number}`,
        reference_id: orderId,
        reference_type: 'order',
        metadata: {
          reason,
          original_payment_reference: order.payment_reference,
        },
        processed_at: new Date().toISOString(),
      });

    // Update order status
    await supabase
      .from('orders')
      .update({
        status: 'cancelled',
        payment_status: 'refunded',
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId);

    console.log(`Refund processed for order ${order.order_number}`);
    return { success: true, transactionId };
  }

  /**
   * Get settlement statistics
   */
  async getSettlementStats(
    userId: string,
    userType: 'vendor' | 'rider',
    period: 'today' | 'week' | 'month' | 'all' = 'all'
  ) {
    let startDate = new Date();
    
    switch (period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'all':
        startDate = new Date(0); // Beginning of time
        break;
    }

    const { data, error } = await supabase
      .from('settlements')
      .select('amount, net_amount, status, created_at')
      .eq('recipient_id', userId)
      .eq('recipient_type', userType)
      .gte('created_at', startDate.toISOString());

    if (error) {
      console.error('Error fetching settlement stats:', error);
      return {
        total_settlements: 0,
        total_amount: 0,
        completed_amount: 0,
        pending_amount: 0,
      };
    }

    const stats = data.reduce(
      (acc, settlement) => {
        acc.total_settlements++;
        acc.total_amount += Number(settlement.amount);
        
        if (settlement.status === 'completed') {
          acc.completed_amount += Number(settlement.net_amount);
        } else if (settlement.status === 'pending') {
          acc.pending_amount += Number(settlement.amount);
        }
        
        return acc;
      },
      {
        total_settlements: 0,
        total_amount: 0,
        completed_amount: 0,
        pending_amount: 0,
      }
    );

    return stats;
  }
}

// Export singleton instance
export const settlementService = new SettlementService();

// Export class for testing
export default SettlementService;

