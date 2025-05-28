<<<<<<< HEAD

=======
>>>>>>> 18b9bac
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
<<<<<<< HEAD
        path="/" 
=======
        index
>>>>>>> 18b9bac
        element={
          <ProtectedRoute allowedRoles={['rider']}>
            <RiderDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
<<<<<<< HEAD
        path="/available" 
=======
        path="available" 
>>>>>>> 18b9bac
        element={
          <ProtectedRoute allowedRoles={['rider']}>
            <AvailableOrders />
          </ProtectedRoute>
        } 
      />

      <Route 
<<<<<<< HEAD
        path="/current" 
=======
        path="current" 
>>>>>>> 18b9bac
        element={
          <ProtectedRoute allowedRoles={['rider']}>
            <CurrentDeliveries />
          </ProtectedRoute>
        } 
      />

      <Route 
<<<<<<< HEAD
        path="/earnings" 
=======
        path="earnings" 
>>>>>>> 18b9bac
        element={
          <ProtectedRoute allowedRoles={['rider']}>
            <RiderEarnings />
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
          <ProtectedRoute allowedRoles={['rider']}>
            <RiderProfile />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default RiderRoutes;
