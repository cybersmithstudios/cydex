
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/Users';
import AdminOrders from '../pages/admin/Orders';
import AdminPayments from '../pages/admin/Payments';
import AdminCarbonCredits from '../pages/admin/CarbonCredits';
import AdminPartnerships from '../pages/admin/Partnerships';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminUsers />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/orders" 
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminOrders />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/payments" 
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminPayments />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/carbon-credits" 
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminCarbonCredits />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/partnerships" 
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminPartnerships />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AdminRoutes;
