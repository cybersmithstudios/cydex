
import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProcessOrderContent from '@/components/vendor/ProcessOrderContent';

const ProcessOrderPage = () => {
  const location = useLocation();
  const order = location.state?.order;
  
  return (
    <DashboardLayout userRole="VENDOR">
      <ProcessOrderContent order={order} />
    </DashboardLayout>
  );
};

export default ProcessOrderPage;
