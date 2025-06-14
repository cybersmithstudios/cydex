
import { useCallback } from 'react';
import { RiderProfileData, BankDetail } from './types';
import { fetchProfileData, fetchRiderData, fetchDeliveryStats, fetchBankDetails } from './queries/profileQueries';
import { updateProfile, updateRiderStatus, addBankDetails } from './mutations/profileMutations';
import { transformProfileData } from './utils/profileTransformer';

export const useRiderProfileQueries = () => {
  const fetchRiderProfile = useCallback(async (userId: string): Promise<RiderProfileData | null> => {
    console.log('[RiderProfile] Fetching rider profile for:', userId);

    const [profileData, riderData, deliveriesData, bankDetailsData] = await Promise.all([
      fetchProfileData(userId),
      fetchRiderData(userId),
      fetchDeliveryStats(userId),
      fetchBankDetails(userId)
    ]);

    return transformProfileData(profileData, riderData, deliveriesData, bankDetailsData);
  }, []);

  return {
    fetchRiderProfile,
    updateProfile,
    updateRiderStatus,
    addBankDetails
  };
};
