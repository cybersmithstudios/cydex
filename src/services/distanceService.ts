import { supabase } from '@/lib/supabase';

export interface DistanceResult {
  distance_km: number;
  duration_minutes: number;
  origin: string;
  destination: string;
  status: 'OK' | 'ZERO_RESULTS' | 'NOT_FOUND' | 'ERROR';
}

export class DistanceService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
  }

  /**
   * Calculate distance between two addresses using Google Maps Distance Matrix API
   * 
   * How it works:
   * 1. Takes pickup and delivery addresses as input
   * 2. Sends request to Google Maps Distance Matrix API
   * 3. API returns actual driving distance and time
   * 4. Returns distance in kilometers for pricing calculation
   */
  async calculateDistance(
    pickupAddress: string,
    deliveryAddress: string
  ): Promise<DistanceResult> {
    try {
      // Construct the API URL
      const baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';
      const params = new URLSearchParams({
        origins: pickupAddress,
        destinations: deliveryAddress,
        key: this.apiKey,
        units: 'metric', // Returns distance in kilometers
        mode: 'driving', // Use driving directions (not walking/bicycling)
        traffic_model: 'best_guess', // Consider traffic
        departure_time: 'now' // Use current time for traffic
      });

      const url = `${baseUrl}?${params.toString()}`;

      // Make the API request
      const response = await fetch(url);
      const data = await response.json();

      // Handle API response
      if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
        const element = data.rows[0].elements[0];
        
        return {
          distance_km: element.distance.value / 1000, // Convert meters to kilometers
          duration_minutes: Math.ceil(element.duration.value / 60), // Convert seconds to minutes
          origin: data.origin_addresses[0],
          destination: data.destination_addresses[0],
          status: 'OK'
        };
      } else {
        // Handle different error cases
        const status = data.rows[0].elements[0].status;
        return {
          distance_km: 0,
          duration_minutes: 0,
          origin: pickupAddress,
          destination: deliveryAddress,
          status: status as any
        };
      }
    } catch (error) {
      console.error('Distance calculation error:', error);
      return {
        distance_km: 0,
        duration_minutes: 0,
        origin: pickupAddress,
        destination: deliveryAddress,
        status: 'ERROR'
      };
    }
  }

  /**
   * Check if delivery is during late night hours (8 PM - 6 AM)
   */
  isLateNight(): boolean {
    const hour = new Date().getHours();
    return hour >= 20 || hour < 6;
  }

  /**
   * Check if delivery is during peak hours (12 PM - 2 PM)
   */
  isPeakHour(): boolean {
    const hour = new Date().getHours();
    return hour >= 12 && hour <= 14;
  }

  /**
   * Get estimated delivery time based on distance
   */
  getEstimatedDeliveryTime(distanceKm: number): number {
    // Base delivery time: 30 minutes
    // Additional time: 5 minutes per km
    return Math.max(30, 30 + (distanceKm * 5));
  }

  /**
   * Validate if addresses are within UI campus area
   * This helps prevent invalid deliveries
   */
  async validateCampusDelivery(
    pickupAddress: string,
    deliveryAddress: string
  ): Promise<{ isValid: boolean; reason?: string }> {
    try {
      // UI campus coordinates (approximate center)
      const uiCampusCenter = { lat: 7.3961, lng: 3.8969 };
      
      // Get coordinates for both addresses
      const pickupCoords = await this.getCoordinates(pickupAddress);
      const deliveryCoords = await this.getCoordinates(deliveryAddress);

      if (!pickupCoords || !deliveryCoords) {
        return { isValid: false, reason: 'Could not validate addresses' };
      }

      // Calculate distance from UI campus center
      const pickupDistance = this.calculateHaversineDistance(
        uiCampusCenter.lat, uiCampusCenter.lng,
        pickupCoords.lat, pickupCoords.lng
      );

      const deliveryDistance = this.calculateHaversineDistance(
        uiCampusCenter.lat, uiCampusCenter.lng,
        deliveryCoords.lat, deliveryCoords.lng
      );

      // Allow deliveries within 10km of UI campus
      const maxDistance = 10;
      
      if (pickupDistance > maxDistance || deliveryDistance > maxDistance) {
        return { 
          isValid: false, 
          reason: 'Addresses must be within UI campus area (10km radius)' 
        };
      }

      return { isValid: true };
    } catch (error) {
      console.error('Campus validation error:', error);
      return { isValid: false, reason: 'Validation failed' };
    }
  }

  /**
   * Get coordinates for an address using Geocoding API
   */
  private async getCoordinates(address: string): Promise<{ lat: number; lng: number } | null> {
    try {
      const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
      const params = new URLSearchParams({
        address: address,
        key: this.apiKey
      });

      const url = `${baseUrl}?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
  return {
          lat: location.lat,
          lng: location.lng
        };
      }

      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  }

  /**
   * Calculate distance between two points using Haversine formula
   */
  private calculateHaversineDistance(
    lat1: number, lng1: number,
    lat2: number, lng2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Cache distance calculations to reduce API calls
   */
  async getCachedDistance(
    pickupAddress: string,
    deliveryAddress: string
  ): Promise<DistanceResult | null> {
    try {
      const { data, error } = await supabase
        .from('distance_cache')
        .select('*')
        .eq('pickup_address', pickupAddress)
        .eq('delivery_address', deliveryAddress)
        .single();

      if (error || !data) return null;

      // Check if cache is still valid (24 hours)
      const cacheAge = Date.now() - new Date(data.created_at).getTime();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      if (cacheAge > maxAge) return null;

  return {
        distance_km: data.distance_km,
        duration_minutes: data.duration_minutes,
        origin: data.origin,
        destination: data.destination,
        status: 'OK'
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Save distance calculation to cache
   */
  async cacheDistance(
    pickupAddress: string,
    deliveryAddress: string,
    result: DistanceResult
  ): Promise<void> {
    try {
      await supabase
        .from('distance_cache')
        .insert({
          pickup_address: pickupAddress,
          delivery_address: deliveryAddress,
          distance_km: result.distance_km,
          duration_minutes: result.duration_minutes,
          origin: result.origin,
          destination: result.destination
        });
    } catch (error) {
      console.error('Cache save error:', error);
    }
  }
}