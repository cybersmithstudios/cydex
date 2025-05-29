import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import RiderDashboard from '../pages/rider/RiderDashboard';
import AvailableOrders from '../pages/rider/AvailableOrders';
import CurrentDeliveries from '../pages/rider/CurrentDeliveries';
import RiderEarnings from '../pages/rider/Earnings';
import RiderProfile from '../pages/rider/Profile';

const RiderRoutes = () => {
  return (
    <Routes>
      <Route 
        path  ="/" 
        element={
          <ProtectedRoute allowedRoles={['rider']}>
            <RiderDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/available" 
        element={
          <ProtectedRoute allowedRoles={['rider']}>
            <AvailableOrders />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/current" 
        element={
          <ProtectedRoute allowedRoles={['rider']}>
            <CurrentDeliveries />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/earnings" 
        element={
          <ProtectedRoute allowedRoles={['rider']}>
            <RiderEarnings />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/profile" 
        element={
          <ProtectedRoute allowedRoles={['rider']}>
            <RiderProfile />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default RiderRoutes;
