
import React from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, Package, Clock, Leaf, ChevronRight, 
  ArrowUpRight, Wallet, TrendingUp, Calendar 
} from 'lucide-react';
import { useRiderData } from '@/hooks/useRiderData';

const RiderDashboard = () => {
  const { user } = useAuth();
  const {
    loading,
    availableDeliveries,
    currentDeliveries,
    todaysEarnings,
    riderProfile,
    acceptDelivery,
    updateDeliveryStatus
  } = useRiderData();

  if (loading) {
    return (
      <DashboardLayout userRole="RIDER">
        <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate earnings totals
  const totalEarnings = todaysEarnings.reduce((sum, earning) => sum + Number(earning.total_earnings), 0);
  const totalEcoBonus = todaysEarnings.reduce((sum, earning) => sum + Number(earning.eco_bonus), 0);
  const deliveriesCompleted = todaysEarnings.length;
  
  // Calculate progress (assuming daily goal of 10 deliveries)
  const dailyGoal = 10;
  const progressPercentage = Math.min((deliveriesCompleted / dailyGoal) * 100, 100);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'picking_up':
        return <Badge className="bg-blue-500 text-xs">Picking Up</Badge>;
      case 'picked_up':
        return <Badge className="bg-yellow-500 text-xs">Picked Up</Badge>;
      case 'delivering':
        return <Badge className="bg-amber-500 text-xs">Delivering</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500 text-xs">Delivered</Badge>;
      default:
        return <Badge className="text-xs">Unknown</Badge>;
    }
  };

  const handleAcceptOrder = async (orderId: string) => {
    await acceptDelivery(orderId);
  };

  return (
    <DashboardLayout userRole="RIDER">
      <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage your deliveries and track your impact
            </p>
          </div>
          <Badge className={`text-xs sm:text-sm ${riderProfile?.rider_status === 'available' ? 'bg-green-500' : 'bg-gray-500'}`}>
            {riderProfile?.rider_status === 'available' ? 'Available for Deliveries' : 'Offline'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base font-medium">Today's Earnings</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold">₦{totalEarnings.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              <div className="flex items-center mt-1 text-xs sm:text-sm text-green-600">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span>+₦{totalEcoBonus.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})} from eco bonuses</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base font-medium">Carbon Impact</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                {(todaysEarnings.reduce((sum, earning) => sum + Number(earning.carbon_credits_earned || 0), 0) / 1000).toFixed(1)} kg
              </div>
              <p className="text-xs sm:text-sm text-gray-500">CO₂ emissions prevented today</p>
            </CardContent>
          </Card>
          
          <Card className="sm:col-span-2 md:col-span-1">
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base font-medium">Deliveries</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold">{deliveriesCompleted}</div>
              <div className="mt-2">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span>Daily Goal Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2 bg-gray-100" />
              </div>
              <p className="text-xs text-gray-500 mt-2">{Math.max(0, dailyGoal - deliveriesCompleted)} more deliveries to reach your daily goal</p>
            </CardContent>
          </Card>
        </div>

        {currentDeliveries.length > 0 && (
          <Card className="border-2 border-primary animate-pulse-soft">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Current Delivery</CardTitle>
              <CardDescription className="text-sm">Your active delivery in progress</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {currentDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-white rounded-lg">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="p-1.5 sm:p-2 bg-primary-light rounded-full flex-shrink-0">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center flex-wrap gap-1 sm:gap-0">
                          <h3 className="font-medium text-sm sm:text-base truncate">{delivery.vendor_name} → {delivery.customer_name}</h3>
                          <span className="mx-2 text-gray-300 hidden sm:inline">•</span>
                          <span className="text-xs sm:text-sm text-gray-500">{delivery.order_id}</span>
                        </div>
                        <div className="flex items-center mt-1 flex-wrap gap-2">
                          {getStatusBadge(delivery.status)}
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span>ETA: {new Date(delivery.estimated_delivery_time).toLocaleTimeString()}</span>
                          </div>
                        </div>
                        <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                          <span>{delivery.items_count} items</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span>Fee: ₦{Number(delivery.delivery_fee).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-start sm:items-end justify-between mt-3 sm:mt-0 sm:ml-4">
                      <div className="flex items-center text-xs sm:text-sm bg-green-50 text-green-700 px-2 py-1 rounded">
                        <Leaf className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span>{Number(delivery.carbon_saved).toFixed(1)} kg CO₂ saved</span>
                      </div>
                      <div className="mt-3 sm:mt-4 flex space-x-2">
                        <Button variant="outline" size="sm" className="text-xs sm:text-sm h-7 sm:h-8">Contact</Button>
                        <Button 
                          className="bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-7 sm:h-8"
                          onClick={() => {
                            const nextStatus = delivery.status === 'accepted' ? 'picking_up' : 
                                             delivery.status === 'picking_up' ? 'picked_up' :
                                             delivery.status === 'picked_up' ? 'delivering' : 'delivered';
                            updateDeliveryStatus(delivery.id, nextStatus);
                          }}
                        >
                          {delivery.status === 'accepted' ? 'Start Pickup' :
                           delivery.status === 'picking_up' ? 'Picked Up' :
                           delivery.status === 'picked_up' ? 'Start Delivery' : 'Complete'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Available Orders</CardTitle>
            <CardDescription className="text-sm">Choose your next eco-friendly delivery</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 sm:space-y-4">
              {availableDeliveries.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No available orders at the moment</p>
                </div>
              ) : (
                availableDeliveries.slice(0, 3).map((order) => (
                  <div key={order.id} className="bg-white border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="p-1.5 sm:p-2 bg-blue-100 rounded-full flex-shrink-0">
                          <Package className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center flex-wrap gap-1 sm:gap-0">
                            <h3 className="font-medium text-sm sm:text-base truncate">{order.vendor_name} → {order.customer_name}</h3>
                            <span className="mx-2 text-gray-300 hidden sm:inline">•</span>
                            <span className="text-xs sm:text-sm text-gray-500">{order.order_id}</span>
                          </div>
                          <div className="flex items-center mt-1 flex-wrap gap-2">
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                              {Number(order.actual_distance || 1.5).toFixed(1)} miles
                            </Badge>
                            <div className="flex items-center text-xs sm:text-sm text-gray-600">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                              <span>Pickup: {new Date(order.estimated_pickup_time).toLocaleTimeString()}</span>
                            </div>
                          </div>
                          <div className="mt-1 text-xs sm:text-sm text-gray-600">
                            <span>{order.items_count} items</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span>Est. delivery: {new Date(order.estimated_delivery_time).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-start sm:items-end justify-between mt-3 sm:mt-0 sm:ml-4">
                        <div className="text-left sm:text-right">
                          <div className="text-base sm:text-lg font-bold">₦{Number(order.delivery_fee).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                          <div className="text-xs sm:text-sm text-green-600">+₦{Number(order.eco_bonus).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})} eco bonus</div>
                        </div>
                        <Button 
                          className="mt-2 bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-7 sm:h-8"
                          onClick={() => handleAcceptOrder(order.id)}
                        >
                          Accept Order
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">This Week's Schedule</CardTitle>
              <CardDescription className="text-sm">Your upcoming delivery shifts</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 sm:space-y-3">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
                  <div key={day} className="flex justify-between items-center p-2 sm:p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className={`p-1.5 sm:p-2 ${index < 2 ? 'bg-gray-100' : 'bg-primary-light'} rounded-full mr-2 sm:mr-3 flex-shrink-0`}>
                        <Calendar className={`h-4 w-4 sm:h-5 sm:w-5 ${index < 2 ? 'text-gray-500' : 'text-primary'}`} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm sm:text-base">{day}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {index < 2 ? 'Completed' : index === 2 ? 'Today' : 'Upcoming'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-xs sm:text-sm">
                        {index === 4 ? 'Off' : `${2 + index}:00 PM - ${7 + index}:00 PM`}
                      </div>
                      {index < 2 && (
                        <div className="text-xs text-gray-600">
                          {index === 0 ? '6 deliveries' : '8 deliveries'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-3 sm:mt-4 flex items-center justify-center bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9">
                <span>Manage Schedule</span>
                <ArrowUpRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Earnings Overview</CardTitle>
              <CardDescription className="text-sm">Track your income and bonuses</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="mb-4 sm:mb-6">
                <Tabs defaultValue="week">
                  <TabsList className="mb-3 sm:mb-4 w-full">
                    <TabsTrigger value="week" className="text-xs sm:text-sm flex-1">This Week</TabsTrigger>
                    <TabsTrigger value="month" className="text-xs sm:text-sm flex-1">This Month</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="week">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600 text-xs sm:text-sm">Delivery Fees</p>
                        <p className="font-medium text-xs sm:text-sm">₦234,178.25</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600 text-xs sm:text-sm">Eco Bonuses</p>
                        <p className="font-medium text-green-600 text-xs sm:text-sm">+₦43,693.35</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600 text-xs sm:text-sm">Tips</p>
                        <p className="font-medium text-xs sm:text-sm">₦64,390.20</p>
                      </div>
                      <div className="border-t pt-3 flex justify-between items-center">
                        <p className="font-bold text-sm sm:text-base">Total</p>
                        <p className="text-lg sm:text-xl font-bold">₦342,261.80</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="month">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600 text-xs sm:text-sm">Delivery Fees</p>
                        <p className="font-medium text-xs sm:text-sm">₦869,588.83</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600 text-xs sm:text-sm">Eco Bonuses</p>
                        <p className="font-medium text-green-600 text-xs sm:text-sm">+₦137,211.45</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600 text-xs sm:text-sm">Tips</p>
                        <p className="font-medium text-xs sm:text-sm">₦234,564.30</p>
                      </div>
                      <div className="border-t pt-3 flex justify-between items-center">
                        <p className="font-bold text-sm sm:text-base">Total</p>
                        <p className="text-lg sm:text-xl font-bold">₦1,241,364.58</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <Button className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9">
                <Wallet className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span>Withdraw Earnings</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RiderDashboard;
