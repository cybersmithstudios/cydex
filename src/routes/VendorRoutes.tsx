
import { Route } from 'react-router-dom';
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
    <>
      <Route 
        path="/vendor" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/vendor/orders" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorOrders />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/vendor/orders/:orderId" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorOrderDetail />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/vendor/process-order" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <ProcessOrder />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/vendor/wallet" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorWallet />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/vendor/recycling" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorRecycling />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/vendor/settings" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorSettings />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/vendor/add-product" 
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <AddProduct />
          </ProtectedRoute>
        } 
      />
    </>
  );
};

export default VendorRoutes;
