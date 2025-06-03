import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Package, Clock, MapPin, Leaf, Search, Filter, SortAsc,
  Navigation, Phone, Star, TrendingUp
} from 'lucide-react';

// Mock data for available orders with updated Naira values
const mockOrders = [
  {
    id: 'ORD-2341',
    vendor: 'Eco Grocery',
    customer: 'Sarah Miller',
    distance: '1.2 miles',
    pickupTime: '10 minutes',
    deliveryTime: '25 minutes',
    fee: 13032.35,
    ecoBonus: 1839.72,
    items: 2,
    rating: 4.5,
    isEcoFriendly: true
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
    items: 1,
    rating: 4.8,
    isEcoFriendly: true
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
    items: 3,
    rating: 4.2,
    isEcoFriendly: true
  },
  {
    id: 'ORD-2348',
    vendor: 'Sustainable Home',
    customer: 'Emily Clark',
    distance: '2.0 miles',
    pickupTime: '20 minutes',
    deliveryTime: '35 minutes',
    fee: 15331.00,
    ecoBonus: 2500.00,
    items: 4,
    rating: 4.9,
    isEcoFriendly: true
  },
  {
    id: 'ORD-2350',
    vendor: 'Zero Waste Store',
    customer: 'Kevin Lee',
    distance: '0.5 miles',
    pickupTime: '3 minutes',
    deliveryTime: '10 minutes',
    fee: 9198.60,
    ecoBonus: 919.86,
    items: 1,
    rating: 4.6,
    isEcoFriendly: true
  }
];

const AvailableOrdersPage = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEco, setFilterEco] = useState(false);
  const [sortBy, setSortBy] = useState('distance');

  useEffect(() => {
    let filteredOrders = mockOrders;

    if (searchQuery) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterEco) {
      filteredOrders = filteredOrders.filter((order) => order.isEcoFriendly);
    }

    if (sortBy === 'distance') {
      filteredOrders.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    } else if (sortBy === 'fee') {
      filteredOrders.sort((a, b) => a.fee - b.fee);
    } else if (sortBy === 'rating') {
      filteredOrders.sort((a, b) => b.rating - a.rating);
    }

    setOrders([...filteredOrders]);
  }, [searchQuery, filterEco, sortBy]);

  const handleAcceptOrder = (orderId: string) => {
    alert(`Order ${orderId} accepted!`);
    // In a real app, you would make an API call to accept the order
  };

  return (
    <DashboardLayout userRole="RIDER">
      <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Available Orders</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Accept eco-friendly deliveries and earn bonuses
            </p>
          </div>
          <Badge className="text-xs sm:text-sm bg-green-500">
            <TrendingUp className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            High Demand
          </Badge>
        </div>

        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Find Your Next Delivery</CardTitle>
            <CardDescription className="text-sm">
              Explore available orders and accept the ones that fit your route
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col sm:grid sm:grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="md:col-span-2">
                <Input
                  type="text"
                  placeholder="Search by vendor or customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm sm:text-base h-8 sm:h-9"
                />
              </div>
              <div className="flex items-center justify-start sm:justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setFilterEco(!filterEco)}
                  className={`text-xs sm:text-sm h-8 sm:h-9 ${filterEco ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}`}
                >
                  <Leaf className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Eco-Friendly</span>
                  <span className="sm:hidden">Eco</span>
                </Button>
                <Button variant="outline" className="text-xs sm:text-sm h-8 sm:h-9">
                  <Filter className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden mt-4 space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <h3 className="font-medium text-sm truncate">{order.vendor}</h3>
                        <span className="text-gray-300">→</span>
                        <span className="text-sm text-gray-600 truncate">{order.customer}</span>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>{order.id}</span>
                        <span className="mx-2">•</span>
                        <span>{order.items} items</span>
                      </div>
                    </div>
                    <div className="flex items-center ml-2">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-xs text-gray-500">{order.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3 text-xs text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{order.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{order.pickupTime}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">
                        ₦{order.fee.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </div>
                      <div className="text-xs text-green-500">
                        +₦{order.ecoBonus.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})} eco
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full bg-primary hover:bg-primary-hover text-black text-xs h-7"
                    onClick={() => handleAcceptOrder(order.id)}
                  >
                    Accept Order
                  </Button>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Distance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Fee
                        <Button variant="ghost" size="icon" onClick={() => setSortBy('fee')}>
                          <SortAsc className="h-4 w-4" />
                        </Button>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        Rating
                        <Button variant="ghost" size="icon" onClick={() => setSortBy('rating')}>
                          <SortAsc className="h-4 w-4" />
                        </Button>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.vendor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.customer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.distance}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">
                          ₦{order.fee.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </div>
                        <div className="text-xs text-green-500">
                          +₦{order.ecoBonus.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})} eco bonus
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-500">{order.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          className="bg-primary hover:bg-primary-hover text-black"
                          onClick={() => handleAcceptOrder(order.id)}
                        >
                          Accept Order
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Delivery Tips</CardTitle>
            <CardDescription className="text-sm">
              Maximize your earnings and sustainability impact
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-3">
                <Navigation className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-medium">Plan Your Route</h3>
                  <p className="text-xs text-gray-500">
                    Optimize your route to save time and reduce emissions.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-medium">Communicate with Customers</h3>
                  <p className="text-xs text-gray-500">
                    Keep customers informed about their delivery status.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-medium">Choose Eco-Friendly Options</h3>
                  <p className="text-xs text-gray-500">
                    Prioritize deliveries with eco-friendly vendors for extra bonuses.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AvailableOrdersPage;
