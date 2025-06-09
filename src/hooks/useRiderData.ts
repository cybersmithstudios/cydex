
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useRiderProfile } from './rider/useRiderProfile';
import { useRiderEarnings } from './rider/useRiderEarnings';
import { useRiderDeliveries } from './rider/useRiderDeliveries';

// Re-export types for backward compatibility
export type { DeliveryData } from './rider/useRiderDeliveries';
export type { RiderEarnings } from './rider/useRiderEarnings';
export type { RiderProfile } from './rider/useRiderProfile';

export const useRiderData = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const { riderProfile, fetchRiderProfile } = useRiderProfile();
  const { todaysEarnings, fetchTodaysEarnings } = useRiderEarnings();
  const { 
    availableDeliveries, 
    currentDeliveries, 
    acceptDelivery, 
    updateDeliveryStatus,
    fetchAvailableDeliveries,
    fetchCurrentDeliveries
  } = useRiderDeliveries();

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
