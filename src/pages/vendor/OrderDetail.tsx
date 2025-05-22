
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import OrderDetailContent from '@/components/vendor/OrderDetailContent';
import { getOrderById } from '@/data/ordersMockData';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const order = orderId ? getOrderById(orderId) : undefined;
  
  return (
    <DashboardLayout userRole="vendor">
      <OrderDetailContent order={order} orderId={orderId} />
    </DashboardLayout>
  );
};

export default OrderDetailPage;
