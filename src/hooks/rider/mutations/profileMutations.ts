import { supabase } from '@/integrations/supabase/client';
import { RiderProfileData, BankDetail } from '../types';

export const updateProfile = async (userId: string, updates: Partial<RiderProfileData>) => {
  console.log('[ProfileMutations] Starting profile update for user:', userId);
  console.log('[ProfileMutations] Update data:', updates);

  try {
    // Update profiles table (without updated_at since it doesn't exist in this table)
    const profileUpdate: any = {};
    if (updates.name !== undefined) profileUpdate.name = updates.name;
    if (updates.phone !== undefined) profileUpdate.phone = updates.phone;
    if (updates.address !== undefined) profileUpdate.address = updates.address;
    
    if (Object.keys(profileUpdate).length > 0) {
      console.log('[ProfileMutations] Updating profiles table:', profileUpdate);
      const { error: profileError } = await supabase
        .from('profiles')
        .update(profileUpdate)
        .eq('id', userId);

      if (profileError) {
        console.error('[ProfileMutations] Profile update error:', profileError);
        throw profileError;
      }
    }

    // Update rider_profiles table if needed
    const riderUpdate: any = {};
    
    if (updates.vehicle) {
      riderUpdate.vehicle_type = updates.vehicle.type;
      riderUpdate.license_number = updates.vehicle.licensePlate;
      riderUpdate.vehicle_registration = updates.vehicle.registration;
    }

    if (updates.preferences) {
      if (updates.preferences.deliveryPreferences) {
        riderUpdate.delivery_preferences = {
          max_distance: updates.preferences.deliveryPreferences.maxDistance,
          preferred_zones: updates.preferences.deliveryPreferences.preferredZones,
          available_days: updates.preferences.deliveryPreferences.availableDays
        };
      }
      if (updates.preferences.notifications) {
        riderUpdate.notification_preferences = {
          app: updates.preferences.notifications.app,
          email: updates.preferences.notifications.email,
          sms: updates.preferences.notifications.sms,
          marketing: updates.preferences.notifications.marketing
        };
      }
    }

    if (Object.keys(riderUpdate).length > 0) {
      riderUpdate.updated_at = new Date().toISOString();
      
      console.log('[ProfileMutations] Updating rider_profiles table:', riderUpdate);
      const { error: riderError } = await supabase
        .from('rider_profiles')
        .update(riderUpdate)
        .eq('id', userId);

      if (riderError) {
        console.error('[ProfileMutations] Rider profile update error:', riderError);
        throw riderError;
      }
    }

    console.log('[ProfileMutations] Profile update completed successfully');
    return true;
  } catch (error) {
    console.error('[ProfileMutations] Profile update failed:', error);
    throw error;
  }
};

export const updateRiderStatus = async (userId: string, isOnline: boolean) => {
  console.log('[ProfileMutations] Updating rider status:', { userId, isOnline });
  
  try {
    const { error } = await supabase
      .from('rider_profiles')
      .update({
        rider_status: isOnline ? 'available' : 'offline',
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) {
      console.error('[ProfileMutations] Status update error:', error);
      throw error;
    }
    
    console.log('[ProfileMutations] Status updated successfully');
    return true;
  } catch (error) {
    console.error('[ProfileMutations] Status update failed:', error);
    throw error;
  }
};

export const addBankDetails = async (userId: string, bankDetails: Omit<BankDetail, 'id' | 'is_verified' | 'is_default'>) => {
  console.log('[ProfileMutations] Adding bank details for user:', userId);
  
  try {
    const { error } = await supabase
      .from('rider_bank_details')
      .insert({
        rider_id: userId,
        ...bankDetails,
        is_verified: false,
        is_default: false
      });

    if (error) {
      console.error('[ProfileMutations] Bank details add error:', error);
      throw error;
    }
    
    console.log('[ProfileMutations] Bank details added successfully');
    return true;
  } catch (error) {
    console.error('[ProfileMutations] Bank details add failed:', error);
    throw error;
  }
};
