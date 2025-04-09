
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, Clock, MapPin, Search, Filter, 
  ArrowUpDown, Leaf, ChevronRight, AlertCircle 
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data for available orders
const availableOrders = [
  {
    id: 'ORD-2341',
    vendor: 'Eco Grocery',
    customer: 'Sarah Miller',
    distance: '1.2 km',
    pickupTime: '10 minutes',
    deliveryTime: '25 minutes',
    fee: 13032.35,
    ecoBonus: 1839.72,
    items: 2,
    location: 'Ikeja GRA',
    destination: 'Victoria Island',
    type: 'food',
    priority: 'standard'
  },
  {
    id: 'ORD-2342',
    vendor: 'Green Pharmacy',
    customer: 'John Davis',
    distance: '0.8 km',
    pickupTime: '5 minutes',
    deliveryTime: '15 minutes',
    fee: 10348.42,
    ecoBonus: 1149.82,
    items: 1,
    location: 'Lekki Phase 1',
    destination: 'Lekki Phase 2',
    type: 'medicine',
    priority: 'high'
  },
  {
    id: 'ORD-2345',
    vendor: 'Organic Market',
    customer: 'Lisa Wong',
    distance: '1.5 km',
    pickupTime: '15 minutes',
    deliveryTime: '30 minutes',
    fee: 14181.17,
    ecoBonus: 2299.65,
    items: 3,
    location: 'Ikoyi',
    destination: 'Victoria Island',
    type: 'grocery',
    priority: 'standard'
  },
  {
    id: 'ORD-2348',
    vendor: 'Tech Store',
    customer: 'David Johnson',
    distance: '2.3 km',
    pickupTime: '20 minutes',
    deliveryTime: '40 minutes',
    fee: 18500.50,
    ecoBonus: 2500.00,
    items: 1,
    location: 'Ikeja',
    destination: 'Maryland',
    type: 'electronics',
    priority: 'standard'
  },
  {
    id: 'ORD-2350',
    vendor: 'Healthy Bites',
    customer: 'Aisha Mohammed',
    distance: '1.0 km',
    pickupTime: '8 minutes',
    deliveryTime: '20 minutes',
    fee: 9800.25,
    ecoBonus: 1200.00,
    items: 2,
    location: 'Victoria Island',
    destination: 'Ikoyi',
    type: 'food',
    priority: 'high'
  },
  {
    id: 'ORD-2352',
    vendor: 'Fashion Hub',
    customer: 'Tunde Bakare',
    distance: '3.2 km',
    pickupTime: '25 minutes',
    deliveryTime: '50 minutes',
    fee: 21000.75,
    ecoBonus: 3000.50,
    items: 4,
    location: 'Surulere',
    destination: 'Yaba',
    type: 'clothing',
    priority: 'standard'
  }
];

