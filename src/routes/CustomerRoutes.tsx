import { Route, Routes } from 'react-router-dom';
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
    <Routes>
      <Route 
        path="/new-order" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="new-order" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <NewOrder />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/orders" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Orders />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="orders/:orderId" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <OrderDetail />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="wallet" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Wallet />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="recycling" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Recycling />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="profile" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Profile />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/*" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default CustomerRoutes;
