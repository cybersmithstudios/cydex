
import React from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { OrderManagementReal } from '@/components/admin/OrderManagementReal';

const AdminOrders = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== 'ADMIN')) {
      navigate('/admin/login');
      return;
    }
  }, [user, loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <DashboardLayout userRole="ADMIN">
      <div className="p-6 max-w-7xl mx-auto">
        <OrderManagementReal />
      </div>
    </DashboardLayout>
  );
};

export default AdminOrders;
