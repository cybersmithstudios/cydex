// Phase 2: Distance Service
export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface DistanceResult {
  distanceKm: number;
  estimatedDuration: number; // in minutes
  isLateNight: boolean;
  isPeakHour: boolean;
}

// For now, we'll use a simple distance calculation
// In production, this would integrate with Google Maps Distance Matrix API
export const calculateDistance = (from: Location, to: Location): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(to.lat - from.lat);
  const dLng = deg2rad(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(from.lat)) * Math.cos(deg2rad(to.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const isLateNightTime = (date: Date = new Date()): boolean => {
  const hour = date.getHours();
  return hour >= 20 || hour < 6; // 8 PM to 6 AM
};

export const isPeakHourTime = (date: Date = new Date()): boolean => {
  const hour = date.getHours();
  return hour >= 12 && hour < 14; // 12 PM to 2 PM
};

export const estimateDeliveryDuration = (distanceKm: number): number => {
  // Assume average speed of 30 km/h for delivery
  const baseDuration = (distanceKm / 30) * 60; // in minutes
  const processingTime = 15; // 15 minutes for order preparation
  return Math.round(baseDuration + processingTime);
};

export const getDistanceAndTimeInfo = async (
  pickupLocation: Location,
  deliveryLocation: Location,
  scheduledTime?: Date
): Promise<DistanceResult> => {
  const distanceKm = calculateDistance(pickupLocation, deliveryLocation);
  const estimatedDuration = estimateDeliveryDuration(distanceKm);
  const checkTime = scheduledTime || new Date();
  
  return {
    distanceKm: Number(distanceKm.toFixed(2)),
    estimatedDuration,
    isLateNight: isLateNightTime(checkTime),
    isPeakHour: isPeakHourTime(checkTime)
  };
};

// Default UI campus location for testing
export const UI_CAMPUS_LOCATION: Location = {
  lat: 7.3775,
  lng: 3.9470,
  address: "University of Ibadan, Ibadan, Nigeria"
};

// Mock function to geocode address (in production, use Google Maps Geocoding API)
export const geocodeAddress = async (address: string): Promise<Location | null> => {
  // For demo purposes, return a mock location near UI campus
  // In production, integrate with Google Maps Geocoding API
  const variations = [
    { lat: 7.3775 + Math.random() * 0.01, lng: 3.9470 + Math.random() * 0.01 },
    { lat: 7.3865, lng: 3.9036 }, // Bodija area
    { lat: 7.4165, lng: 3.9093 }, // Ring Road area
    { lat: 7.3516, lng: 3.9385 }, // Sango area
  ];
  
  const location = variations[Math.floor(Math.random() * variations.length)];
  return {
    ...location,
    address
  };
};