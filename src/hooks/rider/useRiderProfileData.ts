
import { useState, useEffect, useCallback, useMemo } from 'react';
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

  // Memoize the user ID to prevent unnecessary re-renders
  const userId = useMemo(() => user?.id, [user?.id]);

  const fetchCompleteProfile = useCallback(async () => {
    if (!userId) {
      console.log('[RiderProfile] No user ID available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const profile = await fetchRiderProfile(userId);
      setRiderProfile(profile);
      console.log('[RiderProfile] Profile loaded successfully');
    } catch (error: any) {
      console.error('[RiderProfile] Error fetching profile:', error);
      setError('Failed to load profile data');
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }, [userId, fetchRiderProfile]);

  const loadRecentReviews = useCallback(async () => {
    if (!userId) return;

    try {
      const reviews = await fetchRecentReviews(userId);
      setRecentReviews(reviews);
    } catch (error) {
      console.error('[RiderProfile] Error loading reviews:', error);
    }
  }, [userId, fetchRecentReviews]);

  const loadAchievements = useCallback(async () => {
    if (!userId) return;

    try {
      const achievementsData = await fetchAchievements(userId);
      setAchievements(achievementsData);
    } catch (error) {
      console.error('[RiderProfile] Error loading achievements:', error);
    }
  }, [userId, fetchAchievements]);

  const handleUpdateProfile = useCallback(async (updates: Partial<RiderProfileData>) => {
    if (!userId) return false;

    try {
      setLoading(true);
      await updateProfile(userId, updates);
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
  }, [userId, updateProfile, fetchCompleteProfile]);

  const handleUpdateRiderStatus = useCallback(async (isOnline: boolean) => {
    if (!userId) return false;

    try {
      await updateRiderStatus(userId, isOnline);
      // Update local state
      setRiderProfile(prev => prev ? { ...prev, isOnline } : null);
      toast.success(`Status updated to ${isOnline ? 'online' : 'offline'}`);
      return true;
    } catch (error: any) {
      console.error('[RiderProfile] Error updating status:', error);
      toast.error('Failed to update status');
      return false;
    }
  }, [userId, updateRiderStatus]);

  const handleAddBankDetails = useCallback(async (bankDetails: Omit<BankDetail, 'id' | 'is_verified' | 'is_default'>) => {
    if (!userId) return false;

    try {
      await addBankDetails(userId, bankDetails);
      toast.success('Bank details added successfully');
      await fetchCompleteProfile();
      return true;
    } catch (error: any) {
      console.error('[RiderProfile] Error adding bank details:', error);
      toast.error('Failed to add bank details');
      return false;
    }
  }, [userId, addBankDetails, fetchCompleteProfile]);

  useEffect(() => {
    if (userId && user?.role === 'RIDER') {
      fetchCompleteProfile();
    }
  }, [userId, user?.role, fetchCompleteProfile]);

  useEffect(() => {
    if (riderProfile?.id) {
      loadRecentReviews();
      loadAchievements();
    }
  }, [riderProfile?.id, loadRecentReviews, loadAchievements]);

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(() => ({
    riderProfile,
    recentReviews,
    achievements,
    loading,
    error,
    updateProfile: handleUpdateProfile,
    updateRiderStatus: handleUpdateRiderStatus,
    addBankDetails: handleAddBankDetails,
    refetchProfile: fetchCompleteProfile
  }), [
    riderProfile,
    recentReviews,
    achievements,
    loading,
    error,
    handleUpdateProfile,
    handleUpdateRiderStatus,
    handleAddBankDetails,
    fetchCompleteProfile
  ]);
};
