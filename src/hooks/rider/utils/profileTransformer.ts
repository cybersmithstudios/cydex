
import { RiderProfileData } from '../types';

export const transformProfileData = (
  profileData: any,
  riderData: any,
  deliveriesData: any[],
  bankDetailsData: any[]
): RiderProfileData => {
  console.log('[ProfileTransformer] Transforming profile data:', { profileData, riderData });
  
  // Calculate stats from real data
  const totalDeliveries = deliveriesData.length;
  const totalDistance = deliveriesData.reduce((sum, d) => sum + (Number(d.actual_distance) || 0), 0);
  const carbonSaved = deliveriesData.reduce((sum, d) => sum + (Number(d.carbon_saved) || 0), 0);

  // Parse preferences safely with proper type checking
  const deliveryPrefs = riderData?.delivery_preferences;
  const notificationPrefs = riderData?.notification_preferences;
  
  // Ensure delivery_preferences is an object
  const safeDeliveryPrefs = (deliveryPrefs && typeof deliveryPrefs === 'object' && !Array.isArray(deliveryPrefs)) 
    ? deliveryPrefs as Record<string, any>
    : {};
    
  // Ensure notification_preferences is an object  
  const safeNotificationPrefs = (notificationPrefs && typeof notificationPrefs === 'object' && !Array.isArray(notificationPrefs))
    ? notificationPrefs as Record<string, any>
    : {};

  const transformedData: RiderProfileData = {
    id: profileData.id,
    name: String(profileData.name || 'Rider'),
    email: String(profileData.email || ''),
    phone: String(profileData.phone || ''),
    address: String(profileData.address || ''),
    avatar: profileData.avatar ? String(profileData.avatar) : undefined,
    joinDate: new Date(profileData.created_at).toLocaleDateString(),
    isOnline: riderData?.rider_status === 'available',
    isVerified: riderData?.verification_status === 'verified',
    verificationStatus: String(riderData?.verification_status || 'pending'),
    vehicle: {
      type: String(riderData?.vehicle_type || 'walking'),
      model: riderData?.vehicle_type === 'walking' ? 'On Foot' : 'Eco-friendly Transport',
      year: riderData?.vehicle_type === 'walking' ? 'N/A' : '2023',
      color: riderData?.vehicle_type === 'walking' ? 'N/A' : 'Green',
      licensePlate: String(riderData?.license_number || 'N/A'),
      registration: String(riderData?.vehicle_registration || 'N/A')
    },
    documents: {
      idCard: {
        verified: false,
        expiryDate: '2025-12-31'
      },
      driverLicense: {
        verified: false,
        expiryDate: '2025-12-31'
      },
      insurance: {
        verified: false,
        expiryDate: '2025-12-31'
      }
    },
    bankDetails: bankDetailsData.map(bank => ({
      id: bank.id,
      bank_name: bank.bank_name,
      account_number: bank.account_number,
      account_name: bank.account_name,
      bvn: bank.bvn,
      is_verified: bank.is_verified,
      is_default: bank.is_default
    })),
    preferences: {
      deliveryPreferences: {
        maxDistance: Number(safeDeliveryPrefs.max_distance || 15),
        preferredZones: Array.isArray(safeDeliveryPrefs.preferred_zones) ? safeDeliveryPrefs.preferred_zones : [],
        availableDays: Array.isArray(safeDeliveryPrefs.available_days) ? safeDeliveryPrefs.available_days : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      },
      notifications: {
        app: Boolean(safeNotificationPrefs.app !== false),
        email: Boolean(safeNotificationPrefs.email !== false),
        sms: Boolean(safeNotificationPrefs.sms === true),
        marketing: Boolean(safeNotificationPrefs.marketing === true)
      }
    },
    stats: {
      rating: Number(riderData?.rating) || 0,
      reviews: 0, // Will be calculated from reviews
      completedDeliveries: totalDeliveries,
      totalDistance: Math.round(totalDistance),
      carbonSaved: Math.round(carbonSaved),
      sustainabilityScore: Math.min(100, Math.round(carbonSaved / 10))
    }
  };

  console.log('[ProfileTransformer] Transformed data:', transformedData);
  return transformedData;
};
