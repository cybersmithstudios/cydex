
import { Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import NewOrder from '../pages/customer/NewOrder';
import Orders from '../pages/customer/Orders';
import OrderDetail from '../pages/customer/OrderDetail';
import Wallet from '../pages/customer/Wallet';
import Recycling from '../pages/customer/Recycling';
import Profile from '../pages/customer/Profile';

const CustomerRoutes = () => {
  return (
    <>
      <Route 
        path="/customer/new-order" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <NewOrder />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/customer/orders" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Orders />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/customer/orders/:orderId" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <OrderDetail />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/customer/wallet" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Wallet />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/customer/recycling" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Recycling />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/customer/profile" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Profile />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/customer/*" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerDashboard />
          </ProtectedRoute>
        } 
      />
    </>
  );
};

export default CustomerRoutes;
