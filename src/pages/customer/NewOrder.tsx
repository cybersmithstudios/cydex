import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingCart, Filter, X
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
import { Plus, Minus, Leaf } from 'lucide-react';

// Mock data for vendors
const vendors = [
  { id: 'v1', name: 'Green Grocers', rating: 4.8, eco_rating: 5, deliveryTime: '25-35 min' },
  { id: 'v2', name: 'Organic Delights', rating: 4.6, eco_rating: 4, deliveryTime: '30-45 min' },
  { id: 'v3', name: 'Farm to Table', rating: 4.9, eco_rating: 5, deliveryTime: '20-30 min' },
  { id: 'v4', name: 'Fresh Picks', rating: 4.7, eco_rating: 4, deliveryTime: '35-50 min' },
  { id: 'v5', name: 'Nature\'s Bounty', rating: 4.5, eco_rating: 5, deliveryTime: '25-40 min' },
];

// Mock data for product categories
const categories = [
  'All Products',
  'Vegetables',
  'Fruits',
  'Dairy',
  'Bakery',
  'Organic',
  'Beverages',
  'Snacks'
];

// Mock data for products
const allProducts = [
  { 
    id: 'p1', 
    name: 'Organic Tomatoes', 
    price: 1500, 
    image: '/placeholder.svg', 
    vendor: 'Green Grocers',
    vendorId: 'v1',
    rating: 4.7,
    category: 'Vegetables',
    eco_friendly: true,
    description: 'Locally grown organic tomatoes. Perfect for salads and cooking.',
    weight: '500g'
  },
  { 
    id: 'p2', 
    name: 'Fresh Avocados', 
    price: 2000, 
    image: '/placeholder.svg', 
    vendor: 'Organic Delights',
    vendorId: 'v2',
    rating: 4.8,
    category: 'Fruits',
    eco_friendly: true,
    description: 'Ripe and ready to eat avocados. Rich in nutrients and healthy fats.',
    weight: '2 pieces'
  },
  { 
    id: 'p3', 
    name: 'Brown Eggs', 
    price: 2500, 
    image: '/placeholder.svg', 
    vendor: 'Farm to Table',
    vendorId: 'v3',
    rating: 4.9,
    category: 'Dairy',
    eco_friendly: true,
    description: 'Free-range brown eggs from locally raised chickens.',
    weight: '12 pieces'
  },
  { 
    id: 'p4', 
    name: 'Whole Wheat Bread', 
    price: 1800, 
    image: '/placeholder.svg', 
    vendor: 'Fresh Picks',
    vendorId: 'v4',
    rating: 4.6,
    category: 'Bakery',
    eco_friendly: false,
    description: 'Freshly baked whole wheat bread, perfect for sandwiches.',
    weight: '450g'
  },
  { 
    id: 'p5', 
    name: 'Organic Spinach', 
    price: 1200, 
    image: '/placeholder.svg', 
    vendor: 'Green Grocers',
    vendorId: 'v1',
    rating: 4.7,
    category: 'Vegetables',
    eco_friendly: true,
    description: 'Fresh organic spinach leaves, rich in iron and vitamins.',
    weight: '250g'
  },
  { 
    id: 'p6', 
    name: 'Organic Apples', 
    price: 3000, 
    image: '/placeholder.svg', 
    vendor: 'Organic Delights',
    vendorId: 'v2',
    rating: 4.8,
    category: 'Fruits',
    eco_friendly: true,
    description: 'Crisp and sweet organic apples, perfect for snacking.',
    weight: '1kg'
  },
  { 
    id: 'p7', 
    name: 'Greek Yogurt', 
    price: 2200, 
    image: '/placeholder.svg', 
    vendor: 'Farm to Table',
    vendorId: 'v3',
    rating: 4.5,
    category: 'Dairy',
    eco_friendly: false,
    description: 'Creamy Greek yogurt, high in protein and probiotics.',
    weight: '500g'
  },
  { 
    id: 'p8', 
    name: 'Sourdough Bread', 
    price: 3500, 
    image: '/placeholder.svg', 
    vendor: 'Fresh Picks',
    vendorId: 'v4',
    rating: 4.9,
    category: 'Bakery',
    eco_friendly: true,
    description: 'Artisanal sourdough bread, made with traditional methods.',
    weight: '500g'
  },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  vendor_id: string;
  vendor_name: string;
}

const NewOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { supabase } = useSupabase();
  const { products, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        vendor_id: product.vendor_id,
        vendor_name: product.vendor?.name || 'Unknown Vendor'
      }];
    });
    toast.success('Added to cart');
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.success('Removed from cart');
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) return item;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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

      // Group items by vendor
      const itemsByVendor = cartItems.reduce((acc, item) => {
        if (!acc[item.vendor_id]) {
          acc[item.vendor_id] = [];
        }
        acc[item.vendor_id].push(item);
        return acc;
      }, {} as Record<string, CartItem[]>);

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
            order_number: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
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
      }

      toast.success('Orders placed successfully!');
      navigate('/customer/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (loading) {
    return (
      <DashboardLayout userRole="CUSTOMER">
        <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="p-2 sm:p-3 md:p-6 max-w-7xl mx-auto">
        {/* Header - Improved mobile layout */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3 sm:mb-4 md:mb-6">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">New Order</h1>
            <p className="text-xs sm:text-sm text-gray-600">Browse eco-friendly products and schedule deliveries</p>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-initial justify-center text-xs sm:text-sm h-8 sm:h-9"
              onClick={() => navigate('/customer')}
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Cancel</span>
            </Button>
            
            <Button 
              variant="default" 
              size="sm" 
              className="flex items-center gap-1 sm:gap-2 relative flex-1 sm:flex-initial justify-center text-xs sm:text-sm h-8 sm:h-9"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 px-1 py-0 bg-primary text-black text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
        
        {/* Search and Filters - Improved mobile layout */}
        <div className="bg-white rounded-lg shadow-sm border p-2 sm:p-3 md:p-4 mb-3 sm:mb-4 md:mb-6">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="relative w-full">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
              <Input
                type="text"
                placeholder="Search products, vendors..."
                className="pl-8 sm:pl-10 w-full text-xs sm:text-sm h-8 sm:h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[140px] h-8 sm:h-9 text-xs sm:text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-initial justify-center text-xs sm:text-sm h-8 sm:h-9">
                <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Filters</span>
              </Button>
            </div>
          </div>
          
          <div className="mt-2 sm:mt-3 md:mt-4">
            <div className="flex flex-wrap items-center gap-y-2">
              <span className="text-xs sm:text-sm text-gray-500 mr-2">Vendors:</span>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <Badge 
                  variant={selectedVendor === null ? "default" : "outline"}
                  className="cursor-pointer text-xs px-2 py-1 h-6 sm:h-7"
                  onClick={() => setSelectedVendor(null)}
                >
                  All
                </Badge>
                
                {vendors.map(vendor => (
                  <Badge 
                    key={vendor.id} 
                    variant={selectedVendor === vendor.id ? "default" : "outline"}
                    className="cursor-pointer text-xs px-2 py-1 h-6 sm:h-7"
                    onClick={() => setSelectedVendor(vendor.id)}
                  >
                    {vendor.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content - Responsive grid layout */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6">
          {/* Categories Sidebar - Collapsible on mobile */}
          <div className="lg:w-1/4 w-full">
            <Card>
              <CardHeader className="py-2 sm:py-3 md:py-4">
                <CardTitle className="text-sm sm:text-base md:text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-1 sm:p-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className={`w-full justify-start text-xs py-1.5 px-2 h-auto ${selectedCategory === category ? 'bg-primary text-black' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Products Grid - Responsive grid */}
          <div className="lg:w-3/4 w-full">
            <Card>
              <CardHeader className="pb-1 sm:pb-2 py-2 sm:py-3 md:py-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm sm:text-base md:text-lg">
                    {selectedCategory === 'All Products' ? 'All Products' : selectedCategory}
                  </CardTitle>
                  <span className="text-xs text-gray-500">
                    {filteredProducts.length} products
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-1 sm:pt-2">
                {currentProducts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    {currentProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        addToCart={() => addToCart(product)} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8">
                    <p className="text-gray-500 text-sm">No products found matching your criteria.</p>
                    <Button 
                      variant="link" 
                      className="text-xs sm:text-sm"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All Products');
                        setSelectedVendor(null);
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </CardContent>
              
              {/* Pagination - Improved for mobile */}
              {totalPages > 1 && (
                <CardFooter className="flex justify-center pt-1 sm:pt-2 pb-2 sm:pb-4">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className="h-7 sm:h-8 px-2 text-xs sm:text-sm"
                    >
                      Previous
                    </Button>
                    
                    <span className="text-xs">
                      Page {currentPage} of {totalPages}
                    </span>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className="h-7 sm:h-8 px-2 text-xs sm:text-sm"
                    >
                      Next
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
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
