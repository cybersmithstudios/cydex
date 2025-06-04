import React from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Package, Clock, Leaf, ChevronRight, ArrowUpRight, 
  TrendingUp, BarChart3, UserCheck, ShoppingBag, RecycleIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data with updated Naira values (1 USD = 1,533.10 NGN)
const pendingOrders = [
  {
    id: 'ORD-5678',
    customer: 'Emily Johnson',
    status: 'pending',
    createdAt: '5 minutes ago',
    items: 3,
    total: 73579.77 // 47.99 USD
  },
  {
    id: 'ORD-5679',
    customer: 'David Wilson',
    status: 'pending',
    createdAt: '12 minutes ago',
    items: 1,
    total: 28362.35 // 18.50 USD
  }
];

const inProgressOrders = [
  {
    id: 'ORD-5677',
    customer: 'Rachel Green',
    rider: 'Alex Martinez',
    status: 'processing',
    estimatedDelivery: '25 minutes',
    items: 2,
    total: 56341.42 // 36.75 USD
  }
];

const completedOrders = [
  {
    id: 'ORD-5670',
    customer: 'Michael Roberts',
    status: 'delivered',
    completedAt: '1 hour ago',
    items: 4,
    total: 80104.97, // 52.25 USD
    carbonSaved: 0.7
  },
  {
    id: 'ORD-5668',
    customer: 'Sarah Thompson',
    status: 'delivered',
    completedAt: '3 hours ago',
    items: 2,
    total: 45916.34, // 29.95 USD
    carbonSaved: 0.4
  },
  {
    id: 'ORD-5665',
    customer: 'Jennifer Liu',
    status: 'delivered',
    completedAt: 'Yesterday',
    items: 3,
    total: 64083.58, // 41.80 USD
    carbonSaved: 0.6
  }
];

