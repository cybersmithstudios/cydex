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
import { useRiderData } from '@/hooks/useRiderData';

const AvailableOrdersPage = () => {
  const { availableDeliveries, loading, acceptDelivery } = useRiderData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEco, setFilterEco] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [filteredOrders, setFilteredOrders] = useState(availableDeliveries);

  useEffect(() => {
    let filtered = availableDeliveries;

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.vendor_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterEco) {
      filtered = filtered.filter((order) => Number(order.eco_bonus) > 0);
    }

    if (sortBy === 'distance') {
      filtered.sort((a, b) => Number(a.actual_distance || 0) - Number(b.actual_distance || 0));
    } else if (sortBy === 'fee') {
      filtered.sort((a, b) => Number(a.delivery_fee) - Number(b.delivery_fee));
    } else if (sortBy === 'eco_bonus') {
      filtered.sort((a, b) => Number(b.eco_bonus) - Number(a.eco_bonus));
    }

    setFilteredOrders([...filtered]);
  }, [availableDeliveries, searchQuery, filterEco, sortBy]);

  const handleAcceptOrder = async (orderId: string) => {
    await acceptDelivery(orderId);
  };

  if (loading) {
    return (
      <DashboardLayout userRole="RIDER">
        <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
            {availableDeliveries.length} Available
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
                <Button 
                  variant="outline" 
                  className="text-xs sm:text-sm h-8 sm:h-9"
                  onClick={() => setSortBy(sortBy === 'distance' ? 'fee' : sortBy === 'fee' ? 'eco_bonus' : 'distance')}
                >
                  <SortAsc className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Sort
                </Button>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden mt-4 space-y-3">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No orders match your criteria</p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white border rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <h3 className="font-medium text-sm truncate">{order.vendor_name}</h3>
                          <span className="text-gray-300">→</span>
                          <span className="text-sm text-gray-600 truncate">{order.customer_name}</span>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <span>{order.order_id}</span>
                          <span className="mx-2">•</span>
                          <span>{order.items_count} items</span>
                        </div>
                      </div>
                      {Number(order.eco_bonus) > 0 && (
                        <Leaf className="h-4 w-4 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3 text-xs text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{Number(order.actual_distance || 1.5).toFixed(1)} miles</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{new Date(order.estimated_pickup_time).toLocaleTimeString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-600">
                          ₦{Number(order.delivery_fee).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </div>
                        {Number(order.eco_bonus) > 0 && (
                          <div className="text-xs text-green-500">
                            +₦{Number(order.eco_bonus).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})} eco
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      className="w-full bg-primary hover:bg-primary-hover text-black text-xs h-7"
                      onClick={() => handleAcceptOrder(order.id)}
                    >
                      Accept Order
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto mt-4">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No orders match your criteria</p>
                </div>
              ) : (
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
                        Fee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pickup Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{order.vendor_name}</div>
                            {Number(order.eco_bonus) > 0 && (
                              <Leaf className="ml-1 h-4 w-4 text-green-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{order.customer_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{Number(order.actual_distance || 1.5).toFixed(1)} miles</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-green-600">
                            ₦{Number(order.delivery_fee).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </div>
                          {Number(order.eco_bonus) > 0 && (
                            <div className="text-xs text-green-500">
                              +₦{Number(order.eco_bonus).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})} eco bonus
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(order.estimated_pickup_time).toLocaleTimeString()}
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
              )}
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
