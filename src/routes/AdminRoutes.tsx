
import { Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import AdminDashboard from '../pages/admin/AdminDashboard';

const AdminRoutes = () => {
  return (
    <>
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
    </>
  );
};

export default AdminRoutes;
