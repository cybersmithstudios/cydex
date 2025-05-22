
import { Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import RiderDashboard from '../pages/rider/RiderDashboard';
import AvailableOrders from '../pages/rider/AvailableOrders';
import CurrentDeliveries from '../pages/rider/CurrentDeliveries';
import RiderEarnings from '../pages/rider/Earnings';
import RiderProfile from '../pages/rider/Profile';

const RiderRoutes = () => {
  return (
    <>
      <Route 
        path="/rider" 
        element={
          <ProtectedRoute allowedRoles={['rider']}>
            <RiderDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/rider/available" 
        element={
          <ProtectedRoute allowedRoles={['rider']}>
            <AvailableOrders />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/rider/current" 
        element={
          <ProtectedRoute allowedRoles={['rider']}>
            <CurrentDeliveries />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/rider/earnings" 
        element={
          <ProtectedRoute allowedRoles={['rider']}>
            <RiderEarnings />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/rider/profile" 
        element={
          <ProtectedRoute allowedRoles={['rider']}>
            <RiderProfile />
          </ProtectedRoute>
        } 
      />
    </>
  );
};

export default RiderRoutes;
