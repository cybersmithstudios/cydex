
import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '@/components/admin/Overview';
import { UserManagement } from '@/components/admin/UserManagement';
import { OrderAnalytics } from '@/components/admin/OrderAnalytics';
import { PaymentsRefunds } from '@/components/admin/PaymentsRefunds';
import { CarbonCredits } from '@/components/admin/CarbonCredits';
import { Partnerships } from '@/components/admin/Partnerships';
import { ContentControl } from '@/components/admin/ContentControl';
import { Security } from '@/components/admin/Security';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const location = useLocation();

  console.log('AdminDashboard - user:', user);

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname.replace('/admin/', '').replace('/admin', '');
    if (path === '' || path === '/') {
      setActiveTab('overview');
    } else {
      setActiveTab(path);
    }
  }, [location.pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'overview') {
      navigate('/admin');
    } else {
      navigate(`/admin/${value}`);
    }
  };

  return (
    <DashboardLayout userRole="ADMIN">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        </div>
        
        <Tabs 
          defaultValue="overview" 
          className="space-y-4"
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="carbon">Carbon Credits</TabsTrigger>
            <TabsTrigger value="partners">Partnerships</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Overview />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrderAnalytics />
          </TabsContent>
          
          <TabsContent value="payments">
            <PaymentsRefunds />
          </TabsContent>
          
          <TabsContent value="carbon">
            <CarbonCredits />
          </TabsContent>
          
          <TabsContent value="partners">
            <Partnerships />
          </TabsContent>
          
          <TabsContent value="content">
            <ContentControl />
          </TabsContent>
          
          <TabsContent value="security">
            <Security />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
