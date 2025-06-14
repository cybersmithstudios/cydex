
import { useState } from 'react';

export const useRiderProfileData = () => {
  // Mock profile data - in a real app, this would come from an API
  const riderProfile = {
    name: "John Rider",
    email: "johnrider@example.com",
    phone: "+234 812 345 6789",
    avatar: null,
    joinDate: "October 2023",
    address: "23 Marina Street, Lagos Island, Lagos",
    status: "active",
    verificationStatus: "verified",
    bankDetails: {
      bank: "Zenith Bank",
      accountNumber: "1234567890",
      accountName: "John Rider",
      bvn: "•••••••1234"
    },
    vehicle: {
      type: "motorcycle",
      model: "Honda CBX 250",
      year: "2022",
      color: "Black",
      licensePlate: "ABC-123XY",
      registrationStatus: "approved"
    },
    documents: {
      idCard: {
        type: "National ID",
        status: "verified",
        expiryDate: "12/2028"
      },
      driverLicense: {
        status: "verified",
        expiryDate: "05/2026"
      },
      insurance: {
        status: "verified",
        expiryDate: "03/2026"
      }
    },
    stats: {
      completedDeliveries: 584,
      totalDistance: 3241,
      sustainabilityScore: 92,
      carbonSaved: 1325,
      rating: 4.9,
      reviews: 237
    },
    preferences: {
      notifications: {
        app: true,
        email: true,
        sms: false,
        marketing: false
      },
      deliveryPreferences: {
        maxDistance: 10,
        preferredZones: ["Victoria Island", "Ikoyi", "Lekki Phase 1"],
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      }
    }
  };

  const recentReviews = [
    {
      id: 1,
      customer: "Sarah O.",
      rating: 5,
      comment: "Very professional and timely delivery. The rider was courteous and followed all my delivery instructions exactly.",
      date: "Apr 8, 2025"
    },
    {
      id: 2,
      customer: "Michael T.",
      rating: 5,
      comment: "Excellent service! My packages were delivered in perfect condition and ahead of schedule.",
      date: "Apr 6, 2025"
    },
    {
      id: 3,
      customer: "Aisha M.",
      rating: 4,
      comment: "Good service and communication. Rider kept me updated throughout the delivery process.",
      date: "Apr 5, 2025"
    },
    {
      id: 4,
      customer: "David K.",
      rating: 5,
      comment: "Exceptional service as always. This rider is very reliable and professional.",
      date: "Apr 3, 2025"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Eco Warrior",
      description: "Saved over 1,000kg of carbon emissions",
      icon: () => <div>🌱</div>,
      earnedDate: "Mar 2025",
      progress: 100
    },
    {
      id: 2,
      title: "Speed Demon",
      description: "Completed 50 deliveries with early arrival",
      icon: () => <div>⚡</div>,
      earnedDate: "Feb 2025",
      progress: 100
    },
    {
      id: 3,
      title: "5-Star Rider",
      description: "Maintained 5-star rating for 3 consecutive months",
      icon: () => <div>⭐</div>,
      earnedDate: "Jan 2025",
      progress: 100
    },
    {
      id: 4,
      title: "Urban Explorer",
      description: "Completed deliveries in all city zones",
      icon: () => <div>🗺️</div>,
      progress: 80
    },
    {
      id: 5,
      title: "Marathon Rider",
      description: "Traveled over 5,000km making deliveries",
      icon: () => <div>🚴</div>,
      progress: 65
    }
  ];

  return {
    riderProfile,
    recentReviews,
    achievements
  };
};
