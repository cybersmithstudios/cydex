import { useState, useEffect } from 'react';
import { useSupabase } from '@/contexts/SupabaseContext';

export interface VendorRating {
  average_rating: number;
  total_ratings: number;
  average_delivery_rating: number;
  average_product_quality_rating: number;
}

export const useVendorRatings = (vendorId: string | null = null) => {
  const { supabase } = useSupabase();
  const [ratings, setRatings] = useState<Record<string, VendorRating>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVendorRating = async (vendorUuid: string): Promise<VendorRating> => {
    try {
      const { data, error } = await supabase
        .rpc('get_vendor_average_rating', { vendor_uuid: vendorUuid });

      if (error) throw error;
      
      const result = data[0] || {
        average_rating: 0,
        total_ratings: 0,
        average_delivery_rating: 0,
        average_product_quality_rating: 0
      };

      return result;
    } catch (err) {
      console.error('Error fetching vendor rating:', err);
      return {
        average_rating: 0,
        total_ratings: 0,
        average_delivery_rating: 0,
        average_product_quality_rating: 0
      };
    }
  };

  const fetchAllVendorRatings = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get all unique vendor IDs from products
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('vendor_id')
        .eq('status', 'active');

      if (productsError) throw productsError;

      const uniqueVendorIds = [...new Set(products.map(p => p.vendor_id))];
      const ratingsData: Record<string, VendorRating> = {};

      // Fetch ratings for each vendor
      await Promise.all(
        uniqueVendorIds.map(async (vendorId) => {
          const rating = await fetchVendorRating(vendorId);
          ratingsData[vendorId] = rating;
        })
      );

      setRatings(ratingsData);
    } catch (err) {
      console.error('Error fetching vendor ratings:', err);
      setError('Failed to load vendor ratings');
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleVendorRating = async (vendorUuid: string) => {
    try {
      setLoading(true);
      setError(null);

      const rating = await fetchVendorRating(vendorUuid);
      setRatings({ [vendorUuid]: rating });
    } catch (err) {
      console.error('Error fetching vendor rating:', err);
      setError('Failed to load vendor rating');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vendorId) {
      fetchSingleVendorRating(vendorId);
    } else {
      fetchAllVendorRatings();
    }
  }, [vendorId]);

  const getRatingForVendor = (vendorUuid: string): VendorRating => {
    return ratings[vendorUuid] || {
      average_rating: 0,
      total_ratings: 0,
      average_delivery_rating: 0,
      average_product_quality_rating: 0
    };
  };

  const refreshRatings = () => {
    if (vendorId) {
      fetchSingleVendorRating(vendorId);
    } else {
      fetchAllVendorRatings();
    }
  };

  return {
    ratings,
    loading,
    error,
    getRatingForVendor,
    refreshRatings
  };
}; 