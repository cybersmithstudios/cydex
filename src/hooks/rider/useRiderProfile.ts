
import { useState, useEffect } from 'react';
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
  current_location?: any;
  license_number?: string;
  vehicle_registration?: string;
  created_at?: string;
  updated_at?: string;
}

export const useRiderProfile = () => {
  const { user } = useAuth();
  const [riderProfile, setRiderProfile] = useState<RiderProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRiderProfile = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      console.log('Fetching rider profile for user:', user.id);
      
      const { data, error } = await supabase
        .from('rider_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.log('Profile fetch error:', error);
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          console.log('Creating new rider profile...');
          const { data: newProfile, error: createError } = await supabase
            .from('rider_profiles')
            .insert({
              id: user.id,
              rider_status: 'offline',
              vehicle_type: 'bicycle',
              rating: 0,
              total_deliveries: 0,
              is_verified: false
            })
            .select()
            .single();

          if (createError) {
            console.error('Error creating rider profile:', createError);
            throw createError;
          }
          
          console.log('Created new rider profile:', newProfile);
          setRiderProfile(newProfile);
          toast.success('Rider profile created successfully!');
        } else {
          throw error;
        }
      } else {
        console.log('Rider profile loaded:', data);
        setRiderProfile(data);
      }
    } catch (error: any) {
      console.error('Error with rider profile:', error);
      toast.error('Failed to load rider profile');
    } finally {
      setLoading(false);
    }
  };

  const updateRiderStatus = async (status: RiderProfile['rider_status']) => {
    if (!user?.id) return false;

    try {
      console.log('Updating rider status to:', status);
      
      const { error } = await supabase
        .from('rider_profiles')
        .update({ 
          rider_status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      setRiderProfile(prev => prev ? { ...prev, rider_status: status } : null);
      toast.success(`Status updated to ${status}`);
      return true;
    } catch (error: any) {
      console.error('Error updating rider status:', error);
      toast.error('Failed to update status');
      return false;
    }
  };

  // Auto-fetch when user changes
  useEffect(() => {
    if (user?.id && user?.role === 'RIDER') {
      fetchRiderProfile();
    }
  }, [user?.id, user?.role]);

  return {
    riderProfile,
    loading,
    fetchRiderProfile,
    updateRiderStatus,
    refetchProfile: fetchRiderProfile
  };
};
