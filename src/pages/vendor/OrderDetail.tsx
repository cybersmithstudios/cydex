
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import OrderDetailReal from '@/components/vendor/OrderDetailReal';

const OrderDetailPage = () => {
  return (
    <DashboardLayout userRole="VENDOR">
      <OrderDetailReal />
    </DashboardLayout>
  );
};

export default OrderDetailPage;
