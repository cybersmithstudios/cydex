
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
  const [weeklyEarnings, setWeeklyEarnings] = useState<RiderEarnings[]>([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState<RiderEarnings[]>([]);

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

  const fetchWeeklyEarnings = async () => {
    if (!user?.id) return;

    try {
      const today = new Date();
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
      
      const { data, error } = await supabase
        .from('rider_earnings')
        .select('*')
        .eq('rider_id', user.id)
        .gte('earnings_date', weekStart.toISOString().split('T')[0]);

      if (error) throw error;

      setWeeklyEarnings(data || []);
    } catch (error) {
      console.error('Error fetching weekly earnings:', error);
      toast.error('Failed to load weekly earnings');
    }
  };

  const fetchMonthlyEarnings = async () => {
    if (!user?.id) return;

    try {
      const today = new Date();
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      
      const { data, error } = await supabase
        .from('rider_earnings')
        .select('*')
        .eq('rider_id', user.id)
        .gte('earnings_date', monthStart.toISOString().split('T')[0]);

      if (error) throw error;

      setMonthlyEarnings(data || []);
    } catch (error) {
      console.error('Error fetching monthly earnings:', error);
      toast.error('Failed to load monthly earnings');
    }
  };

  return {
    todaysEarnings,
    weeklyEarnings,
    monthlyEarnings,
    fetchTodaysEarnings,
    fetchWeeklyEarnings,
    fetchMonthlyEarnings,
    refetchEarnings: fetchTodaysEarnings
  };
};
