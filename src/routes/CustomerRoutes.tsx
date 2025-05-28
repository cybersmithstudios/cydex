<<<<<<< HEAD

=======
>>>>>>> 18b9bac
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
<<<<<<< HEAD
        path="/new-order" 
=======
        index
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="new-order" 
>>>>>>> 18b9bac
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <NewOrder />
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
          <ProtectedRoute allowedRoles={['customer']}>
            <Orders />
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
          <ProtectedRoute allowedRoles={['customer']}>
            <OrderDetail />
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
          <ProtectedRoute allowedRoles={['customer']}>
            <Wallet />
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
          <ProtectedRoute allowedRoles={['customer']}>
            <Recycling />
          </ProtectedRoute>
        } 
      />
      
      <Route 
<<<<<<< HEAD
        path="/profile" 
=======
        path="profile" 
>>>>>>> 18b9bac
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Profile />
          </ProtectedRoute>
        } 
      />
<<<<<<< HEAD
      
      <Route 
        path="/*" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerDashboard />
          </ProtectedRoute>
        } 
      />
=======
>>>>>>> 18b9bac
    </Routes>
  );
};

export default CustomerRoutes;
