import { NextApiRequest, NextApiResponse } from 'next';
import { DistanceService } from '@/services/distanceService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pickupAddress, deliveryAddress } = req.body;

    if (!pickupAddress || !deliveryAddress) {
      return res.status(400).json({ 
        error: 'Pickup and delivery addresses are required' 
      });
    }

    const distanceService = new DistanceService();

    // First, check if we have a cached result
    const cachedResult = await distanceService.getCachedDistance(
      pickupAddress, 
      deliveryAddress
    );

    if (cachedResult) {
      return res.status(200).json({
        success: true,
        ...cachedResult,
        cached: true
      });
    }

    // Validate campus delivery (optional)
    const campusValidation = await distanceService.validateCampusDelivery(
      pickupAddress,
      deliveryAddress
    );

    if (!campusValidation.isValid) {
      return res.status(400).json({
        error: campusValidation.reason || 'Invalid delivery area'
      });
    }

    // Calculate distance using Google Maps API
    const result = await distanceService.calculateDistance(
      pickupAddress,
      deliveryAddress
    );

    if (result.status === 'OK') {
      // Cache the result for future use
      await distanceService.cacheDistance(pickupAddress, deliveryAddress, result);

      // Calculate additional metrics
      const estimatedDeliveryTime = distanceService.getEstimatedDeliveryTime(result.distance_km);
      const isLateNight = distanceService.isLateNight();
      const isPeakHour = distanceService.isPeakHour();

      return res.status(200).json({
        success: true,
        ...result,
        estimated_delivery_time_minutes: estimatedDeliveryTime,
        is_late_night: isLateNight,
        is_peak_hour: isPeakHour,
        cached: false
      });
    } else {
      return res.status(400).json({
        error: `Could not calculate distance: ${result.status}`,
        details: {
          origin: result.origin,
          destination: result.destination,
          status: result.status
        }
      });
    }
  } catch (error) {
    console.error('Distance calculation API error:', error);
    return res.status(500).json({ 
      error: 'Failed to calculate distance',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Example API usage:
/*
POST /api/calculate-distance
{
  "pickupAddress": "University of Ibadan, Ibadan, Nigeria",
  "deliveryAddress": "Bodija Market, Ibadan, Nigeria"
}

Response:
{
  "success": true,
  "distance_km": 3.2,
  "duration_minutes": 8,
  "origin": "University of Ibadan, Ibadan, Nigeria",
  "destination": "Bodija Market, Ibadan, Nigeria",
  "status": "OK",
  "estimated_delivery_time_minutes": 46,
  "is_late_night": false,
  "is_peak_hour": true,
  "cached": false
}
*/ 