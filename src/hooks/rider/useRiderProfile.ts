
import { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface RiderProfile {
  id: string;
  rider_status: 'offline' | 'available' | 'busy' | 'break';
  vehicle_type: string;
  rating: number;
  total_deliveries: number;
  is_verified: boolean;
}

export const useRiderProfile = () => {
  const { user } = useAuth();
  const [riderProfile, setRiderProfile] = useState<RiderProfile | null>(null);

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

  return {
    riderProfile,
    fetchRiderProfile,
    refetchProfile: fetchRiderProfile
  };
};
