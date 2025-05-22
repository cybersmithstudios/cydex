
import { Routes } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import CustomerRoutes from './CustomerRoutes';
import VendorRoutes from './VendorRoutes';
import RiderRoutes from './RiderRoutes';
import AdminRoutes from './AdminRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <PublicRoutes />
      
      {/* Customer Routes */}
      <CustomerRoutes />
      
      {/* Vendor Routes */}
      <VendorRoutes />
      
      {/* Rider Routes */}
      <RiderRoutes />
      
      {/* Admin Routes */}
      <AdminRoutes />
    </Routes>
  );
};

export default AppRoutes;
