
import { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
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
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  return (
    <DashboardLayout userRole="admin">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        </div>
        
        <Tabs 
          defaultValue="overview" 
          className="space-y-4"
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            navigate(`/admin/${value !== 'overview' ? value : ''}`);
          }}
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
          
          <Routes>
            <Route index element={<Overview />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="orders" element={<OrderAnalytics />} />
            <Route path="payments" element={<PaymentsRefunds />} />
            <Route path="carbon" element={<CarbonCredits />} />
            <Route path="partners" element={<Partnerships />} />
            <Route path="content" element={<ContentControl />} />
            <Route path="security" element={<Security />} />
          </Routes>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
