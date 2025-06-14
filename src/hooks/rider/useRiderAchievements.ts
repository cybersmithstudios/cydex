
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AchievementData } from './types';

export const useRiderAchievements = () => {
  const fetchAchievements = useCallback(async (userId: string): Promise<AchievementData[]> => {
    try {
      const { data: achievementsData, error } = await supabase
        .from('rider_achievements')
        .select('*')
        .eq('rider_id', userId)
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

      return formattedAchievements;
    } catch (error) {
      console.error('[RiderProfile] Error fetching achievements:', error);
      return [];
    }
  }, []);

  return {
    fetchAchievements
  };
};
