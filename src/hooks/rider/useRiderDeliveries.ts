
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface DeliveryData {
  id: string;
  order_id: string;
  status: 'available' | 'accepted' | 'picking_up' | 'picked_up' | 'delivering' | 'delivered' | 'cancelled';
  delivery_fee: number;
  eco_bonus: number;
  tip_amount: number;
  estimated_pickup_time: string;
  estimated_delivery_time: string;
  actual_distance: number;
  carbon_saved: number;
  pickup_location: any;
  delivery_location: any;
  special_instructions: string;
  vendor_name?: string;
  customer_name?: string;
  items_count?: number;
  order?: {
    customer_profile?: { name: string };
    vendor_profile?: { name: string };
    order_items?: any[];
    subtotal?: number;
  };
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const useRiderDeliveries = () => {
  const { user } = useAuth();
  const [availableDeliveries, setAvailableDeliveries] = useState<DeliveryData[]>([]);
  const [currentDeliveries, setCurrentDeliveries] = useState<DeliveryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const retryWithBackoff = async <T>(
    operation: () => Promise<T>,
    retries = MAX_RETRIES
  ): Promise<T> => {
    try {
      return await operation();
    } catch (error) {
      if (retries > 0) {
        console.log(`Retrying operation, ${retries} attempts remaining`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (MAX_RETRIES - retries + 1)));
        return retryWithBackoff(operation, retries - 1);
      }
      throw error;
    }
  };

  const fetchAvailableDeliveries = useCallback(async () => {
    if (loading) return; // Prevent concurrent requests
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('[RiderDeliveries] Fetching available deliveries');
      
      const operation = async () => {
        const { data, error } = await supabase
          .from('deliveries')
          .select(`
            *,
            orders!inner(
              customer_id,
              vendor_id,
              subtotal,
              customer_profile:profiles!customer_id(name),
              vendor_profile:profiles!vendor_id(name),
              order_items(count)
            )
          `)
          .eq('status', 'available')
          .is('rider_id', null)
          .order('created_at', { ascending: true })
          .limit(50); // Pagination limit for performance

        if (error) throw error;
        return data;
      };

      const data = await retryWithBackoff(operation);

      const formattedDeliveries = data?.map(delivery => ({
        ...delivery,
        vendor_name: delivery.orders?.vendor_profile?.name || 'Unknown Vendor',
        customer_name: delivery.orders?.customer_profile?.name || 'Unknown Customer',
        items_count: delivery.orders?.order_items?.length || 0,
        order: delivery.orders
      })) || [];

      console.log('[RiderDeliveries] Available deliveries loaded:', formattedDeliveries.length);
      setAvailableDeliveries(formattedDeliveries);
    } catch (error: any) {
      console.error('[RiderDeliveries] Error fetching available deliveries:', error);
      setError('Failed to load available deliveries');
      toast.error('Failed to load available deliveries. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const fetchCurrentDeliveries = useCallback(async () => {
    if (!user?.id) {
      console.log('[RiderDeliveries] No user ID available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('[RiderDeliveries] Fetching current deliveries for rider:', user.id);
      
      const operation = async () => {
        const { data, error } = await supabase
          .from('deliveries')
          .select(`
            *,
            orders!inner(
              customer_id,
              vendor_id,
              subtotal,
              customer_profile:profiles!customer_id(name),
              vendor_profile:profiles!vendor_id(name),
              order_items(count)
            )
          `)
          .eq('rider_id', user.id)
          .in('status', ['accepted', 'picking_up', 'picked_up', 'delivering'])
          .order('accepted_at', { ascending: true });

        if (error) throw error;
        return data;
      };

      const data = await retryWithBackoff(operation);

      const formattedDeliveries = data?.map(delivery => ({
        ...delivery,
        vendor_name: delivery.orders?.vendor_profile?.name || 'Unknown Vendor',
        customer_name: delivery.orders?.customer_profile?.name || 'Unknown Customer',
        items_count: delivery.orders?.order_items?.length || 0,
        order: delivery.orders
      })) || [];

      console.log('[RiderDeliveries] Current deliveries loaded:', formattedDeliveries.length);
      setCurrentDeliveries(formattedDeliveries);
    } catch (error: any) {
      console.error('[RiderDeliveries] Error fetching current deliveries:', error);
      setError('Failed to load current deliveries');
      toast.error('Failed to load current deliveries. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user?.id, loading]);

  const acceptDelivery = useCallback(async (deliveryId: string) => {
    if (!user?.id) {
      toast.error('User not authenticated');
      return false;
    }

    if (!deliveryId) {
      toast.error('Invalid delivery ID');
      return false;
    }

    try {
      console.log('[RiderDeliveries] Accepting delivery:', deliveryId);
      
      const operation = async () => {
        // Direct update approach since RPC function doesn't exist
        const { error: updateError } = await supabase
          .from('deliveries')
          .update({
            rider_id: user.id,
            status: 'accepted',
            accepted_at: new Date().toISOString()
          })
          .eq('id', deliveryId)
          .eq('status', 'available')
          .is('rider_id', null);

        if (updateError) throw updateError;

        // Update the order
        const { error: orderError } = await supabase
          .from('orders')
          .update({ rider_id: user.id })
          .eq('id', deliveryId);

        if (orderError) throw orderError;
      };

      await retryWithBackoff(operation);

      toast.success('Delivery accepted successfully!');
      console.log('[RiderDeliveries] Delivery accepted successfully');
      
      // Refresh data
      await Promise.all([
        fetchAvailableDeliveries(),
        fetchCurrentDeliveries()
      ]);

      return true;
    } catch (error: any) {
      console.error('[RiderDeliveries] Error accepting delivery:', error);
      
      if (error.message?.includes('already accepted')) {
        toast.error('This delivery has already been accepted by another rider');
      } else if (error.message?.includes('not found')) {
        toast.error('Delivery not found or no longer available');
      } else {
        toast.error('Failed to accept delivery. Please try again.');
      }
      
      // Refresh available deliveries to remove stale data
      await fetchAvailableDeliveries();
      return false;
    }
  }, [user?.id, fetchAvailableDeliveries, fetchCurrentDeliveries]);

  const updateDeliveryStatus = useCallback(async (deliveryId: string, status: DeliveryData['status']) => {
    if (!deliveryId || !status) {
      toast.error('Invalid delivery ID or status');
      return false;
    }

    try {
      console.log('[RiderDeliveries] Updating delivery status:', deliveryId, status);
      
      const operation = async () => {
        const updateData: any = { 
          status,
          updated_at: new Date().toISOString()
        };
        
        // Add appropriate timestamps
        if (status === 'picking_up') {
          updateData.picking_up_at = new Date().toISOString();
        } else if (status === 'picked_up') {
          updateData.picked_up_at = new Date().toISOString();
        } else if (status === 'delivering') {
          updateData.delivering_at = new Date().toISOString();
        } else if (status === 'delivered') {
          updateData.delivered_at = new Date().toISOString();
        }

        const { error } = await supabase
          .from('deliveries')
          .update(updateData)
          .eq('id', deliveryId)
          .eq('rider_id', user?.id); // Ensure rider can only update their own deliveries

        if (error) throw error;

        // Update order status as well
        const { error: orderError } = await supabase
          .from('orders')
          .update({ 
            status,
            updated_at: new Date().toISOString()
          })
          .eq('id', deliveryId);

        if (orderError) throw orderError;
      };

      await retryWithBackoff(operation);

      toast.success(`Delivery status updated to ${status.replace('_', ' ')}`);
      console.log('[RiderDeliveries] Status updated successfully');
      
      // Refresh current deliveries
      await fetchCurrentDeliveries();
      return true;
    } catch (error: any) {
      console.error('[RiderDeliveries] Error updating delivery status:', error);
      toast.error('Failed to update delivery status. Please try again.');
      return false;
    }
  }, [user?.id, fetchCurrentDeliveries]);

  return {
    availableDeliveries,
    currentDeliveries,
    loading,
    error,
    acceptDelivery,
    updateDeliveryStatus,
    fetchAvailableDeliveries,
    fetchCurrentDeliveries,
    refetch: {
      availableDeliveries: fetchAvailableDeliveries,
      currentDeliveries: fetchCurrentDeliveries
    }
  };
};
