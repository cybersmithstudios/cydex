// Simplified Pricing Service - Flat Rate Implementation
export interface PricingBreakdown {
  baseRate: number;
  studentDiscount: number;
  greenFee: number;
  subtotal: number;
  total: number;
}

export interface PricingParams {
  isStudentOrder: boolean;
  hasSubscription: boolean;
  includeGreenFee: boolean;
}

import { DELIVERY_FEE } from '@/constants/delivery';

// Flat rate pricing configuration
const FLAT_RATE = DELIVERY_FEE; // ₦500 per delivery
const STUDENT_DISCOUNT_PERCENT = 0.10; // 10% discount for students
const GREEN_FEE = 20; // ₦20 optional green fee

export const calculatePrice = async (params: PricingParams): Promise<PricingBreakdown> => {
  // Base flat rate
  const baseRate = FLAT_RATE;
  
  // Student discount (10% off total if no subscription)
  const studentDiscount = (params.isStudentOrder && !params.hasSubscription) 
    ? (baseRate * STUDENT_DISCOUNT_PERCENT) 
    : 0;
  
  // Green fee (optional)
  const greenFee = params.includeGreenFee ? GREEN_FEE : 0;
  
  // Calculate final total
  const total = baseRate - studentDiscount + greenFee;
  
  return {
    baseRate,
    studentDiscount,
    greenFee,
    subtotal: baseRate - studentDiscount,
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