
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface VehicleInfo {
  type: string;
  model: string;
  year: string;
  color: string;
  licensePlate: string;
  registration: string;
}

export interface DocumentInfo {
  idCard: {
    verified: boolean;
    expiryDate: string;
    documentUrl?: string;
  };
  driverLicense: {
    verified: boolean;
    expiryDate: string;
    documentUrl?: string;
  };
  insurance: {
    verified: boolean;
    expiryDate: string;
    documentUrl?: string;
  };
}

export interface RiderProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  joinDate: string;
  vehicle: VehicleInfo;
  documents: DocumentInfo;
  bankDetails: {
    bank: string;
    accountNumber: string;
    accountName: string;
    bvn: string;
  };
  preferences: {
    deliveryPreferences: {
      maxDistance: number;
      preferredZones: string[];
      availableDays: string[];
    };
    notifications: {
      app: boolean;
      email: boolean;
      sms: boolean;
      marketing: boolean;
    };
  };
  stats: {
    rating: number;
    reviews: number;
    completedDeliveries: number;
    totalDistance: number;
    carbonSaved: number;
    sustainabilityScore: number;
  };
}

export interface ReviewData {
  id: string;
  customer: string;
  date: string;
  rating: number;
  comment: string;
}

export interface AchievementData {
  id: string;
  title: string;
  description: string;
  progress: number;
  earnedDate?: string;
  icon: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const useRiderProfileData = () => {
  const { user } = useAuth();
  const [riderProfile, setRiderProfile] = useState<RiderProfileData | null>(null);
  const [recentReviews, setRecentReviews] = useState<ReviewData[]>([]);
  const [achievements, setAchievements] = useState<AchievementData[]>([]);
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
        console.log(`Retrying profile operation, ${retries} attempts remaining`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (MAX_RETRIES - retries + 1)));
        return retryWithBackoff(operation, retries - 1);
      }
      throw error;
    }
  };

  const fetchRiderProfile = useCallback(async () => {
    if (!user?.id) {
      console.log('[RiderProfile] No user ID available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('[RiderProfile] Fetching rider profile for:', user.id);

      // Fetch profile data
      const profileOperation = async () => {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        return profile;
      };

      // Fetch rider-specific data
      const riderOperation = async () => {
        const { data: riderData, error: riderError } = await supabase
          .from('rider_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (riderError && riderError.code !== 'PGRST116') throw riderError;
        return riderData;
      };

      // Fetch delivery stats
      const statsOperation = async () => {
        const { data: deliveries, error: deliveriesError } = await supabase
          .from('deliveries')
          .select('*')
          .eq('rider_id', user.id)
          .eq('status', 'delivered');

        if (deliveriesError) throw deliveriesError;
        return deliveries || [];
      };

      const [profileData, riderData, deliveriesData] = await Promise.all([
        retryWithBackoff(profileOperation),
        retryWithBackoff(riderOperation),
        retryWithBackoff(statsOperation)
      ]);

      // Calculate stats from real data
      const totalDeliveries = deliveriesData.length;
      const totalDistance = deliveriesData.reduce((sum, d) => sum + (Number(d.actual_distance) || 0), 0);
      const carbonSaved = deliveriesData.reduce((sum, d) => sum + (Number(d.carbon_saved) || 0), 0);

      const transformedProfile: RiderProfileData = {
        id: profileData.id,
        name: String(profileData.name || 'Rider'),
        email: String(profileData.email || ''),
        phone: String(profileData.phone || ''),
        address: String(profileData.address || ''),
        avatar: profileData.avatar ? String(profileData.avatar) : undefined,
        joinDate: new Date(profileData.created_at).toLocaleDateString(),
        vehicle: {
          type: String(riderData?.vehicle_type || 'walking'),
          model: 'Eco-friendly Transport',
          year: '2023',
          color: 'Green',
          licensePlate: String(riderData?.license_number || 'N/A'),
          registration: String(riderData?.vehicle_registration || 'N/A')
        },
        documents: {
          idCard: {
            verified: false,
            expiryDate: '2025-12-31'
          },
          driverLicense: {
            verified: false,
            expiryDate: '2025-12-31'
          },
          insurance: {
            verified: false,
            expiryDate: '2025-12-31'
          }
        },
        bankDetails: {
          bank: '',
          accountNumber: '',
          accountName: '',
          bvn: ''
        },
        preferences: {
          deliveryPreferences: {
            maxDistance: 15,
            preferredZones: [],
            availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          },
          notifications: {
            app: true,
            email: true,
            sms: false,
            marketing: false
          }
        },
        stats: {
          rating: 0,
          reviews: 0,
          completedDeliveries: totalDeliveries,
          totalDistance: Math.round(totalDistance),
          carbonSaved: Math.round(carbonSaved),
          sustainabilityScore: 0
        }
      };

      console.log('[RiderProfile] Profile loaded successfully');
      setRiderProfile(transformedProfile);

    } catch (error: any) {
      console.error('[RiderProfile] Error fetching profile:', error);
      setError('Failed to load profile data');
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const fetchRecentReviews = useCallback(async () => {
    if (!user?.id) return;

    try {
      // Empty reviews for new riders
      setRecentReviews([]);
    } catch (error) {
      console.error('[RiderProfile] Error fetching reviews:', error);
    }
  }, [user?.id]);

  const fetchAchievements = useCallback(async () => {
    if (!user?.id) return;

    try {
      // Empty achievements for new riders
      setAchievements([]);
    } catch (error) {
      console.error('[RiderProfile] Error fetching achievements:', error);
    }
  }, [user?.id]);

  const updateProfile = async (updates: Partial<RiderProfileData>) => {
    if (!user?.id) return false;

    try {
      setLoading(true);

      // Update profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: updates.name,
          phone: updates.phone,
          address: updates.address,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Update rider_profiles table if needed
      if (updates.vehicle) {
        const { error: riderError } = await supabase
          .from('rider_profiles')
          .update({
            vehicle_type: updates.vehicle.type,
            license_number: updates.vehicle.licensePlate,
            vehicle_registration: updates.vehicle.registration,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (riderError) throw riderError;
      }

      toast.success('Profile updated successfully');
      await fetchRiderProfile();
      return true;
    } catch (error: any) {
      console.error('[RiderProfile] Error updating profile:', error);
      toast.error('Failed to update profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id && user?.role === 'RIDER') {
      fetchRiderProfile();
      fetchRecentReviews();
      fetchAchievements();
    }
  }, [user?.id, user?.role, fetchRiderProfile, fetchRecentReviews, fetchAchievements]);

  return {
    riderProfile,
    recentReviews,
    achievements,
    loading,
    error,
    updateProfile,
    refetchProfile: fetchRiderProfile
  };
};
