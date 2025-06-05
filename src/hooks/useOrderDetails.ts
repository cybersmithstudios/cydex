import { useState, useEffect, useCallback } from 'react';
import { useSupabase } from '@/contexts/SupabaseContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from 'sonner';

interface OrderItem {
  id: string;
  order_id: string;
  product_name: string;
  product_description: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_category: string | null;
  is_eco_friendly: boolean;
  carbon_impact: number;
}

interface Order {
  id: string;
  customer_id: string;
  rider_id: string | null;
  vendor_id: string | null;
  order_number: string;
  status: 'pending' | 'processing' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'refunded';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: 'wallet' | 'card' | 'cash' | 'bank_transfer' | null;
  delivery_type: 'standard' | 'express' | 'scheduled';
  delivery_address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code?: string;
  };
  delivery_fee: number;
  subtotal: number;
  total_amount: number;
  carbon_credits_earned: number;
  time_slot: string | null;
  special_instructions: string | null;
  estimated_delivery_time: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
  cancel_reason: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
  vendor?: {
    name: string;
    email: string;
  };
  rider?: {
    name: string;
    email: string;
    phone: string | null;
  };
}

export const useOrderDetails = (orderId: string | undefined) => {
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!orderId) {
        throw new Error('Order ID is required');
      }

      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      // Fetch order with related items, vendor, and rider details
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*),
          vendor:profiles!orders_vendor_id_fkey (
            name,
            email
          ),
          rider:profiles!orders_rider_id_fkey (
            name,
            email,
            phone
          )
        `)
        .eq('id', orderId)
        .eq('customer_id', user.id)
        .single();

      if (orderError) {
        if (orderError.code === 'PGRST116') {
          throw new Error('Order not found or you do not have permission to view this order');
        }
        throw orderError;
      }

      setOrder(orderData as Order);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch order details';
      setError(errorMessage);
      console.error('Error fetching order details:', err);
    } finally {
      setLoading(false);
    }
  }, [orderId, user?.id, supabase]);

  // Subscribe to real-time updates for this order
  useEffect(() => {
    if (!orderId || !user?.id) return;

    const channel = supabase
      .channel(`order_${orderId}_channel`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`
        },
        () => {
          fetchOrderDetails();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId, user?.id, supabase, fetchOrderDetails]);

  // Initial fetch
  useEffect(() => {
    if (orderId && user?.id) {
      fetchOrderDetails();
    } else {
      setLoading(false);
      if (!orderId) {
        setError('Order ID is required');
      } else if (!user?.id) {
        setError('User not authenticated');
      }
    }
  }, [orderId, user?.id, fetchOrderDetails]);

  return { 
    order, 
    loading, 
    error,
    refetch: fetchOrderDetails
  };
};
