
import { supabase } from '@/integrations/supabase/client';
import { retryWithBackoff } from '../utils/retryUtils';

export const fetchProfileData = async (userId: string) => {
  const profileOperation = async () => {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;
    return profile;
  };

  return retryWithBackoff(profileOperation);
};

export const fetchRiderData = async (userId: string) => {
  const riderOperation = async () => {
    const { data: riderData, error: riderError } = await supabase
      .from('rider_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (riderError && riderError.code !== 'PGRST116') throw riderError;
    return riderData;
  };

  return retryWithBackoff(riderOperation);
};

export const fetchDeliveryStats = async (userId: string) => {
  const statsOperation = async () => {
    const { data: deliveries, error: deliveriesError } = await supabase
      .from('deliveries')
      .select('*')
      .eq('rider_id', userId)
      .eq('status', 'delivered');

    if (deliveriesError) throw deliveriesError;
    return deliveries || [];
  };

  return retryWithBackoff(statsOperation);
};

export const fetchBankDetails = async (userId: string) => {
  const bankOperation = async () => {
    const { data: bankDetails, error: bankError } = await supabase
      .from('rider_bank_details')
      .select('*')
      .eq('rider_id', userId)
      .order('created_at', { ascending: false });

    if (bankError) throw bankError;
    return bankDetails || [];
  };

  return retryWithBackoff(bankOperation);
};
