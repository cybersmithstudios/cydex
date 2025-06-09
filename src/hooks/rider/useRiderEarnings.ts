
import { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface RiderEarnings {
  delivery_fee: number;
  eco_bonus: number;
  tip_amount: number;
  total_earnings: number;
  earnings_date: string;
  carbon_credits_earned: number;
}

export const useRiderEarnings = () => {
  const { user } = useAuth();
  const [todaysEarnings, setTodaysEarnings] = useState<RiderEarnings[]>([]);

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

  return {
    todaysEarnings,
    fetchTodaysEarnings,
    refetchEarnings: fetchTodaysEarnings
  };
};
