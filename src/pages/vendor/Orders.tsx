
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import OrdersPageContent from '@/components/vendor/OrdersPageContent';

const OrdersPage = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout userRole="vendor">
      <OrdersPageContent />
    </DashboardLayout>
  );
};

export default OrdersPage;
