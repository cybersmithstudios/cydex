import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from 'sonner';
import { settlementService } from '@/services/settlementService';

// Type for database order items (as they come from the database)
interface DBOrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  product_name?: string;
  quantity?: number;
  unit_price?: number;
  total_price?: number;
  product_description?: string | null;
  product_category?: string | null;
  is_eco_friendly?: boolean | null;
  carbon_impact?: number | null;
  created_at?: string;
  weight_kg?: number | null;
  [key: string]: any; // Allow other properties
}

// Type for our application's order items
interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_description: string | null;
  product_category: string | null;
  is_eco_friendly: boolean;
  carbon_impact: number;
  created_at: string;
  weight_kg: number | null;
}

interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface VendorOrder {
  id: string;
  order_number: string;
  customer_id: string;
  vendor_id: string;
  status: string;
  payment_status: string;
  delivery_type: string;
  total_amount: number;
  subtotal: number;
  delivery_fee: number;
  created_at: string;
  updated_at: string;
  delivery_address: any;
  customer: CustomerData;
  order_items: OrderItem[];
  rider_id?: string;
  delivered_at?: string;
  cancelled_at?: string;
  cancel_reason?: string;
  verification_code?: string;
  vendor_accepted_at?: string;
  rider_assigned_at?: string;
  picked_up_at?: string;
  ready_for_pickup_at?: string;
  time_slot?: string;
  special_instructions?: string;
}

export const useVendorOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch orders for the current vendor
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('vendor_id', user.id)
        .eq('payment_status', 'paid')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      
      if (!orders?.length) {
        setOrders([]);
        return;
      }

      // Get order items for all orders
      const orderIds = orders.map(order => order.id);
      const { data: orderItems = [], error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .in('order_id', orderIds);

      if (itemsError) throw itemsError;

      // Get unique customer IDs
      const customerIds = [...new Set(orders
        .map(order => order.customer_id)
        .filter(Boolean) as string[]
      )];

      // Fetch customer profiles
      const customersMap = new Map<string, CustomerData>();
      
      if (customerIds.length > 0) {
        // Define a type for the profile data
        type ProfileData = {
          id: string;
          email?: string | null;
          full_name?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          [key: string]: any; // Allow other properties
        };

        try {
          // Fetch all profile data at once
          const { data: profiles, error: profilesError } = await supabase
            .from('profiles')
            .select('*')
            .in('id', customerIds);

          if (profilesError) {
            console.error('Error fetching profiles:', profilesError);
            throw profilesError;
          }
          
          if (profiles && profiles.length > 0) {
            // Process each profile
            profiles.forEach((profile: ProfileData) => {
              if (!profile?.id) return;
              
              // Extract data with fallbacks
              const id = profile.id;
              const email = profile.email?.trim() || `user-${id.substring(0, 6)}@example.com`;
              
              // Determine the best name to use
              let name = 'Customer';
              if (profile.full_name) {
                name = profile.full_name;
              } else if (profile.first_name || profile.last_name) {
                name = [profile.first_name, profile.last_name].filter(Boolean).join(' ');
              } else if (profile.email) {
                name = profile.email.split('@')[0];
              } else {
                name = `Customer ${id.substring(0, 6)}`;
              }
              
              const phone = profile.phone?.trim() || 'Not provided';
              
              customersMap.set(id, {
                id,
                name: name.trim(),
                email: email.trim(),
                phone
              });
            });
          }
        } catch (error) {
          console.error('Error processing profiles:', error);
          // Continue with empty profiles map if there's an error
          // The fallback in the order processing will handle missing profiles
        }
      }

      // Process and combine all data
      const processedOrders = orders.map(order => {
        // Get or create customer data
        const customer = order.customer_id && customersMap.get(order.customer_id)
          ? customersMap.get(order.customer_id)!
          : {
              id: order.customer_id || 'unknown',
              name: 'Customer',
              email: 'no-email@example.com',
              phone: 'Not provided'
            };

        // Get and transform order items to match the OrderItem interface
        const items = (orderItems as DBOrderItem[])
          .filter(item => item.order_id === order.id)
          .map(item => {
            const orderItem: OrderItem = {
              id: item.id,
              order_id: item.order_id,
              product_id: item.product_id || 'unknown-product',
              product_name: item.product_name || 'Unknown Product',
              quantity: item.quantity ?? 1,
              unit_price: item.unit_price ?? 0,
              total_price: item.total_price ?? 0,
              product_description: item.product_description ?? null,
              product_category: item.product_category ?? null,
              is_eco_friendly: item.is_eco_friendly ?? false,
              carbon_impact: item.carbon_impact ?? 0,
              created_at: item.created_at || new Date().toISOString(),
              weight_kg: item.weight_kg ?? null
            };
            return orderItem;
          });

        return {
          ...order,
          customer,
          order_items: items
        };
      });

      setOrders(processedOrders);
    } catch (err) {
      console.error('Error loading orders:', err);
      setError('Failed to load orders');
      toast.error('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Load orders on mount and when loadOrders changes
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Refresh function
  const refresh = useCallback(() => loadOrders(), [loadOrders]);

  // Update order status
  const updateOrderStatus = useCallback(async (orderId: string, status: string): Promise<boolean> => {
    if (!user?.id) {
      toast.error('You must be logged in to update orders');
      return false;
    }

    try {
      const updateData: any = { 
        status,
        updated_at: new Date().toISOString()
      };

      // Add timestamp fields based on status
      if (status === 'accepted' || status === 'processing') {
        updateData.vendor_accepted_at = new Date().toISOString();
      } else if (status === 'cancelled') {
        updateData.cancelled_at = new Date().toISOString();
        updateData.cancel_reason = 'Order rejected by vendor';
        
        // Process refund to customer wallet when vendor rejects order
        try {
          await settlementService.processRefund(
            orderId,
            'Order rejected by vendor',
            true // Bypass time check for vendor rejections
          );
          toast.success('Order rejected and refund processed. Amount credited to customer wallet.');
        } catch (refundError) {
          console.error('Error processing refund:', refundError);
          // Still update order status even if refund fails
          toast.warning('Order rejected, but refund processing encountered an issue. Please contact support.');
        }
      } else if (status === 'ready_for_pickup') {
        updateData.ready_for_pickup_at = new Date().toISOString();
      }

      // Only update order status if not cancelled (refund already updates it)
      if (status !== 'cancelled') {
        const { error } = await supabase
          .from('orders')
          .update(updateData)
          .eq('id', orderId)
          .eq('vendor_id', user.id); // Ensure vendor can only update their own orders
        
        if (error) {
          console.error('Error updating order status:', error);
          toast.error('Failed to update order status');
          return false;
        }
      }

      if (status !== 'cancelled') {
        toast.success(`Order status updated successfully`);
      }
      
      // Refresh orders to get updated data
      await loadOrders();
      
      return true;
    } catch (error) {
      console.error('Error in updateOrderStatus:', error);
      toast.error('Failed to update order status');
      return false;
    }
  }, [user?.id, loadOrders]);

  return {
    orders,
    loading,
    error,
    refresh,
    updateOrderStatus
  };
};

export default useVendorOrders;
