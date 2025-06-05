import { useEffect, useState } from 'react';
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

export const useCustomerOrders = () => {
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      // Fetch orders with related items and vendor details
      const { data: ordersData, error: ordersError } = await supabase
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
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      setOrders(ordersData as Order[]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch orders';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Subscribe to real-time updates
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('orders_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `customer_id=eq.${user.id}`
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  // Initial fetch
  useEffect(() => {
    fetchOrders();
  }, [user?.id]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders
  };
}; 