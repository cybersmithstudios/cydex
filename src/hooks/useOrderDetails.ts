
import { useState, useEffect } from 'react';
import { useSupabase } from '@/contexts/SupabaseContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from 'sonner';
import { Order } from './useCustomerOrders';

export const useOrderDetails = (orderId: string) => {
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderDetails = async () => {
    if (!user?.id || !orderId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select(`
          *,
          vendor:profiles!orders_vendor_id_fkey (
            name,
            email,
            phone,
            avatar
          ),
          rider:profiles!orders_rider_id_fkey (
            name,
            email,
            phone,
            avatar
          ),
          order_items (
            id,
            product_name,
            product_description,
            product_category,
            quantity,
            unit_price,
            total_price,
            is_eco_friendly,
            carbon_impact
          )
        `)
        .eq('id', orderId)
        .single();

      if (orderError) throw orderError;

      setOrder(orderData as Order);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch order details';
      setError(errorMessage);
      console.error('Error fetching order details:', err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Subscribe to real-time updates for this specific order
  useEffect(() => {
    if (!user?.id || !orderId) return;

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
  }, [user?.id, orderId]);

  // Initial fetch
  useEffect(() => {
    fetchOrderDetails();
  }, [user?.id, orderId]);

  return {
    order,
    loading,
    error,
    refetch: fetchOrderDetails
  };
};
