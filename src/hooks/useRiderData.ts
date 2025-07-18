
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
  
  const { 
    riderProfile, 
    loading: profileLoading, 
    fetchRiderProfile, 
    updateRiderStatus 
  } = useRiderProfile();
  
  const { 
    todaysEarnings, 
    weeklyEarnings, 
    monthlyEarnings, 
    fetchTodaysEarnings, 
    fetchWeeklyEarnings, 
    fetchMonthlyEarnings 
  } = useRiderEarnings();
  
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
        console.log('Initializing rider data for user:', user.id);
        setLoading(true);
        
        try {
          await Promise.all([
            fetchAvailableDeliveries(),
            fetchCurrentDeliveries(),
            fetchTodaysEarnings(),
            fetchWeeklyEarnings(),
            fetchMonthlyEarnings()
          ]);
        } catch (error) {
          console.error('Error initializing rider data:', error);
        }
        
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    initializeData();

    // Set up real-time subscriptions only if user is a rider
    if (user?.id && user?.role === 'RIDER') {
      console.log('Setting up real-time subscriptions for rider:', user.id);
      
      const deliverySubscription = supabase
        .channel('deliveries_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'deliveries'
          },
          (payload) => {
            console.log('Delivery change detected:', payload);
            fetchAvailableDeliveries();
            fetchCurrentDeliveries();
          }
        )
        .subscribe();

      const earningsSubscription = supabase
        .channel('earnings_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'rider_earnings'
          },
          (payload) => {
            console.log('Earnings change detected:', payload);
            fetchTodaysEarnings();
            fetchWeeklyEarnings();
            fetchMonthlyEarnings();
          }
        )
        .subscribe();

      return () => {
        console.log('Cleaning up real-time subscriptions');
        deliverySubscription.unsubscribe();
        earningsSubscription.unsubscribe();
      };
    }
  }, [user?.id, user?.role]);

  return {
    loading: loading || profileLoading,
    availableDeliveries,
    currentDeliveries,
    todaysEarnings,
    weeklyEarnings,
    monthlyEarnings,
    riderProfile,
    acceptDelivery,
    updateDeliveryStatus,
    updateRiderStatus,
    refetch: {
      availableDeliveries: fetchAvailableDeliveries,
      currentDeliveries: fetchCurrentDeliveries,
      todaysEarnings: fetchTodaysEarnings,
      weeklyEarnings: fetchWeeklyEarnings,
      monthlyEarnings: fetchMonthlyEarnings,
      riderProfile: fetchRiderProfile
    }
  };
};
