
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
          <ProtectedRoute allowedRoles={['VENDOR']}>
            <VendorDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/orders" 
        element={
          <ProtectedRoute allowedRoles={['VENDOR']}>
            <VendorOrders />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/orders/:orderId" 
        element={
          <ProtectedRoute allowedRoles={['VENDOR']}>
            <VendorOrderDetail />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/process-order" 
        element={
          <ProtectedRoute allowedRoles={['VENDOR']}>
            <ProcessOrder />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/wallet" 
        element={
          <ProtectedRoute allowedRoles={['VENDOR']}>
            <VendorWallet />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/recycling" 
        element={
          <ProtectedRoute allowedRoles={['VENDOR']}>
            <VendorRecycling />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/settings" 
        element={
          <ProtectedRoute allowedRoles={['VENDOR']}>
            <VendorSettings />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/add-product" 
        element={
          <ProtectedRoute allowedRoles={['VENDOR']}>
            <AddProduct />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default VendorRoutes;
