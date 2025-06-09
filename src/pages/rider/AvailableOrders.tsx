
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Navigation, Phone, Leaf } from 'lucide-react';
import { useRiderData } from '@/hooks/useRiderData';
import { OrderFilters } from '@/components/rider/orders/OrderFilters';
import { OrderCard } from '@/components/rider/orders/OrderCard';
import { OrdersTable } from '@/components/rider/orders/OrdersTable';

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

        <OrderFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterEco={filterEco}
          onFilterEcoChange={setFilterEco}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onAcceptOrder={handleAcceptOrder}
            />
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <OrdersTable
            orders={filteredOrders}
            onAcceptOrder={handleAcceptOrder}
          />
        </div>

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
