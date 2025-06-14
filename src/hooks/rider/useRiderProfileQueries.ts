
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RiderProfileData, BankDetail } from './types';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const useRiderProfileQueries = () => {
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

  const fetchRiderProfile = useCallback(async (userId: string): Promise<RiderProfileData | null> => {
    console.log('[RiderProfile] Fetching rider profile for:', userId);

    // Fetch profile data
    const profileOperation = async () => {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      return profile;
    };

    // Fetch rider-specific data
    const riderOperation = async () => {
      const { data: riderData, error: riderError } = await supabase
        .from('rider_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (riderError && riderError.code !== 'PGRST116') throw riderError;
      return riderData;
    };

    // Fetch delivery stats
    const statsOperation = async () => {
      const { data: deliveries, error: deliveriesError } = await supabase
        .from('deliveries')
        .select('*')
        .eq('rider_id', userId)
        .eq('status', 'delivered');

      if (deliveriesError) throw deliveriesError;
      return deliveries || [];
    };

    // Fetch bank details
    const bankOperation = async () => {
      const { data: bankDetails, error: bankError } = await supabase
        .from('rider_bank_details')
        .select('*')
        .eq('rider_id', userId)
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

    return transformedProfile;
  }, []);

  const updateProfile = async (userId: string, updates: Partial<RiderProfileData>) => {
    // Update profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        name: updates.name,
        phone: updates.phone,
        address: updates.address,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

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
        .eq('id', userId);

      if (riderError) throw riderError;
    }

    return true;
  };

  const updateRiderStatus = async (userId: string, isOnline: boolean) => {
    const { error } = await supabase
      .from('rider_profiles')
      .update({
        rider_status: isOnline ? 'available' : 'offline',
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) throw error;
    return true;
  };

  const addBankDetails = async (userId: string, bankDetails: Omit<BankDetail, 'id' | 'is_verified' | 'is_default'>) => {
    const { error } = await supabase
      .from('rider_bank_details')
      .insert({
        rider_id: userId,
        ...bankDetails,
        is_verified: false,
        is_default: false
      });

    if (error) throw error;
    return true;
  };

  return {
    fetchRiderProfile,
    updateProfile,
    updateRiderStatus,
    addBankDetails
  };
};