const AvailableOrders = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('distance');
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort orders
  const filteredOrders = availableOrders
    .filter(order => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        order.vendor.toLowerCase().includes(searchLower) || 
        order.id.toLowerCase().includes(searchLower) ||
        order.location.toLowerCase().includes(searchLower) ||
        order.destination.toLowerCase().includes(searchLower);

      // Type filter
      const matchesType = filterType === 'all' || order.type === filterType;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      // Sort options
      switch (sortOption) {
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'fee':
          return b.fee - a.fee;
        case 'pickupTime':
          return parseInt(a.pickupTime) - parseInt(b.pickupTime);
        case 'priority':
          return a.priority === 'high' ? -1 : 1;
        default:
          return 0;
      }
    });

  const handleAcceptOrder = (orderId) => {
    console.log(`Order ${orderId} accepted`);
    // Here you would implement the logic to accept an order
  };

  return (
    <DashboardLayout userRole="rider">
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Available Orders</h1>
            <p className="text-gray-600">Find and accept your next eco-friendly delivery</p>
          </div>
          <Badge className="bg-green-500">Active Status</Badge>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  className="pl-10" 
                  placeholder="Search by vendor, order ID, or location..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => {
                    setSortOption(sortOption === 'distance' ? 'fee' : 'distance');
                  }}
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    Sort by {sortOption === 'distance' ? 'Distance' : 
                             sortOption === 'fee' ? 'Fee' : 
                             sortOption === 'pickupTime' ? 'Pickup Time' : 'Priority'}
                  </span>
                </Button>
              </div>
            </div>

            {/* Expanded Filter Options */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Filter by type:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    className={`cursor-pointer ${filterType === 'all' ? 'bg-primary' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setFilterType('all')}
                  >
                    All
                  </Badge>
                  <Badge 
                    className={`cursor-pointer ${filterType === 'food' ? 'bg-primary' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setFilterType('food')}
                  >
                    Food
                  </Badge>
                  <Badge 
                    className={`cursor-pointer ${filterType === 'grocery' ? 'bg-primary' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setFilterType('grocery')}
                  >
                    Grocery
                  </Badge>
                  <Badge 
                    className={`cursor-pointer ${filterType === 'medicine' ? 'bg-primary' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setFilterType('medicine')}
                  >
                    Medicine
                  </Badge>
                  <Badge 
                    className={`cursor-pointer ${filterType === 'electronics' ? 'bg-primary' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setFilterType('electronics')}
                  >
                    Electronics
                  </Badge>
                  <Badge 
                    className={`cursor-pointer ${filterType === 'clothing' ? 'bg-primary' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setFilterType('clothing')}
                  >
                    Clothing
                  </Badge>
                </div>

                <h4 className="text-sm font-medium mb-2 mt-4">Sort by:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    className={`cursor-pointer ${sortOption === 'distance' ? 'bg-primary' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setSortOption('distance')}
                  >
                    Distance
                  </Badge>
                  <Badge 
                    className={`cursor-pointer ${sortOption === 'fee' ? 'bg-primary' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setSortOption('fee')}
                  >
                    Highest Fee
                  </Badge>
                  <Badge 
                    className={`cursor-pointer ${sortOption === 'pickupTime' ? 'bg-primary' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setSortOption('pickupTime')}
                  >
                    Pickup Time
                  </Badge>
                  <Badge 
                    className={`cursor-pointer ${sortOption === 'priority' ? 'bg-primary' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setSortOption('priority')}
                  >
                    Priority
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available Orders</p>
                <p className="text-2xl font-bold">{filteredOrders.length}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Estimated Earnings</p>
                <p className="text-2xl font-bold">₦{filteredOrders.reduce((sum, order) => sum + order.fee, 0).toLocaleString('en-NG', {maximumFractionDigits: 2})}</p>
              </div>
              <Leaf className="h-8 w-8 text-green-500" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">High Priority</p>
                <p className="text-2xl font-bold">{filteredOrders.filter(o => o.priority === 'high').length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-amber-500" />
            </CardContent>
          </Card>
        </div>

        {/* Order List */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="highValue">High Value</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <ScrollArea className="h-[calc(100vh-350px)] md:h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      {order.priority === 'high' && (
                        <div className="bg-amber-500 text-center py-1 text-white text-xs font-medium">
                          High Priority Order
                        </div>
                      )}
                      <CardContent className="p-0">
                        <div className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="p-3 bg-blue-100 rounded-full">
                                <Package className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <h3 className="font-medium">{order.vendor}</h3>
                                  <span className="mx-2 text-gray-300">•</span>
                                  <span className="text-sm text-gray-500">{order.id}</span>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                                    <span className="text-sm">{order.location} → {order.destination}</span>
                                  </div>
                                  <Badge className="sm:ml-2 w-fit bg-blue-100 text-blue-800 hover:bg-blue-200">
                                    {order.distance}
                                  </Badge>
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>Pickup: {order.pickupTime}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Package className="h-4 w-4 mr-1" />
                                    <span>{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end justify-between mt-4 sm:mt-0">
                              <div className="text-right">
                                <div className="text-lg font-bold">₦{order.fee.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                                <div className="text-sm text-green-600">+₦{order.ecoBonus.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})} eco bonus</div>
                              </div>
                              <Button 
                                className="mt-2 bg-primary hover:bg-primary-hover text-black"
                                onClick={() => handleAcceptOrder(order.id)}
                              >
                                Accept Order
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center p-8">
                    <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium mb-2">No orders found</h3>
                    <p className="text-gray-500">No available orders match your current filters.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="nearby">
            <ScrollArea className="h-[calc(100vh-350px)] md:h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {filteredOrders
                  .filter(order => parseFloat(order.distance) < 1.5)
                  .map((order) => (
                    <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4 sm:p-6">
                        {/* Similar content structure as the "all" tab */}
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                              <Package className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{order.vendor}</h3>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-gray-500">{order.id}</span>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                                  <span className="text-sm">{order.location} → {order.destination}</span>
                                </div>
                                <Badge className="sm:ml-2 w-fit bg-blue-100 text-blue-800 hover:bg-blue-200">
                                  {order.distance}
                                </Badge>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-3 mt-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>Pickup: {order.pickupTime}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Package className="h-4 w-4 mr-1" />
                                  <span>{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end justify-between mt-4 sm:mt-0">
                            <div className="text-right">
                              <div className="text-lg font-bold">₦{order.fee.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                              <div className="text-sm text-green-600">+₦{order.ecoBonus.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})} eco bonus</div>
                            </div>
                            <Button 
                              className="mt-2 bg-primary hover:bg-primary-hover text-black"
                              onClick={() => handleAcceptOrder(order.id)}
                            >
                              Accept Order
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="highValue">
            <ScrollArea className="h-[calc(100vh-350px)] md:h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {filteredOrders
                  .filter(order => order.fee > 15000)
                  .map((order) => (
                    <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4 sm:p-6">
                        {/* Similar content structure as the "all" tab */}
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                              <Package className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{order.vendor}</h3>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-gray-500">{order.id}</span>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                                  <span className="text-sm">{order.location} → {order.destination}</span>
                                </div>
                                <Badge className="sm:ml-2 w-fit bg-blue-100 text-blue-800 hover:bg-blue-200">
                                  {order.distance}
                                </Badge>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-3 mt-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>Pickup: {order.pickupTime}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Package className="h-4 w-4 mr-1" />
                                  <span>{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end justify-between mt-4 sm:mt-0">
                            <div className="text-right">
                              <div className="text-lg font-bold">₦{order.fee.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                              <div className="text-sm text-green-600">+₦{order.ecoBonus.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})} eco bonus</div>
                            </div>
                            <Button 
                              className="mt-2 bg-primary hover:bg-primary-hover text-black"
                              onClick={() => handleAcceptOrder(order.id)}
                            >
                              Accept Order
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AvailableOrders;
