
// Mock order data
export const orders = [
  {
    id: 'ORD-5678',
    customer: 'Emily Johnson',
    status: 'pending',
    createdAt: '2025-04-09T10:23:00Z',
    items: [
      { id: 1, name: 'Organic Vegetables Mix', quantity: 1, price: 28952.59 },
      { id: 2, name: 'Free-Range Eggs (12pk)', quantity: 1, price: 15331 },
      { id: 3, name: 'Organic Almond Milk', quantity: 1, price: 29296.21 }
    ],
    total: 73579.77,
    address: '123 Green Street, Lagos',
    paymentMethod: 'Wallet',
    deliveryType: 'Express',
    deliveryFee: 500,
    timeSlot: '2:00 PM - 4:00 PM'
  },
  {
    id: 'ORD-5679',
    customer: 'David Wilson',
    status: 'processing',
    createdAt: '2025-04-09T09:45:00Z',
    items: [
      { id: 1, name: 'Reusable Shopping Bag', quantity: 1, price: 7665.5 },
      { id: 2, name: 'Bamboo Toothbrush Set', quantity: 1, price: 12264.8 },
      { id: 3, name: 'Zero-Waste Starter Kit', quantity: 1, price: 45993 }
    ],
    total: 65923.3,
    address: '456 Eco Avenue, Lagos',
    paymentMethod: 'Card',
    deliveryType: 'Standard',
    deliveryFee: 500,
    timeSlot: '10:00 AM - 12:00 PM',
    rider: {
      name: 'Alex Martinez',
      contact: '08012345678'
    }
  },
  {
    id: 'ORD-5672',
    customer: 'Sarah Thomas',
    status: 'delivered',
    createdAt: '2025-04-08T14:30:00Z',
    deliveredAt: '2025-04-08T16:15:00Z',
    items: [
      { id: 1, name: 'Organic Fruit Basket', quantity: 1, price: 30662 },
      { id: 2, name: 'Recycled Paper Notebooks', quantity: 2, price: 15331 }
    ],
    total: 45993,
    address: '789 Sustainable Road, Lagos',
    paymentMethod: 'Wallet',
    deliveryType: 'Standard',
    deliveryFee: 500,
    timeSlot: '2:00 PM - 4:00 PM',
    rider: {
      name: 'James Rodriguez',
      contact: '08023456789'
    },
    feedback: {
      rating: 5,
      comment: 'Great service and eco-friendly packaging!'
    }
  },
  {
    id: 'ORD-5670',
    customer: 'Michael Roberts',
    status: 'cancelled',
    createdAt: '2025-04-08T09:15:00Z',
    cancelledAt: '2025-04-08T10:30:00Z',
    items: [
      { id: 1, name: 'Plant-Based Protein Pack', quantity: 1, price: 38327.5 },
      { id: 2, name: 'Organic Coffee Beans', quantity: 1, price: 12264.8 }
    ],
    total: 50592.3,
    address: '101 Green Life Street, Lagos',
    paymentMethod: 'Card',
    cancelReason: 'Customer requested cancellation'
  }
];

export const getOrderById = (orderId: string) => {
  return orders.find(order => order.id === orderId);
};
