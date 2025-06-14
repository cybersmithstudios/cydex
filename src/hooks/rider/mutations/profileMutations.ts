
import { supabase } from '@/integrations/supabase/client';
import { RiderProfileData, BankDetail } from '../types';

export const updateProfile = async (userId: string, updates: Partial<RiderProfileData>) => {
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

export const updateRiderStatus = async (userId: string, isOnline: boolean) => {
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

export const addBankDetails = async (userId: string, bankDetails: Omit<BankDetail, 'id' | 'is_verified' | 'is_default'>) => {
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
