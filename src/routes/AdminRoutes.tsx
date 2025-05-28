<<<<<<< HEAD

=======
>>>>>>> 18b9bac
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import AdminDashboard from '../pages/admin/AdminDashboard';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route 
<<<<<<< HEAD
        path="/" 
=======
        path="*" 
>>>>>>> 18b9bac
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AdminRoutes;
