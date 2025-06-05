
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import VendorDashboardReal from '@/components/vendor/VendorDashboardReal';

const VendorDashboard = () => {
  return (
    <DashboardLayout userRole="VENDOR">
      <VendorDashboardReal />
    </DashboardLayout>
  );
};

export default VendorDashboard;
