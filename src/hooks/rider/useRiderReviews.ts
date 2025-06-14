
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ReviewData } from './types';

export const useRiderReviews = () => {
  const fetchRecentReviews = useCallback(async (userId: string): Promise<ReviewData[]> => {
    try {
      const { data: reviewsData, error } = await supabase
        .from('rider_reviews')
        .select(`
          *,
          customer:profiles!customer_id(name)
        `)
        .eq('rider_id', userId)
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

      return formattedReviews;
    } catch (error) {
      console.error('[RiderProfile] Error fetching reviews:', error);
      return [];
    }
  }, []);

  return {
    fetchRecentReviews
  };
};
