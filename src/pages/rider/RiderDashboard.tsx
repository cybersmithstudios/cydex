
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

// Mock data for available orders with updated Naira values
const availableOrders = [
  {
    id: 'ORD-2341',
    vendor: 'Eco Grocery',
    customer: 'Sarah Miller',
    distance: '1.2 miles',
    pickupTime: '10 minutes',
    deliveryTime: '25 minutes',
    fee: 13032.35,
    ecoBonus: 1839.72,
    items: 2
  },
  {
    id: 'ORD-2342',
    vendor: 'Green Pharmacy',
    customer: 'John Davis',
    distance: '0.8 miles',
    pickupTime: '5 minutes',
    deliveryTime: '15 minutes',
    fee: 10348.42,
    ecoBonus: 1149.82,
    items: 1
  },
  {
    id: 'ORD-2345',
    vendor: 'Organic Market',
    customer: 'Lisa Wong',
    distance: '1.5 miles',
    pickupTime: '15 minutes',
    deliveryTime: '30 minutes',
    fee: 14181.17,
    ecoBonus: 2299.65,
    items: 3
  }
];

const currentDeliveries = [
  {
    id: 'ORD-2339',
    vendor: 'Zero Waste Store',
    customer: 'Michael Brown',
    status: 'picking-up',
    address: '123 Green St, Ecoville',
    eta: '5 minutes',
    items: 2,
    carbonSaved: 0.6,
    startedAt: '10 minutes ago'
  }
];

const RiderDashboard = () => {
  const { user } = useAuth();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'picking-up':
        return <Badge className="bg-blue-500">Picking Up</Badge>;
      case 'delivering':
        return <Badge className="bg-amber-500">Delivering</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout userRole="RIDER">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-gray-600">
              Manage your deliveries and track your impact
            </p>
          </div>
          <Badge className="text-sm bg-green-500">Available for Deliveries</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Today's Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₦69,755.05</div>
              <div className="flex items-center mt-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+₦19,163.75 from eco bonuses</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Carbon Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3.2 kg</div>
              <p className="text-sm text-gray-500">CO₂ emissions prevented today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <div className="mt-2">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span>Daily Goal Progress</span>
                  <span>50%</span>
                </div>
                <Progress value={50} className="h-2 bg-gray-100" />
              </div>
              <p className="text-xs text-gray-500 mt-2">5 more deliveries to reach your daily goal</p>
            </CardContent>
          </Card>
        </div>

        {currentDeliveries.length > 0 && (
          <Card className="border-2 border-primary animate-pulse-soft">
            <CardHeader>
              <CardTitle>Current Delivery</CardTitle>
              <CardDescription>Your active delivery in progress</CardDescription>
            </CardHeader>
            <CardContent>
              {currentDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-white rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-primary-light rounded-full">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{delivery.vendor} → {delivery.customer}</h3>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{delivery.id}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {getStatusBadge(delivery.status)}
                          <div className="ml-3 flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>ETA: {delivery.eta}</span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          {delivery.address}
                        </p>
                        <div className="mt-2 text-sm text-gray-600">
                          <span>{delivery.items} items</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span>Started {delivery.startedAt}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
                      <div className="flex items-center text-sm bg-green-50 text-green-700 px-2 py-1 rounded">
                        <Leaf className="h-4 w-4 mr-1" />
                        <span>{delivery.carbonSaved} kg CO₂ saved</span>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm">Contact</Button>
                        <Button className="bg-primary hover:bg-primary-hover text-black">Navigate</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Available Orders</CardTitle>
            <CardDescription>Choose your next eco-friendly delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableOrders.map((order) => (
                <div key={order.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{order.vendor} → {order.customer}</h3>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{order.id}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                            {order.distance}
                          </Badge>
                          <div className="ml-3 flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Pickup: {order.pickupTime}</span>
                          </div>
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          <span>{order.items} items</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span>Est. delivery time: {order.deliveryTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
                      <div className="text-right">
                        <div className="text-lg font-bold">₦{order.fee.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                        <div className="text-sm text-green-600">+₦{order.ecoBonus.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})} eco bonus</div>
                      </div>
                      <Button className="mt-2 bg-primary hover:bg-primary-hover text-black">
                        Accept Order
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>This Week's Schedule</CardTitle>
              <CardDescription>Your upcoming delivery shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
                  <div key={day} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className={`p-2 ${index < 2 ? 'bg-gray-100' : 'bg-primary-light'} rounded-full mr-3`}>
                        <Calendar className={`h-5 w-5 ${index < 2 ? 'text-gray-500' : 'text-primary'}`} />
                      </div>
                      <div>
                        <h4 className="font-medium">{day}</h4>
                        <p className="text-sm text-gray-600">
                          {index < 2 ? 'Completed' : index === 2 ? 'Today' : 'Upcoming'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {index === 4 ? 'Off' : `${2 + index}:00 PM - ${7 + index}:00 PM`}
                      </div>
                      {index < 2 && (
                        <div className="text-sm text-gray-600">
                          {index === 0 ? '6 deliveries' : '8 deliveries'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4 flex items-center justify-center bg-primary hover:bg-primary-hover text-black">
                <span>Manage Schedule</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>Track your income and bonuses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Tabs defaultValue="week">
                  <TabsList className="mb-4">
                    <TabsTrigger value="week">This Week</TabsTrigger>
                    <TabsTrigger value="month">This Month</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="week">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Delivery Fees</p>
                        <p className="font-medium">₦234,178.25</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Eco Bonuses</p>
                        <p className="font-medium text-green-600">+₦43,693.35</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Tips</p>
                        <p className="font-medium">₦64,390.20</p>
                      </div>
                      <div className="border-t pt-3 flex justify-between items-center">
                        <p className="font-bold">Total</p>
                        <p className="text-xl font-bold">₦342,261.80</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="month">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Delivery Fees</p>
                        <p className="font-medium">₦869,588.83</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Eco Bonuses</p>
                        <p className="font-medium text-green-600">+₦137,211.45</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Tips</p>
                        <p className="font-medium">₦234,564.30</p>
                      </div>
                      <div className="border-t pt-3 flex justify-between items-center">
                        <p className="font-bold">Total</p>
                        <p className="text-xl font-bold">₦1,241,364.58</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <Button className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-black">
                <Wallet className="mr-2 h-4 w-4" />
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
