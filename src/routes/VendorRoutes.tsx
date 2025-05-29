import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import VendorDashboard from '../pages/vendor/VendorDashboard';
import VendorOrders from '../pages/vendor/Orders';
import VendorOrderDetail from '../pages/vendor/OrderDetail';
import ProcessOrder from '../pages/vendor/ProcessOrder';
import VendorWallet from '../pages/vendor/Wallet';
import VendorRecycling from '../pages/vendor/Recycling';
import VendorSettings from '../pages/vendor/Settings';
import AddProduct from '../pages/vendor/AddProduct';

const VendorRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/orders" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorOrders />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/orders/:orderId" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorOrderDetail />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/process-order" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <ProcessOrder />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/wallet" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorWallet />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/recycling" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorRecycling />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/settings" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorSettings />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/add-product" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <AddProduct />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default VendorRoutes;
