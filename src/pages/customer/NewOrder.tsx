
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ShoppingCartSidebar } from '@/components/customer/ShoppingCartSidebar';
import { DeliveryScheduler } from '@/components/customer/DeliveryScheduler';
import { useProducts } from '@/hooks/useProducts';
import { supabase } from '@/lib/supabase';
import { PaymentModal } from '@/components/customer/PaymentModal';
import { useCartContext } from '@/contexts/CartContext';
import { VendorRatingModal } from '@/components/customer/VendorRatingModal';
import { VendorSelectionPage } from '@/components/customer/VendorSelectionPage';
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
  const [selectedVendorName, setSelectedVendorName] = useState<string | null>(null);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'pending' | 'paid' | 'processing' | 'completed' | 'cancelled'>('pending');
  const [currentOrder, setCurrentOrder] = useState<{ 
    id: string; 
    order_number: string; 
    total_amount: number;
    payment_reference?: string;
    status: string;
    created_at: string;
    items?: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
    }>;
  } | null>(null);
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

  // Filter products to only show those from selected vendor with valid vendor info
  const filteredProducts = products.filter(product => {
    // Only show products with valid vendor
    if (!product.vendor || !product.vendor_id) return false;
    
    // Only show products from selected vendor
    if (selectedVendor && product.vendor_id !== selectedVendor) return false;
    
    // Apply search filter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.vendor?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from filtered products
  const categories = Array.from(new Set(filteredProducts.map(p => p.category).filter(Boolean)));

  // Get unique vendors from products (for backup)
  const vendors = Array.from(new Set(products.map(p => ({ 
    id: p.vendor_id, 
    name: p.vendor?.name || 'Unknown Vendor' 
  })).filter(v => v.name !== 'Unknown Vendor')));

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

  const handleVendorSelect = (vendorId: string, vendorName: string) => {
    setSelectedVendor(vendorId);
    setSelectedVendorName(vendorName);
    clearCart(); // Clear cart when switching vendors
  };

  const handleBackToVendors = () => {
    setSelectedVendor(null);
    setSelectedVendorName(null);
    setSelectedCategory(null);
    setSearchQuery('');
    clearCart(); // Clear cart when going back to vendor selection
  };

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

      if (!selectedVendor) {
        toast.error('Please select a vendor first');
        return;
      }

      // Verify all items are from the same vendor
      const vendorIds = Array.from(new Set(cartItems.map(item => item.vendor_id)));
      if (vendorIds.length > 1) {
        toast.error('All items must be from the same vendor');
        return;
      }

      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const delivery_fee = 1000;
      const total_amount = subtotal + delivery_fee;

      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: user.id,
          vendor_id: selectedVendor,
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
          carbon_credits_earned: cartItems.length
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
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

      setCurrentOrder(order);
      setIsPaymentModalOpen(true);
      setIsCartOpen(false);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  const handlePaymentSuccess = async (reference: string) => {
    if (!currentOrder) return;

    try {
      // Update order with payment reference and status
      const { data: updatedOrder, error } = await supabase
        .from('orders')
        .update({ 
          payment_status: 'paid', 
          status: 'processing',
          payment_reference: reference,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentOrder.id)
        .select('*')
        .single();

      if (error) throw error;

      // Update local state with the updated order
      setCurrentOrder({
        ...currentOrder,
        ...updatedOrder,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      });
      
      setOrderStatus('paid');
      clearCart();
      setIsPaymentModalOpen(false);
      
      // Show success message
      toast.success('Payment successful! Your order is being processed.');
      
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Payment successful but there was an issue updating your order. Please contact support.');
      setIsPaymentModalOpen(false);
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

  // Show order success view if order is paid
  if (orderStatus === 'paid' && currentOrder) {
    return (
      <DashboardLayout userRole="CUSTOMER">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Order Confirmed!</h2>
              <p className="mt-2 text-gray-600">Thank you for your order #{currentOrder.order_number}</p>
              <p className="text-gray-500 text-sm">A confirmation has been sent to your email</p>
            </div>

            {/* Order Summary */}
            <div className="border-t border-b border-gray-200 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                {currentOrder.items?.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex">
                      <span className="text-gray-600">{item.quantity} × {item.name}</span>
                    </div>
                    <span className="text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>₦{currentOrder.total_amount?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status</h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  <li>
                    <div className="relative pb-8">
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                            <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">Order confirmed</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            Just now
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="relative pb-8">
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                            <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">Processing your order</p>
                            <p className="text-sm text-gray-400">We're preparing your items</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="relative pb-8">
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-white">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">Order completed</p>
                            <p className="text-sm text-gray-400">We'll notify you when it's ready</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => navigate('/customer/orders')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                View all orders
              </button>
              <button
                onClick={() => {
                  setCurrentOrder(null);
                  setOrderStatus('pending');
                  navigate('/customer/new-order');
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Place another order
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show vendor selection if no vendor is selected
  if (!selectedVendor) {
    return (
      <DashboardLayout userRole="CUSTOMER">
        <div className="px-2 py-1 sm:p-3 md:p-6 max-w-7xl mx-auto">
          <VendorSelectionPage onVendorSelect={handleVendorSelect} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="px-2 py-1 sm:p-3 md:p-6 max-w-7xl mx-auto space-y-2 sm:space-y-4">
        
        {/* Vendor Header with Back Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToVendors}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Vendors
            </Button>
            <div className="border-l h-6 border-gray-200"></div>
            <div>
              <h1 className="text-xl font-bold">{selectedVendorName}</h1>
              <p className="text-sm text-gray-600">Browse menu and add items to cart</p>
            </div>
          </div>
          
          {/* Cart Button for Desktop */}
          <div className="hidden lg:block">
            <Button
              variant="default"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2"
            >
              Cart ({cartItems.length})
            </Button>
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
          onClose={() => {
            setIsPaymentModalOpen(false);
            // Only clear cart if payment was not successful
            if (!currentOrder?.payment_reference) {
              clearCart();
            }
          }}
          amount={currentOrder?.total_amount || 0}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          orderNumber={currentOrder?.order_number || ''}
          customerEmail={user?.email || ''}
          customerId={user?.id}
          metadata={{
            order_id: currentOrder?.id,
            user_id: user?.id,
            items: cartItems.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price
            }))
          }}
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
