
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

export interface BankDetail {
  id: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  bvn?: string;
  is_verified: boolean;
  is_default: boolean;
}

export interface ReviewData {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  delivery_rating: number;
  communication_rating: number;
  created_at: string;
}

export interface AchievementData {
  id: string;
  title: string;
  description: string;
  achievement_type: string;
  progress: number;
  target: number;
  earned_date?: string;
  icon: string;
}

export interface RiderProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  joinDate: string;
  isOnline: boolean;
  isVerified: boolean;
  verificationStatus: string;
  vehicle: VehicleInfo;
  documents: DocumentInfo;
  bankDetails: BankDetail[];
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

      // Fetch bank details
      const bankOperation = async () => {
        const { data: bankDetails, error: bankError } = await supabase
          .from('rider_bank_details')
          .select('*')
          .eq('rider_id', user.id)
          .order('created_at', { ascending: false });

        if (bankError) throw bankError;
        return bankDetails || [];
      };

      const [profileData, riderData, deliveriesData, bankDetailsData] = await Promise.all([
        retryWithBackoff(profileOperation),
        retryWithBackoff(riderOperation),
        retryWithBackoff(statsOperation),
        retryWithBackoff(bankOperation)
      ]);

      // Calculate stats from real data
      const totalDeliveries = deliveriesData.length;
      const totalDistance = deliveriesData.reduce((sum, d) => sum + (Number(d.actual_distance) || 0), 0);
      const carbonSaved = deliveriesData.reduce((sum, d) => sum + (Number(d.carbon_saved) || 0), 0);

      // Parse preferences safely with type assertions
      const deliveryPrefs = riderData?.delivery_preferences as any || {};
      const notificationPrefs = riderData?.notification_preferences as any || {};

      const transformedProfile: RiderProfileData = {
        id: profileData.id,
        name: String(profileData.name || 'Rider'),
        email: String(profileData.email || ''),
        phone: String(profileData.phone || ''),
        address: String(profileData.address || ''),
        avatar: profileData.avatar ? String(profileData.avatar) : undefined,
        joinDate: new Date(profileData.created_at).toLocaleDateString(),
        isOnline: riderData?.rider_status === 'available',
        isVerified: riderData?.verification_status === 'verified',
        verificationStatus: String(riderData?.verification_status || 'pending'),
        vehicle: {
          type: String(riderData?.vehicle_type || 'walking'),
          model: riderData?.vehicle_type === 'walking' ? 'On Foot' : 'Eco-friendly Transport',
          year: riderData?.vehicle_type === 'walking' ? 'N/A' : '2023',
          color: riderData?.vehicle_type === 'walking' ? 'N/A' : 'Green',
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
        bankDetails: bankDetailsData.map(bank => ({
          id: bank.id,
          bank_name: bank.bank_name,
          account_number: bank.account_number,
          account_name: bank.account_name,
          bvn: bank.bvn,
          is_verified: bank.is_verified,
          is_default: bank.is_default
        })),
        preferences: {
          deliveryPreferences: {
            maxDistance: Number(deliveryPrefs.max_distance || 15),
            preferredZones: Array.isArray(deliveryPrefs.preferred_zones) ? deliveryPrefs.preferred_zones : [],
            availableDays: Array.isArray(deliveryPrefs.available_days) ? deliveryPrefs.available_days : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          },
          notifications: {
            app: Boolean(notificationPrefs.app !== false),
            email: Boolean(notificationPrefs.email !== false),
            sms: Boolean(notificationPrefs.sms === true),
            marketing: Boolean(notificationPrefs.marketing === true)
          }
        },
        stats: {
          rating: Number(riderData?.rating) || 0,
          reviews: 0, // Will be calculated from reviews
          completedDeliveries: totalDeliveries,
          totalDistance: Math.round(totalDistance),
          carbonSaved: Math.round(carbonSaved),
          sustainabilityScore: Math.min(100, Math.round(carbonSaved / 10))
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
      const { data: reviewsData, error } = await supabase
        .from('rider_reviews')
        .select(`
          *,
          customer:profiles!customer_id(name)
        `)
        .eq('rider_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const formattedReviews: ReviewData[] = (reviewsData || []).map(review => ({
        id: review.id,
        customer_name: review.customer?.name || 'Anonymous',
        rating: review.rating,
        comment: review.comment || '',
        delivery_rating: review.delivery_rating || review.rating,
        communication_rating: review.communication_rating || review.rating,
        created_at: new Date(review.created_at).toLocaleDateString()
      }));

      setRecentReviews(formattedReviews);

      // Update review count in profile
      if (riderProfile) {
        setRiderProfile(prev => prev ? {
          ...prev,
          stats: { ...prev.stats, reviews: formattedReviews.length }
        } : null);
      }
    } catch (error) {
      console.error('[RiderProfile] Error fetching reviews:', error);
    }
  }, [user?.id, riderProfile]);

  const fetchAchievements = useCallback(async () => {
    if (!user?.id) return;

    try {
      const { data: achievementsData, error } = await supabase
        .from('rider_achievements')
        .select('*')
        .eq('rider_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedAchievements: AchievementData[] = (achievementsData || []).map(achievement => ({
        id: achievement.id,
        title: achievement.title,
        description: achievement.description || '',
        achievement_type: achievement.achievement_type,
        progress: achievement.progress,
        target: achievement.target,
        earned_date: achievement.earned_date ? new Date(achievement.earned_date).toLocaleDateString() : undefined,
        icon: achievement.icon
      }));

      setAchievements(formattedAchievements);
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
      if (updates.vehicle || updates.preferences) {
        const updateData: any = {
          updated_at: new Date().toISOString()
        };

        if (updates.vehicle) {
          updateData.vehicle_type = updates.vehicle.type;
          updateData.license_number = updates.vehicle.licensePlate;
          updateData.vehicle_registration = updates.vehicle.registration;
        }

        if (updates.preferences) {
          if (updates.preferences.deliveryPreferences) {
            updateData.delivery_preferences = updates.preferences.deliveryPreferences;
          }
          if (updates.preferences.notifications) {
            updateData.notification_preferences = updates.preferences.notifications;
          }
        }

        const { error: riderError } = await supabase
          .from('rider_profiles')
          .update(updateData)
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

  const updateRiderStatus = async (isOnline: boolean) => {
    if (!user?.id) return false;

    try {
      const { error } = await supabase
        .from('rider_profiles')
        .update({
          rider_status: isOnline ? 'available' : 'offline',
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      setRiderProfile(prev => prev ? { ...prev, isOnline } : null);
      toast.success(`Status updated to ${isOnline ? 'online' : 'offline'}`);
      return true;
    } catch (error: any) {
      console.error('[RiderProfile] Error updating status:', error);
      toast.error('Failed to update status');
      return false;
    }
  };

  const addBankDetails = async (bankDetails: Omit<BankDetail, 'id' | 'is_verified' | 'is_default'>) => {
    if (!user?.id) return false;

    try {
      const { error } = await supabase
        .from('rider_bank_details')
        .insert({
          rider_id: user.id,
          ...bankDetails,
          is_verified: false,
          is_default: false
        });

      if (error) throw error;

      toast.success('Bank details added successfully');
      await fetchRiderProfile();
      return true;
    } catch (error: any) {
      console.error('[RiderProfile] Error adding bank details:', error);
      toast.error('Failed to add bank details');
      return false;
    }
  };

  useEffect(() => {
    if (user?.id && user?.role === 'RIDER') {
      fetchRiderProfile();
    }
  }, [user?.id, user?.role, fetchRiderProfile]);

  useEffect(() => {
    if (riderProfile) {
      fetchRecentReviews();
      fetchAchievements();
    }
  }, [riderProfile?.id, fetchRecentReviews, fetchAchievements]);

  return {
    riderProfile,
    recentReviews,
    achievements,
    loading,
    error,
    updateProfile,
    updateRiderStatus,
    addBankDetails,
    refetchProfile: fetchRiderProfile
  };
};
