
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from 'sonner';

export interface VendorStats {
  total_orders: number;
  total_revenue: number;
  total_carbon_saved: number;
  recycling_rate: number;
  rating: number;
  updated_at: string;
}

export const useVendorStats = () => {
  const [stats, setStats] = useState<VendorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchStats = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // First, try to get existing stats
      let { data: existingStats, error: fetchError } = await supabase
        .from('vendor_stats')
        .select('*')
        .eq('vendor_id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      // If no stats exist, create initial stats
      if (!existingStats) {
        const { data: newStats, error: insertError } = await supabase
          .from('vendor_stats')
          .insert({
            vendor_id: user.id,
            total_orders: 0,
            total_revenue: 0,
            total_carbon_saved: 0,
            recycling_rate: 0,
            rating: 0
          })
          .select()
          .single();

        if (insertError) throw insertError;
        existingStats = newStats;
      }

      setStats(existingStats);
    } catch (err: any) {
      console.error('Error fetching vendor stats:', err);
      setError(err.message || 'Failed to fetch stats');
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [user?.id]);

  // Set up real-time subscription for stats updates
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('vendor-stats-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'vendor_stats',
          filter: `vendor_id=eq.${user.id}`
        },
        () => {
          console.log('Stats updated, refreshing...');
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};
