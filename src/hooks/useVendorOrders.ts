
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from 'sonner';

export interface VendorOrder {
  id: string;
  order_number: string;
  customer_id: string;
  vendor_id: string;
  rider_id?: string;
  status: string;
  payment_status: string;
  delivery_type: string;
  total_amount: number;
  subtotal: number;
  delivery_fee: number;
  created_at: string;
  updated_at: string;
  delivered_at?: string;
  cancelled_at?: string;
  cancel_reason?: string;
  verification_code?: string;
  vendor_accepted_at?: string;
  rider_assigned_at?: string;
  picked_up_at?: string;
  ready_for_pickup_at?: string;
  delivery_address: any;
  time_slot?: string;
  special_instructions?: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  rider?: {
    name: string;
    email: string;
    phone?: string;
  };
  order_items: Array<{
    id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    product_description?: string;
    product_category?: string;
    is_eco_friendly: boolean;
    carbon_impact: number;
  }>;
}

export const useVendorOrders = () => {
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchOrders = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('orders')
        .select(`
          *,
          customer:profiles!orders_customer_id_fkey(name, email, phone),
          rider:profiles!orders_rider_id_fkey(name, email, phone),
          order_items(*)
        `)
        .eq('vendor_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching vendor orders:', fetchError);
        throw fetchError;
      }

      // Transform the data to match our interface
      const transformedOrders: VendorOrder[] = (data || []).map((order: any) => ({
        ...order,
        customer: {
          name: order.customer?.name || 'Unknown Customer',
          email: order.customer?.email || 'unknown@email.com',
          phone: order.customer?.phone || undefined,
        },
        rider: order.rider ? {
          name: order.rider.name || 'Unknown Rider',
          email: order.rider.email || 'unknown@email.com',
          phone: order.rider.phone || undefined,
        } : undefined,
        order_items: (order.order_items || []).map((item: any) => ({
          ...item,
          is_eco_friendly: item.is_eco_friendly ?? true,
          carbon_impact: item.carbon_impact ?? 0
        })),
      }));

      setOrders(transformedOrders);
    } catch (err: any) {
      console.error('Error in fetchOrders:', err);
      setError(err.message || 'Failed to fetch orders');
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const updateData: any = { 
        status: newStatus,
        updated_at: new Date().toISOString()
      };

      // Add timestamp fields based on status
      if (newStatus === 'delivered') {
        updateData.delivered_at = new Date().toISOString();
      } else if (newStatus === 'cancelled') {
        updateData.cancelled_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)
        .eq('vendor_id', user?.id);

      if (error) throw error;

      // Refresh orders after update
      await fetchOrders();
      toast.success(`Order status updated to ${newStatus}`);
      return true;
    } catch (error: any) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
      return false;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user?.id]);

  // Set up real-time subscription for order updates
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('vendor-orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `vendor_id=eq.${user.id}`
        },
        () => {
          console.log('Order updated, refreshing...');
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
    updateOrderStatus
  };
};
