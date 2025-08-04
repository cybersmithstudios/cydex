// Phase 2: Pricing Service Implementation
import { supabase } from "@/integrations/supabase/client";

export interface PricingBreakdown {
  baseRate: number;
  distanceFee: number;
  weightFee: number;
  lateNightFee: number;
  surgeFee: number;
  studentDiscount: number;
  greenFee: number;
  subtotal: number;
  total: number;
}

export interface PricingParams {
  distanceKm: number;
  weightKg: number;
  isLateNight: boolean;
  isPeakHour: boolean;
  isStudentOrder: boolean;
  hasSubscription: boolean;
  includeGreenFee: boolean;
}

interface PricingConfig {
  base_rate: number;
  distance_rate_per_km: number;
  weight_rates: Record<string, number>;
  late_night_fee: number;
  surge_multiplier: number;
  student_discount_percent: number;
  green_fee: number;
}

let cachedPricingConfig: PricingConfig | null = null;

export const loadPricingConfiguration = async (): Promise<PricingConfig> => {
  if (cachedPricingConfig) {
    return cachedPricingConfig;
  }

  const { data, error } = await supabase
    .from('pricing_config')
    .select('*')
    .single();

  if (error) {
    console.error('Failed to load pricing configuration:', error);
    // Return default configuration if database fails
    return {
      base_rate: 200,
      distance_rate_per_km: 75,
      weight_rates: { "0.5-5": 100, "5-10": 300 },
      late_night_fee: 100,
      surge_multiplier: 1.20,
      student_discount_percent: 0.10,
      green_fee: 20
    };
  }

  const configData = {
    base_rate: data.base_rate,
    distance_rate_per_km: data.distance_rate_per_km,
    weight_rates: data.weight_rates as Record<string, number>,
    late_night_fee: data.late_night_fee,
    surge_multiplier: data.surge_multiplier,
    student_discount_percent: data.student_discount_percent,
    green_fee: data.green_fee
  };
  
  cachedPricingConfig = configData;
  return configData;
};

const getWeightFee = (weightKg: number, weightRates: { [key: string]: number }): number => {
  if (weightKg <= 0.5) return 0;
  if (weightKg <= 5) return weightRates["0.5-5"] || 100;
  if (weightKg <= 10) return weightRates["5-10"] || 300;
  // For weights above 10kg, charge progressively more
  return (weightRates["5-10"] || 300) + ((weightKg - 10) * 50);
};

export const calculatePrice = async (params: PricingParams): Promise<PricingBreakdown> => {
  const config = await loadPricingConfiguration();
  
  // Base rate (up to 2km, <0.5kg)
  const baseRate = config.base_rate;
  
  // Distance fee (only for distance > 2km)
  const extraDistance = Math.max(0, params.distanceKm - 2);
  const distanceFee = extraDistance * config.distance_rate_per_km;
  
  // Weight fee
  const weightFee = getWeightFee(params.weightKg, config.weight_rates);
  
  // Late night fee (8 PM - 6 AM)
  const lateNightFee = params.isLateNight ? config.late_night_fee : 0;
  
  // Calculate subtotal before discounts
  let subtotal = baseRate + distanceFee + weightFee + lateNightFee;
  
  // Peak hour surge (12 PM - 2 PM)
  const surgeFee = params.isPeakHour ? (subtotal * (config.surge_multiplier - 1)) : 0;
  subtotal += surgeFee;
  
  // Student discount (10% off total if no subscription)
  const studentDiscount = (params.isStudentOrder && !params.hasSubscription) 
    ? (subtotal * config.student_discount_percent) 
    : 0;
  
  // Green fee (optional)
  const greenFee = params.includeGreenFee ? config.green_fee : 0;
  
  // Calculate final total
  const total = subtotal - studentDiscount + greenFee;
  
  return {
    baseRate,
    distanceFee,
    weightFee,
    lateNightFee,
    surgeFee,
    studentDiscount,
    greenFee,
    subtotal: subtotal - studentDiscount,
    total: Math.max(0, total) // Ensure total is never negative
  };
};

export const formatNaira = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};