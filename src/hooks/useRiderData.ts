
import { useState, useEffect } from 'react';
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
}

export interface RiderEarnings {
  delivery_fee: number;
  eco_bonus: number;
  tip_amount: number;
  total_earnings: number;
  earnings_date: string;
  carbon_credits_earned: number;
}

export interface RiderProfile {
  id: string;
  rider_status: 'offline' | 'available' | 'busy' | 'break';
  vehicle_type: string;
  rating: number;
  total_deliveries: number;
  is_verified: boolean;
}

export const useRiderData = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [availableDeliveries, setAvailableDeliveries] = useState<DeliveryData[]>([]);
  const [currentDeliveries, setCurrentDeliveries] = useState<DeliveryData[]>([]);
  const [todaysEarnings, setTodaysEarnings] = useState<RiderEarnings[]>([]);
  const [riderProfile, setRiderProfile] = useState<RiderProfile | null>(null);

  const fetchAvailableDeliveries = async () => {
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .select(`
          *,
          orders!inner(
            customer_id,
            vendor_id,
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
        items_count: delivery.orders?.order_items?.length || 0
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
        items_count: delivery.orders?.order_items?.length || 0
      })) || [];

      setCurrentDeliveries(formattedDeliveries);
    } catch (error) {
      console.error('Error fetching current deliveries:', error);
      toast.error('Failed to load current deliveries');
    }
  };

  const fetchTodaysEarnings = async () => {
    if (!user?.id) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('rider_earnings')
        .select('*')
        .eq('rider_id', user.id)
        .eq('earnings_date', today);

      if (error) throw error;

      setTodaysEarnings(data || []);
    } catch (error) {
      console.error('Error fetching earnings:', error);
      toast.error('Failed to load earnings');
    }
  };

  const fetchRiderProfile = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('rider_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          const { data: newProfile, error: createError } = await supabase
            .from('rider_profiles')
            .insert({
              id: user.id,
              rider_status: 'available',
              vehicle_type: 'bicycle',
              rating: 0,
              total_deliveries: 0,
              is_verified: false
            })
            .select()
            .single();

          if (createError) throw createError;
          setRiderProfile(newProfile);
        } else {
          throw error;
        }
      } else {
        setRiderProfile(data);
      }
    } catch (error) {
      console.error('Error fetching rider profile:', error);
      toast.error('Failed to load rider profile');
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

      toast.success(`Delivery status updated to ${status}`);
      
      // Refresh data
      await Promise.all([
        fetchCurrentDeliveries(),
        fetchTodaysEarnings()
      ]);

      return true;
    } catch (error) {
      console.error('Error updating delivery status:', error);
      toast.error('Failed to update delivery status');
      return false;
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      if (user?.id && user?.role === 'RIDER') {
        setLoading(true);
        
        await Promise.all([
          fetchRiderProfile(),
          fetchAvailableDeliveries(),
          fetchCurrentDeliveries(),
          fetchTodaysEarnings()
        ]);
        
        setLoading(false);
      }
    };

    initializeData();

    // Set up real-time subscriptions
    const deliverySubscription = supabase
      .channel('deliveries_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'deliveries'
        },
        () => {
          // Refresh deliveries when changes occur
          fetchAvailableDeliveries();
          fetchCurrentDeliveries();
        }
      )
      .subscribe();

    return () => {
      deliverySubscription.unsubscribe();
    };
  }, [user?.id, user?.role]);

  return {
    loading,
    availableDeliveries,
    currentDeliveries,
    todaysEarnings,
    riderProfile,
    acceptDelivery,
    updateDeliveryStatus,
    refetch: {
      availableDeliveries: fetchAvailableDeliveries,
      currentDeliveries: fetchCurrentDeliveries,
      todaysEarnings: fetchTodaysEarnings,
      riderProfile: fetchRiderProfile
    }
  };
};
