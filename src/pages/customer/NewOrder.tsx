import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingCart, Filter, X, ChevronDown, ChevronUp
} from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ProductCard } from '@/components/customer/ProductCard';
import { ShoppingCartSidebar } from '@/components/customer/ShoppingCartSidebar';
import { DeliveryScheduler } from '@/components/customer/DeliveryScheduler';
import { useProducts, Product } from '@/hooks/useProducts';
import { useSupabase } from '@/contexts/SupabaseContext';
import { PaymentModal } from '@/components/customer/PaymentModal';
import { useCartContext } from '@/contexts/CartContext';
import { VendorRatingModal } from '@/components/customer/VendorRatingModal';

const NewOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { supabase } = useSupabase();
  const { products, loading } = useProducts();
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    calculateTotal,
    clearCart 
  } = useCartContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<{ id: string; order_number: string; total_amount: number } | null>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratingOrderData, setRatingOrderData] = useState<{
    orderId: string;
    orderNumber: string;
    vendorId: string;
    vendorName: string;
  } | null>(null);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const itemsPerPage = 12; // Increased for better pagination

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  // Get unique vendors from products
  const vendors = Array.from(new Set(products.map(p => ({ 
    id: p.vendor_id, 
    name: p.vendor?.name || 'Unknown Vendor' 
  })).filter(v => v.name !== 'Unknown Vendor')));

  // Filter products based on search, category, and vendor
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.vendor?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesVendor = !selectedVendor || product.vendor_id === selectedVendor;
    
    return matchesSearch && matchesCategory && matchesVendor;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    // Default sort (recommended) - by creation date
    if (sortBy === 'recommended') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return 0;
  });

  // Paginate products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handleCheckout = async () => {
    try {
      if (!user?.id) {
        toast.error('Please log in to place an order');
        return;
      }

      if (cartItems.length === 0) {
        toast.error('Your cart is empty');
        return;
      }

      // Group items by vendor
      const itemsByVendor = cartItems.reduce((acc, item) => {
        if (!acc[item.vendor_id]) {
          acc[item.vendor_id] = [];
        }
        acc[item.vendor_id].push(item);
        return acc;
      }, {} as Record<string, typeof cartItems>);

      let lastOrder = null;

      // Create an order for each vendor
      for (const [vendorId, items] of Object.entries(itemsByVendor)) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery_fee = 1000; // Example fixed delivery fee
        const total_amount = subtotal + delivery_fee;

        // Create the order
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            customer_id: user.id,
            vendor_id: vendorId,
            status: 'pending',
            payment_status: 'pending',
            delivery_type: 'standard',
            delivery_address: {
              street: '123 Example Street',
              city: 'Example City',
              state: 'Example State',
              country: 'Nigeria'
            },
            subtotal,
            delivery_fee,
            total_amount,
            carbon_credits_earned: items.length // Simplified calculation
          })
          .select()
          .single();

        if (orderError) throw orderError;

        // Create order items
        const orderItems = items.map(item => ({
          order_id: order.id,
          product_name: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity,
          is_eco_friendly: true, // Assuming all products are eco-friendly
          carbon_impact: 1 // Simplified impact
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) throw itemsError;

        lastOrder = order;
      }

      if (lastOrder) {
        setCurrentOrder(lastOrder);
        setIsPaymentModalOpen(true);
        setIsCartOpen(false);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  const handlePaymentSuccess = async () => {
    if (!currentOrder) return;

    try {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: 'paid', status: 'processing' })
        .eq('id', currentOrder.id);

      if (error) throw error;

      // Get vendor info for rating modal
      const vendorItem = cartItems.find(item => item.vendor_id);
      if (vendorItem) {
        setRatingOrderData({
          orderId: currentOrder.id,
          orderNumber: currentOrder.order_number,
          vendorId: vendorItem.vendor_id,
          vendorName: vendorItem.vendor_name
        });
        setIsRatingModalOpen(true);
      }

      clearCart();
      setIsPaymentModalOpen(false);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const handlePaymentError = () => {
    toast.error('Payment failed. Please try again.');
  };

  const handleRatingModalClose = () => {
    setIsRatingModalOpen(false);
    setRatingOrderData(null);
    navigate('/customer/orders');
  };

  if (loading) {
    return (
      <DashboardLayout userRole="CUSTOMER">
        <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto">
          <div className="animate-pulse space-y-3">
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 sm:h-12 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-40 sm:h-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="px-2 py-1 sm:p-3 md:p-6 max-w-7xl mx-auto space-y-2 sm:space-y-4">
        
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2 sm:mb-4">
          <div className="flex-1">
            <h1 className="text-base sm:text-xl md:text-2xl font-bold">New Order</h1>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Browse eco-friendly products</p>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 flex-1 sm:flex-initial justify-center text-xs h-7 sm:h-8"
              onClick={() => navigate('/customer')}
            >
              <X className="h-3 w-3" />
              <span className="hidden xs:inline">Cancel</span>
            </Button>
            
            {/* Cart button removed - now handled by mobile header */}
            <div className="lg:flex items-center gap-1 flex-1 sm:flex-initial hidden">
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center gap-1 relative justify-center text-xs h-7 sm:h-8"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-3 w-3" />
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 px-1 py-0 bg-primary text-black text-xs rounded-full min-w-[14px] h-3.5 flex items-center justify-center">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Compact Search Bar */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-7 sm:pl-10 w-full text-xs sm:text-sm h-8 sm:h-9 border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Collapsible Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <button
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className="w-full flex items-center justify-between p-2 sm:p-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
              <span className="text-xs sm:text-sm font-medium">Filters & Sort</span>
              {(selectedCategory || selectedVendor || sortBy !== 'recommended') && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-5">
                  Active
                </Badge>
              )}
            </div>
            {isFiltersExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          
          {isFiltersExpanded && (
            <div className="border-t p-2 sm:p-3 space-y-3">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-600 min-w-[60px]">Sort:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-7 text-xs flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Vendors Filter */}
              <div>
                <span className="text-xs font-medium text-gray-600 block mb-1">Vendors:</span>
                <div className="flex flex-wrap gap-1">
                  <Badge 
                    variant={selectedVendor === null ? "default" : "outline"}
                    className="cursor-pointer text-xs px-2 py-0.5 h-6"
                    onClick={() => setSelectedVendor(null)}
                  >
                    All
                  </Badge>
                  {vendors.slice(0, 4).map(vendor => (
                    <Badge 
                      key={vendor.id} 
                      variant={selectedVendor === vendor.id ? "default" : "outline"}
                      className="cursor-pointer text-xs px-2 py-0.5 h-6"
                      onClick={() => setSelectedVendor(vendor.id)}
                    >
                      {vendor.name.length > 12 ? `${vendor.name.slice(0, 12)}...` : vendor.name}
                    </Badge>
                  ))}
                  {vendors.length > 4 && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5 h-6">
                      +{vendors.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Categories (Collapsible) */}
        <div className="lg:hidden bg-white rounded-lg shadow-sm border overflow-hidden">
          <button
            onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
            className="w-full flex items-center justify-between p-2 sm:p-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-medium">Categories</span>
              {selectedCategory && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-5">
                  {selectedCategory}
                </Badge>
              )}
            </div>
            {isCategoriesExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          
          {isCategoriesExpanded && (
            <div className="border-t p-2 space-y-1">
              <Button
                variant={selectedCategory === null ? "default" : "ghost"}
                className="w-full justify-start text-xs py-1.5 px-2 h-7"
                onClick={() => {
                  setSelectedCategory(null);
                  setIsCategoriesExpanded(false);
                }}
              >
                All Products
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  className="w-full justify-start text-xs py-1.5 px-2 h-7"
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsCategoriesExpanded(false);
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </div>
        
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
          {/* Desktop Categories Sidebar */}
          <div className="hidden lg:block lg:w-1/5">
            <Card className="sticky top-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-2 space-y-1">
                <Button
                  variant={selectedCategory === null ? "default" : "ghost"}
                  className="w-full justify-start text-xs py-1.5 px-2 h-7"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Products
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className="w-full justify-start text-xs py-1.5 px-2 h-7"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Products Header */}
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-medium">
                  {selectedCategory || 'All Products'}
                </h2>
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {filteredProducts.length}
                </Badge>
              </div>
              
              {/* Clear Filters (if any active) */}
              {(selectedCategory || selectedVendor || searchQuery) && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-xs h-6 px-2"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                    setSelectedVendor(null);
                  }}
                >
                  Clear
                </Button>
              )}
            </div>

            {/* Products Grid - Optimized for mobile */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
                {currentProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    addToCart={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      vendor_id: product.vendor_id,
                      vendor_name: product.vendor?.name || 'Unknown Vendor'
                    })} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-lg border">
                <p className="text-gray-500 text-sm mb-2">No products found</p>
                <Button 
                  variant="link" 
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                    setSelectedVendor(null);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Compact Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4 p-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="h-7 px-2 text-xs"
                >
                  ←
                </Button>
                
                <div className="flex items-center gap-1">
                  {/* Show page numbers for small screens */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    if (totalPages <= 5) {
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          className="h-7 w-7 p-0 text-xs"
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                    return null;
                  })}
                  
                  {totalPages > 5 && (
                    <span className="text-xs text-gray-500 px-2">
                      {currentPage} of {totalPages}
                    </span>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="h-7 px-2 text-xs"
                >
                  →
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Shopping Cart Sidebar */}
      <ShoppingCartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartTotal={calculateTotal()}
        proceedToCheckout={handleCheckout}
      />
      
      {/* Payment Modal */}
      {currentOrder && (
        <PaymentModal 
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          amount={currentOrder.total_amount}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          orderNumber={currentOrder.order_number}
        />
      )}
      
      {/* Vendor Rating Modal */}
      {ratingOrderData && (
        <VendorRatingModal 
          isOpen={isRatingModalOpen}
          onClose={handleRatingModalClose}
          vendorId={ratingOrderData.vendorId}
          vendorName={ratingOrderData.vendorName}
          orderId={ratingOrderData.orderId}
          orderNumber={ratingOrderData.orderNumber}
        />
      )}
      
      {/* Delivery Scheduler Dialog */}
      <DeliveryScheduler 
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
        cartTotal={calculateTotal()}
        onScheduleDelivery={handleCheckout}
      />
    </DashboardLayout>
  );
};

export default NewOrder;
