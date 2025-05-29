
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import AdminDashboard from '../pages/admin/AdminDashboard';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route 

        path="/"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AdminRoutes;
