<<<<<<< HEAD

=======
>>>>>>> 18b9bac
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
<<<<<<< HEAD
        path="/" 
=======
        index
>>>>>>> 18b9bac
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
<<<<<<< HEAD
        path="/orders" 
=======
        path="orders" 
>>>>>>> 18b9bac
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorOrders />
          </ProtectedRoute>
        } 
      />

      <Route 
<<<<<<< HEAD
        path="/orders/:orderId" 
=======
        path="orders/:orderId" 
>>>>>>> 18b9bac
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorOrderDetail />
          </ProtectedRoute>
        } 
      />

      <Route 
<<<<<<< HEAD
        path="/process-order" 
=======
        path="process-order" 
>>>>>>> 18b9bac
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <ProcessOrder />
          </ProtectedRoute>
        } 
      />

      <Route 
<<<<<<< HEAD
        path="/wallet" 
=======
        path="wallet" 
>>>>>>> 18b9bac
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorWallet />
          </ProtectedRoute>
        } 
      />

      <Route 
<<<<<<< HEAD
        path="/recycling" 
=======
        path="recycling" 
>>>>>>> 18b9bac
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorRecycling />
          </ProtectedRoute>
        } 
      />

      <Route 
<<<<<<< HEAD
        path="/settings" 
=======
        path="settings" 
>>>>>>> 18b9bac
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorSettings />
          </ProtectedRoute>
        } 
      />

      <Route 
<<<<<<< HEAD
        path="/add-product" 
=======
        path="add-product" 
>>>>>>> 18b9bac
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