const VendorDashboard = () => {
  const { user } = useAuth();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500 text-xs">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500 text-xs">Processing</Badge>;
      case 'delivering':
        return <Badge className="bg-purple-500 text-xs">Out for Delivery</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500 text-xs">Delivered</Badge>;
      case 'canceled':
        return <Badge className="bg-red-500 text-xs">Canceled</Badge>;
      default:
        return <Badge className="text-xs">Unknown</Badge>;
    }
  };

  const totalOrders = pendingOrders.length + inProgressOrders.length + completedOrders.length;
  const totalSales = [...pendingOrders, ...inProgressOrders, ...completedOrders].reduce(
    (total, order) => total + order.total,
    0
  );
  const totalCarbonSaved = completedOrders.reduce(
    (total, order) => total + (order.carbonSaved || 0),
    0
  );

  return (
    <DashboardLayout userRole="VENDOR">
      <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Section - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage your store and eco-friendly deliveries
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-black w-full sm:w-auto" asChild>
            <Link to="/vendor/add-product">
              <Package className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>

        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <StatsCard
            title="Today's Orders"
            value={`${pendingOrders.length + inProgressOrders.length + completedOrders.length}`}
            subtitle="+3 from yesterday"
            icon={<TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />}
          />
          <StatsCard
            title="Today's Sales"
            value={`₦${(pendingOrders.reduce((total, order) => total + order.total, 0) + 
                                                    inProgressOrders.reduce((total, order) => total + order.total, 0) + 
                      completedOrders.reduce((total, order) => total + order.total, 0)).toLocaleString('en-NG', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`}
            subtitle="+12% from yesterday"
            icon={<TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />}
          />
          <StatsCard
            title="Carbon Impact"
            value={`${completedOrders.reduce((total, order) => total + (order.carbonSaved || 0), 0).toFixed(1)} kg`}
            subtitle="CO₂ saved with eco-delivery"
            isLarge={true}
          />
          <RecyclingCard />
        </div>

        {/* Pending Orders - Mobile Optimized */}
        {pendingOrders.length > 0 && (
          <Card className="border-2 border-amber-400">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Badge className="mr-2 bg-amber-500 text-xs">New</Badge> 
                Pending Orders
              </CardTitle>
              <CardDescription className="text-sm">Orders that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {pendingOrders.map((order) => (
                  <OrderCard key={order.id} order={order} type="pending" />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Management - Mobile Optimized */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">Order Management</CardTitle>
            <CardDescription className="text-sm">Track and manage all your orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="in-progress" className="w-full">
              <TabsList className="mb-3 sm:mb-4 w-full sm:w-auto">
                <TabsTrigger value="in-progress" className="text-xs sm:text-sm">In Progress</TabsTrigger>
                <TabsTrigger value="completed" className="text-xs sm:text-sm">Completed</TabsTrigger>
                <TabsTrigger value="all" className="text-xs sm:text-sm">All Orders</TabsTrigger>
              </TabsList>
              
              <TabsContent value="in-progress">
                {inProgressOrders.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {inProgressOrders.map((order) => (
                      <OrderCard key={order.id} order={order} type="in-progress" />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-10">
                    <p className="text-sm sm:text-base text-gray-500">No orders in progress</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed">
                <div className="space-y-3 sm:space-y-4">
                  {completedOrders.map((order) => (
                    <OrderCard key={order.id} order={order} type="completed" />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="all">
                <div className="text-center py-4">
                  <Button variant="outline" className="mb-4 text-xs sm:text-sm">
                    <BarChart3 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    View Full Order History
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Bottom Cards - Mobile Optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <SustainabilityCard />
          <CustomerInsightsCard />
        </div>
      </div>
    </DashboardLayout>
  );
};

// Helper Components for Mobile Optimization
const StatsCard = ({ title, value, subtitle, icon, isLarge = false }: {
  title: string;
  value: string;
  subtitle: string;
  icon?: React.ReactNode;
  isLarge?: boolean;
}) => (
  <Card className={isLarge ? "col-span-2 lg:col-span-1" : ""}>
    <CardHeader className="pb-1 sm:pb-2">
      <CardTitle className="text-xs sm:text-sm md:text-base font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-1">{value}</div>
      <div className="flex items-center text-xs sm:text-sm text-green-600">
        {icon}
        <span>{subtitle}</span>
      </div>
    </CardContent>
  </Card>
);

const RecyclingCard = () => (
  <Card className="col-span-2 lg:col-span-1">
    <CardHeader className="pb-1 sm:pb-2">
      <CardTitle className="text-xs sm:text-sm md:text-base font-medium">Recycling Rate</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-2">87%</div>
      <div>
        <div className="flex justify-between items-center text-xs mb-1">
          <span>Progress to 90% goal</span>
          <span>87%</span>
        </div>
        <Progress value={87} className="h-1.5 sm:h-2 bg-gray-100" />
      </div>
    </CardContent>
  </Card>
);

const OrderCard = ({ order, type }: { order: any; type: 'pending' | 'in-progress' | 'completed' }) => {
  const getIconBg = () => {
    switch (type) {
      case 'pending': return "bg-amber-100";
      case 'in-progress': return "bg-blue-100";
      case 'completed': return "bg-green-100";
      default: return "bg-gray-100";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'pending': return "text-amber-600";
      case 'in-progress': return "text-blue-600";
      case 'completed': return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="bg-white border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className={`p-1.5 sm:p-2 ${getIconBg()} rounded-full flex-shrink-0`}>
            <Package className={`h-4 w-4 sm:h-6 sm:w-6 ${getIconColor()}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <h3 className="font-medium text-sm sm:text-base truncate">Order from {order.customer}</h3>
              <span className="hidden sm:inline mx-2 text-gray-300">•</span>
              <span className="text-xs sm:text-sm text-gray-500">{order.id}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center mt-1 gap-2 sm:gap-0">
              {/* Badge */}
              <div className="flex items-center">
                <Badge className={`
                  ${type === 'pending' ? 'bg-amber-500' : 
                    type === 'in-progress' ? 'bg-blue-500' : 'bg-green-500'} 
                  text-xs
                `}>
                  {type === 'pending' ? 'Pending' : 
                   type === 'in-progress' ? 'Processing' : 'Delivered'}
                </Badge>
              </div>
              {/* Time info */}
              <div className="flex items-center text-xs sm:text-sm text-gray-600 sm:ml-3">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span>
                  {type === 'pending' ? `Received ${order.createdAt}` :
                   type === 'in-progress' ? `ETA: ${order.estimatedDelivery}` :
                   `Completed ${order.completedAt}`}
                </span>
              </div>
            </div>
            <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
              <span>{order.items} items</span>
              <span className="mx-2 text-gray-300">•</span>
              <span>₦{order.total.toLocaleString('en-NG', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
              {order.rider && (
                <>
                  <span className="hidden sm:inline mx-2 text-gray-300">•</span>
                  <span className="block sm:inline">Rider: {order.rider}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end gap-2">
          {order.carbonSaved && (
            <div className="flex items-center text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
              <Leaf className="h-3 w-3 mr-1" />
              <span>{order.carbonSaved} kg CO₂</span>
            </div>
          )}
          <div className="flex space-x-2">
            {type === 'pending' && (
              <>
                <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                  Reject
                </Button>
                <Button className="bg-primary hover:bg-primary-hover text-black text-xs px-2 py-1">
                  Process
                </Button>
              </>
            )}
            {type === 'in-progress' && (
              <>
                <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                  Contact
                </Button>
                <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                  Details
                </Button>
              </>
            )}
            {type === 'completed' && (
              <Button variant="ghost" size="sm" className="p-1 h-auto">
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SustainabilityCard = () => (
          <Card>
    <CardHeader className="pb-3 sm:pb-6">
      <CardTitle className="text-base sm:text-lg">Sustainability Status</CardTitle>
      <CardDescription className="text-sm">Track your eco-friendly initiatives</CardDescription>
            </CardHeader>
            <CardContent>
      <div className="space-y-3 sm:space-y-4">
        <div className="bg-primary-light/50 p-3 sm:p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-sm sm:text-base">Green Packaging Used</h4>
            <span className="text-base sm:text-lg font-bold">92%</span>
                  </div>
          <Progress value={92} className="h-1.5 sm:h-2" />
                  <p className="text-xs text-gray-600 mt-2">Goal: 95% by next month</p>
                </div>
                
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-xs sm:text-sm">Carbon Offset</h4>
              <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
            <div className="text-lg sm:text-xl font-bold">5.2 tons</div>
                    <p className="text-xs text-gray-600 mt-1">This year</p>
                  </div>
                  
          <div className="p-3 sm:p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-xs sm:text-sm">Recycling Rate</h4>
              <RecycleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
            <div className="text-lg sm:text-xl font-bold">87%</div>
                    <p className="text-xs text-gray-600 mt-1">Packaging returned</p>
                  </div>
                </div>
                
        <Button className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-black text-sm">
                  <span>Sustainability Report</span>
          <ArrowUpRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
);
          
const CustomerInsightsCard = () => (
          <Card>
    <CardHeader className="pb-3 sm:pb-6">
      <CardTitle className="text-base sm:text-lg">Customer Insights</CardTitle>
      <CardDescription className="text-sm">Understanding your eco-conscious customers</CardDescription>
            </CardHeader>
            <CardContent>
      <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center">
            <div className="p-1.5 sm:p-2 bg-purple-100 rounded-full mr-2 sm:mr-3">
              <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    </div>
                    <div>
              <h4 className="font-medium text-sm sm:text-base">Repeat Customers</h4>
              <p className="text-xs sm:text-sm text-gray-600">Last 30 days</p>
                    </div>
                  </div>
          <span className="font-bold text-sm sm:text-base">68%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center">
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-full mr-2 sm:mr-3">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                    <div>
              <h4 className="font-medium text-sm sm:text-base">Average Order Value</h4>
              <p className="text-xs sm:text-sm text-gray-600">Eco-friendly products</p>
                    </div>
                  </div>
          <span className="font-bold text-xs sm:text-sm">₦65,617</span>
                </div>
                
        <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
          <h4 className="font-medium mb-2 text-sm sm:text-base">Popular Eco Categories</h4>
                  <div className="space-y-2">
            <CategoryProgress label="Organic Produce" value={85} />
            <CategoryProgress label="Zero-Waste Items" value={65} />
            <CategoryProgress label="Plant-Based Foods" value={50} />
                  </div>
                </div>
                
        <Button className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-black text-sm">
                  <span>Customer Analytics</span>
          <ArrowUpRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
);

const CategoryProgress = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs sm:text-sm">{label}</span>
    <div className="w-24 sm:w-32">
      <Progress value={value} className="h-1.5 sm:h-2" />
        </div>
      </div>
  );

export default VendorDashboard;
