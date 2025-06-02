
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import OrdersPageContent from '@/components/vendor/OrdersPageContent';

const OrdersPage = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout userRole="VENDOR">
      <OrdersPageContent />
    </DashboardLayout>
  );
};

export default OrdersPage;
