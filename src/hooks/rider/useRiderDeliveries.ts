
import { useState } from 'react';
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

export const useRiderDeliveries = () => {
  const { user } = useAuth();
  const [availableDeliveries, setAvailableDeliveries] = useState<DeliveryData[]>([]);
  const [currentDeliveries, setCurrentDeliveries] = useState<DeliveryData[]>([]);

  const fetchAvailableDeliveries = async () => {
    try {
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
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedDeliveries = data?.map(delivery => ({
        ...delivery,
        vendor_name: delivery.orders?.vendor_profile?.name || 'Unknown Vendor',
        customer_name: delivery.orders?.customer_profile?.name || 'Unknown Customer',
        items_count: delivery.orders?.order_items?.length || 0,
        order: delivery.orders
      })) || [];

      setAvailableDeliveries(formattedDeliveries);
    } catch (error) {
      console.error('Error fetching available deliveries:', error);
      toast.error('Failed to load available deliveries');
    }
  };

  const fetchCurrentDeliveries = async () => {
    if (!user?.id) return;

    try {
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

      const formattedDeliveries = data?.map(delivery => ({
        ...delivery,
        vendor_name: delivery.orders?.vendor_profile?.name || 'Unknown Vendor',
        customer_name: delivery.orders?.customer_profile?.name || 'Unknown Customer',
        items_count: delivery.orders?.order_items?.length || 0,
        order: delivery.orders
      })) || [];

      setCurrentDeliveries(formattedDeliveries);
    } catch (error) {
      console.error('Error fetching current deliveries:', error);
      toast.error('Failed to load current deliveries');
    }
  };

  const acceptDelivery = async (deliveryId: string) => {
    if (!user?.id) return false;

    try {
      const { error } = await supabase
        .from('deliveries')
        .update({
          rider_id: user.id,
          status: 'accepted',
          accepted_at: new Date().toISOString()
        })
        .eq('id', deliveryId)
        .eq('status', 'available')
        .is('rider_id', null);

      if (error) throw error;

      // Also update the order with rider assignment
      const { error: orderError } = await supabase
        .from('orders')
        .update({ rider_id: user.id })
        .eq('id', deliveryId);

      if (orderError) throw orderError;

      toast.success('Delivery accepted successfully!');
      
      // Refresh data
      await Promise.all([
        fetchAvailableDeliveries(),
        fetchCurrentDeliveries()
      ]);

      return true;
    } catch (error) {
      console.error('Error accepting delivery:', error);
      toast.error('Failed to accept delivery');
      return false;
    }
  };

  const updateDeliveryStatus = async (deliveryId: string, status: DeliveryData['status']) => {
    try {
      const updateData: any = { status };
      
      // Add timestamp for status changes
      if (status === 'picked_up') {
        updateData.picked_up_at = new Date().toISOString();
      } else if (status === 'delivered') {
        updateData.delivered_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('deliveries')
        .update(updateData)
        .eq('id', deliveryId);

      if (error) throw error;

      // Update order status as well
      const { error: orderError } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', deliveryId);

      if (orderError) throw orderError;

      toast.success(`Delivery status updated to ${status}`);
      
      // Refresh data
      await fetchCurrentDeliveries();

      return true;
    } catch (error) {
      console.error('Error updating delivery status:', error);
      toast.error('Failed to update delivery status');
      return false;
    }
  };

  return {
    availableDeliveries,
    currentDeliveries,
    acceptDelivery,
    updateDeliveryStatus,
    fetchAvailableDeliveries,
    fetchCurrentDeliveries
  };
};
