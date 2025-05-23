
import { useState, useEffect } from 'react';

// This is a mock data function - in a real app, you would fetch from an API
const getOrderById = (id: string) => {
  // This is mock data - in a real app, you would fetch from an API based on the ID
  return {
    id: id,
    vendor: id.includes('1234') ? 'Eco Grocery' : id.includes('1235') ? 'Green Pharmacy' : 'Sustainable Home',
    status: id.includes('1234') ? 'in-transit' : id.includes('1235') ? 'processing' : 'pending',
    paymentStatus: id.includes('1219') ? 'refunded' : 'paid',
    eta: id.includes('1234') ? '15 minutes' : id.includes('1235') ? '40 minutes' : '60 minutes',
    items: id.includes('1234') ? 3 : id.includes('1235') ? 1 : 5,
    carbonSaved: id.includes('1234') ? 0.5 : id.includes('1235') ? 0.3 : 0.7,
    updatedAt: id.includes('1234') ? '10 minutes ago' : id.includes('1235') ? '5 minutes ago' : '2 minutes ago',
    totalAmount: id.includes('1234') ? '₦4,250.00' : id.includes('1235') ? '₦1,850.75' : '₦7,320.50',
    orderDate: id.includes('1234') ? '2023-07-10' : id.includes('1235') ? '2023-07-09' : '2023-07-08',
    deliveryAddress: '123 Sustainable Street, Lagos',
    rider: {
      name: 'John Rider',
      phone: '+234 123 456 7890',
      rating: 4.8,
      photo: null
    },
    trackingSteps: [
      { id: 1, title: 'Order Placed', completed: true, time: '10:00 AM' },
      { id: 2, title: 'Processing', completed: id.includes('1234') || id.includes('1235'), time: '10:15 AM' },
      { id: 3, title: 'Out for Delivery', completed: id.includes('1234'), time: '10:30 AM' },
      { id: 4, title: 'Delivered', completed: false, time: null }
    ],
    products: [
      {
        id: 1,
        name: 'Organic Bananas',
        quantity: 1,
        price: '₦1,200.00',
        image: null
      },
      {
        id: 2,
        name: 'Eco-friendly Detergent',
        quantity: id.includes('1234') ? 2 : 0,
        price: '₦1,500.00',
        image: null
      },
      {
        id: 3,
        name: 'Bamboo Toothbrush',
        quantity: id.includes('1235') ? 1 : 0,
        price: '₦850.75',
        image: null
      },
      {
        id: 4,
        name: 'Reusable Water Bottle',
        quantity: id.includes('1236') ? 2 : 0,
        price: '₦2,500.00',
        image: null
      },
      {
        id: 5,
        name: 'Solar Charger',
        quantity: id.includes('1236') ? 1 : 0,
        price: '₦3,200.00',
        image: null
      }
    ],
    deliveryFee: '₦500.00',
    discount: '₦450.00',
  };
};

export const useOrderDetails = (orderId: string | undefined) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError('Order ID is required');
      setLoading(false);
      return;
    }

    try {
      // In a real app, this would be an async API call
      const orderData = getOrderById(orderId);
      setOrder(orderData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch order details');
      setLoading(false);
    }
  }, [orderId]);

  return { order, loading, error };
};
