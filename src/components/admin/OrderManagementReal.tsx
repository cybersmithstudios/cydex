
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Package, Eye, MoreHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getAllOrders, getOrdersByStatus, updateOrderStatus } from '@/utils/adminUtils';
import { toast } from 'sonner';

// Define the order type to match what we get from Supabase
interface OrderFromSupabase {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method?: string;
  delivery_type: string;
  total_amount: number;
  delivery_fee?: number;
  created_at: string;
  delivered_at?: string;
  customer?: { name: string; email: string } | null;
  rider?: { name: string; email: string } | null;
  vendor?: { name: string; email: string } | null;
  order_items?: Array<{
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }> | null;
}

export function OrderManagementReal() {
  const [orders, setOrders] = useState<OrderFromSupabase[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderFromSupabase[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter, searchQuery]);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const ordersList = await getAllOrders();
      console.log('Loaded orders:', ordersList);
      setOrders(ordersList as OrderFromSupabase[]);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => 
        order.order_number?.toLowerCase().includes(query) ||
        order.customer?.name?.toLowerCase().includes(query) ||
        order.customer?.email?.toLowerCase().includes(query)
      );
    }

    setFilteredOrders(filtered);
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const success = await updateOrderStatus(orderId, newStatus);
      if (success) {
        toast.success(`Order status updated to ${newStatus}`);
        loadOrders();
      } else {
        toast.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-indigo-100 text-indigo-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'ready': return 'bg-cyan-100 text-cyan-800';
      case 'out_for_delivery': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
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

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>
            Monitor and manage all platform orders ({filteredOrders.length} of {orders.length} orders shown).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by order number or customer..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-1.5" onClick={loadOrders}>
                <Filter className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading orders...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2 font-medium">Order</th>
                    <th className="pb-2 font-medium">Customer</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Payment</th>
                    <th className="pb-2 font-medium">Total</th>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="border-b">
                      <td className="py-4">
                        <div>
                          <div className="font-medium">{order.order_number}</div>
                          <div className="text-sm text-gray-600">
                            {order.order_items?.length || 0} items
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.delivery_type}
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div>
                          <div className="font-medium">{order.customer?.name || 'Unknown'}</div>
                          <div className="text-sm text-gray-600">{order.customer?.email || 'No email'}</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge className={getStatusBadgeColor(order.status)}>
                          {formatStatus(order.status)}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Badge className={getPaymentStatusColor(order.payment_status)}>
                          {formatStatus(order.payment_status)}
                        </Badge>
                        {order.payment_method && (
                          <div className="text-xs text-gray-500 mt-1">
                            {order.payment_method}
                          </div>
                        )}
                      </td>
                      <td className="py-4">
                        <div className="font-medium">{formatCurrency(order.total_amount)}</div>
                        {order.delivery_fee && order.delivery_fee > 0 && (
                          <div className="text-xs text-gray-500">
                            +{formatCurrency(order.delivery_fee)} delivery
                          </div>
                        )}
                      </td>
                      <td className="py-4 text-sm">
                        <div>{new Date(order.created_at).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(order.created_at).toLocaleTimeString()}
                        </div>
                        {order.delivered_at && (
                          <div className="text-xs text-green-600">
                            Delivered {new Date(order.delivered_at).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <div className="border-t my-1"></div>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'confirmed')}>
                              Confirm Order
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'processing')}>
                              Start Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'out_for_delivery')}>
                              Out for Delivery
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'delivered')}>
                              Mark Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'cancelled')}>
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredOrders.length === 0 && !isLoading && (
                <div className="text-center py-8 text-gray-500">
                  No orders found matching your criteria.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
