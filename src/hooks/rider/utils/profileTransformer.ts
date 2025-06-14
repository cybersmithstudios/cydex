
import { RiderProfileData } from '../types';

export const transformProfileData = (
  profileData: any,
  riderData: any,
  deliveriesData: any[],
  bankDetailsData: any[]
): RiderProfileData => {
  // Calculate stats from real data
  const totalDeliveries = deliveriesData.length;
  const totalDistance = deliveriesData.reduce((sum, d) => sum + (Number(d.actual_distance) || 0), 0);
  const carbonSaved = deliveriesData.reduce((sum, d) => sum + (Number(d.carbon_saved) || 0), 0);

  // Parse preferences safely with type assertions
  const deliveryPrefs = riderData?.delivery_preferences as any || {};
  const notificationPrefs = riderData?.notification_preferences as any || {};

  return {
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
        maxDistance: Number((deliveryPrefs as any)?.max_distance || 15),
        preferredZones: Array.isArray((deliveryPrefs as any)?.preferred_zones) ? (deliveryPrefs as any).preferred_zones : [],
        availableDays: Array.isArray((deliveryPrefs as any)?.available_days) ? (deliveryPrefs as any).available_days : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      },
      notifications: {
        app: Boolean((notificationPrefs as any)?.app !== false),
        email: Boolean((notificationPrefs as any)?.email !== false),
        sms: Boolean((notificationPrefs as any)?.sms === true),
        marketing: Boolean((notificationPrefs as any)?.marketing === true)
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
};
