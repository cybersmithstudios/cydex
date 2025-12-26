import React from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserManagementReal } from '@/components/admin/UserManagementReal';
import { isAdmin } from '@/utils/adminUtils';

const AdminUsers = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin(user))) {
      navigate('/admin/login');
      return;
    }
  }, [user, loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin(user)) {
    return null;
  }

  return (
    <DashboardLayout userRole="ADMIN">
      <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto">
        <UserManagementReal />
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
