import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  ShoppingBag, 
  Truck, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Package
} from 'lucide-react';
import { getAllUsers, updateUserRole, getSystemStats, updateUserStatus } from '@/utils/adminUtils';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  verified: boolean;
  created_at: string;
  last_login_at?: string;
  login_count?: number;
}

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  admins: number;
  vendors: number;
  riders: number;
  customers: number;
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

const AdminDashboard = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    activeUsers: 0,
    admins: 0,
    vendors: 0,
    riders: 0,
    customers: 0,
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: 0
  });
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== 'ADMIN')) {
      navigate('/admin/login');
      return;
    }

    if (user?.role === 'ADMIN') {
      loadUsers();
      loadStats();
    }
  }, [user, loading, isAuthenticated, navigate]);

  const loadUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const usersList = await getAllUsers();
      setUsers(usersList);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const loadStats = async () => {
    setIsLoadingStats(true);
    try {
      const systemStats = await getSystemStats();
      setStats(systemStats);
    } catch (error) {
      console.error('Error loading stats:', error);
      toast.error('Failed to load system statistics');
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const success = await updateUserRole(userId, newRole);
      if (success) {
        toast.success(`User role updated to ${newRole}`);
        loadUsers();
        loadStats(); // Refresh stats after role change
      } else {
        toast.error('Failed to update user role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update user role');
    }
  };

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      const success = await updateUserStatus(userId, newStatus);
      if (success) {
        toast.success(`User status updated to ${newStatus}`);
        loadUsers();
        loadStats(); // Refresh stats after status change
      } else {
        toast.error('Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update user status');
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'vendor': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'rider': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'customer': return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      case 'banned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null; // Will redirect in useEffect
  }

  return (
    <DashboardLayout userRole="ADMIN">
      <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">System Administration</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Welcome back, {user?.name}. Manage your platform from here.
            </p>
          </div>
          <Badge className="bg-red-100 text-red-800 px-2 sm:px-3 py-1 text-xs sm:text-sm">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Administrator
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Total Users</CardTitle>
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">
                {isLoadingStats ? '...' : stats.totalUsers}
              </div>
              <p className="text-xs text-muted-foreground">
                {isLoadingStats ? '...' : stats.activeUsers} active accounts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">
                {isLoadingStats ? '...' : stats.totalOrders}
              </div>
              <p className="text-xs text-muted-foreground">
                {isLoadingStats ? '...' : stats.pendingOrders} pending orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">
                {isLoadingStats ? '...' : formatCurrency(stats.monthlyRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                {isLoadingStats ? '...' : stats.deliveredOrders} delivered this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Platform Health</CardTitle>
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">Healthy</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Role Distribution */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm">Vendors</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-base sm:text-lg md:text-xl font-bold text-blue-600">
                {isLoadingStats ? '...' : stats.vendors}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm">Riders</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-base sm:text-lg md:text-xl font-bold text-green-600">
                {isLoadingStats ? '...' : stats.riders}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm">Customers</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-base sm:text-lg md:text-xl font-bold text-purple-600">
                {isLoadingStats ? '...' : stats.customers}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm">Admins</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-base sm:text-lg md:text-xl font-bold text-red-600">
                {isLoadingStats ? '...' : stats.admins}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">User Management</CardTitle>
            <CardDescription className="text-sm">
              Manage user roles and permissions across the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoadingUsers ? (
              <div className="text-center py-6 sm:py-8">
                <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-gray-600 text-sm">Loading users...</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {users.slice(0, 10).map((user) => (
                  <div key={user.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-3 sm:gap-4">
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-sm sm:text-base truncate">{user.name}</h3>
                          {user.verified ? (
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{user.email}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1">
                          <p className="text-xs text-gray-500">
                            Joined {new Date(user.created_at).toLocaleDateString()}
                          </p>
                          {user.last_login_at && (
                            <p className="text-xs text-gray-500">
                              <span className="hidden sm:inline">• </span>Last login {new Date(user.last_login_at).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        <Badge className={`${getRoleBadgeColor(user.role)} text-xs`}>
                          {user.role}
                        </Badge>
                        <Badge className={`${getStatusBadgeColor(user.status)} text-xs`}>
                          {user.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-1">
                        {['customer', 'vendor', 'rider', 'admin'].map((role) => (
                          <Button
                            key={role}
                            variant={user.role?.toLowerCase() === role ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleRoleChange(user.id, role)}
                            disabled={user.role?.toLowerCase() === role}
                            className="text-xs h-6 sm:h-8 px-2 sm:px-3"
                          >
                            {role}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {users.length > 10 && (
                  <div className="text-center pt-3 sm:pt-4">
                    <Button variant="outline" onClick={() => navigate('/admin/users')} className="text-xs sm:text-sm h-8 sm:h-9">
                      View All Users ({users.length})
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Alert>
          <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
          <AlertDescription className="text-xs sm:text-sm">
            You are currently logged in with administrator privileges. Please use these permissions responsibly and ensure your account remains secure.
          </AlertDescription>
        </Alert>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
