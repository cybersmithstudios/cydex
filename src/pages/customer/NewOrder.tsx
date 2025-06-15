
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ShoppingCartSidebar } from '@/components/customer/ShoppingCartSidebar';
import { DeliveryScheduler } from '@/components/customer/DeliveryScheduler';
import { useProducts } from '@/hooks/useProducts';
import { supabase } from '@/lib/supabase';
import { PaymentModal } from '@/components/customer/PaymentModal';
import { useCartContext } from '@/contexts/CartContext';
import { VendorRatingModal } from '@/components/customer/VendorRatingModal';
import { FiltersSection } from '@/components/customer/order/FiltersSection';
import { MobileCategoriesSection } from '@/components/customer/order/MobileCategoriesSection';
import { DesktopCategoriesSidebar } from '@/components/customer/order/DesktopCategoriesSidebar';
import { ProductsGrid } from '@/components/customer/order/ProductsGrid';
import { PaginationSection } from '@/components/customer/order/PaginationSection';
import { OrderHeader } from '@/components/customer/order/OrderHeader';

const NewOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
  const itemsPerPage = 12;

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
        const delivery_fee = 1000;
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
            carbon_credits_earned: items.length
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
          is_eco_friendly: true,
          carbon_impact: 1
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
        
        <OrderHeader 
          cartItems={cartItems}
          setIsCartOpen={setIsCartOpen}
        />
        
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

        <FiltersSection 
          isFiltersExpanded={isFiltersExpanded}
          setIsFiltersExpanded={setIsFiltersExpanded}
          selectedCategory={selectedCategory}
          selectedVendor={selectedVendor}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setSelectedVendor={setSelectedVendor}
          vendors={vendors}
        />

        <MobileCategoriesSection 
          isCategoriesExpanded={isCategoriesExpanded}
          setIsCategoriesExpanded={setIsCategoriesExpanded}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
        
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
          <DesktopCategoriesSidebar 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
          
          <ProductsGrid 
            selectedCategory={selectedCategory}
            filteredProducts={filteredProducts}
            currentProducts={currentProducts}
            selectedVendor={selectedVendor}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
            setSelectedVendor={setSelectedVendor}
            addToCart={addToCart}
          />
        </div>

        <PaginationSection 
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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
