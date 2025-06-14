
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from 'sonner';
import { useRiderProfileQueries } from './useRiderProfileQueries';
import { useRiderReviews } from './useRiderReviews';
import { useRiderAchievements } from './useRiderAchievements';
import type { RiderProfileData, ReviewData, AchievementData, BankDetail } from './types';

export type { VehicleInfo, DocumentInfo, BankDetail, ReviewData, AchievementData, RiderProfileData } from './types';

export const useRiderProfileData = () => {
  const { user } = useAuth();
  const [riderProfile, setRiderProfile] = useState<RiderProfileData | null>(null);
  const [recentReviews, setRecentReviews] = useState<ReviewData[]>([]);
  const [achievements, setAchievements] = useState<AchievementData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { fetchRiderProfile, updateProfile, updateRiderStatus, addBankDetails } = useRiderProfileQueries();
  const { fetchRecentReviews } = useRiderReviews();
  const { fetchAchievements } = useRiderAchievements();

  const fetchCompleteProfile = useCallback(async () => {
    if (!user?.id) {
      console.log('[RiderProfile] No user ID available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const profile = await fetchRiderProfile(user.id);
      setRiderProfile(profile);
      console.log('[RiderProfile] Profile loaded successfully');
    } catch (error: any) {
      console.error('[RiderProfile] Error fetching profile:', error);
      setError('Failed to load profile data');
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }, [user?.id, fetchRiderProfile]);

  const loadRecentReviews = useCallback(async () => {
    if (!user?.id) return;

    try {
      const reviews = await fetchRecentReviews(user.id);
      setRecentReviews(reviews);

      // Update review count in profile
      if (riderProfile) {
        setRiderProfile(prev => prev ? {
          ...prev,
          stats: { ...prev.stats, reviews: reviews.length }
        } : null);
      }
    } catch (error) {
      console.error('[RiderProfile] Error loading reviews:', error);
    }
  }, [user?.id, riderProfile, fetchRecentReviews]);

  const loadAchievements = useCallback(async () => {
    if (!user?.id) return;

    try {
      const achievementsData = await fetchAchievements(user.id);
      setAchievements(achievementsData);
    } catch (error) {
      console.error('[RiderProfile] Error loading achievements:', error);
    }
  }, [user?.id, fetchAchievements]);

  const handleUpdateProfile = async (updates: Partial<RiderProfileData>) => {
    if (!user?.id) return false;

    try {
      setLoading(true);
      await updateProfile(user.id, updates);
      toast.success('Profile updated successfully');
      await fetchCompleteProfile();
      return true;
    } catch (error: any) {
      console.error('[RiderProfile] Error updating profile:', error);
      toast.error('Failed to update profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRiderStatus = async (isOnline: boolean) => {
    if (!user?.id) return false;

    try {
      await updateRiderStatus(user.id, isOnline);
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

  const handleAddBankDetails = async (bankDetails: Omit<BankDetail, 'id' | 'is_verified' | 'is_default'>) => {
    if (!user?.id) return false;

    try {
      await addBankDetails(user.id, bankDetails);
      toast.success('Bank details added successfully');
      await fetchCompleteProfile();
      return true;
    } catch (error: any) {
      console.error('[RiderProfile] Error adding bank details:', error);
      toast.error('Failed to add bank details');
      return false;
    }
  };

  useEffect(() => {
    if (user?.id && user?.role === 'RIDER') {
      fetchCompleteProfile();
    }
  }, [user?.id, user?.role, fetchCompleteProfile]);

  useEffect(() => {
    if (riderProfile) {
      loadRecentReviews();
      loadAchievements();
    }
  }, [riderProfile?.id, loadRecentReviews, loadAchievements]);

  return {
    riderProfile,
    recentReviews,
    achievements,
    loading,
    error,
    updateProfile: handleUpdateProfile,
    updateRiderStatus: handleUpdateRiderStatus,
    addBankDetails: handleAddBankDetails,
    refetchProfile: fetchCompleteProfile
  };
};
