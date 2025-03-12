
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingCart, Clock, Calendar, MapPin, 
  ChevronDown, ChevronRight, Filter, X, Plus, Minus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ProductCard } from '@/components/customer/ProductCard';
import { ShoppingCartSidebar } from '@/components/customer/ShoppingCartSidebar';
import { DeliveryScheduler } from '@/components/customer/DeliveryScheduler';

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

const NewOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<Array<{product: any, quantity: number}>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter products based on search, category, and vendor
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    const matchesVendor = !selectedVendor || product.vendorId === selectedVendor;
    
    return matchesSearch && matchesCategory && matchesVendor;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default sort (recommended)
    return 0;
  });

  // Paginate products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // Handle adding product to cart
  const addToCart = (product: any) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
    
    toast.success(`Added ${product.name} to cart`);
  };

  // Handle removing product from cart
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Update item quantity in cart
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  // Calculate cart totals
  const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Proceed to checkout
  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    setIsSchedulerOpen(true);
  };

  // Place order
  const placeOrder = (deliveryDetails: any) => {
    // Here you would normally send the order to the backend
    console.log('Placing order with delivery details:', deliveryDetails);
    console.log('Cart items:', cartItems);
    
    toast.success("Order placed successfully!");
    // Redirect to order tracking page
    navigate('/customer/orders');
  };

  return (
    <DashboardLayout userRole="customer">
      <div className="p-3 md:p-6 max-w-7xl mx-auto">
        {/* Header - Modified for better mobile display */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">New Order</h1>
            <p className="text-sm text-gray-600">Browse eco-friendly products and schedule deliveries</p>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 flex-1 sm:flex-initial justify-center"
              onClick={() => navigate('/customer')}
            >
              <X className="h-4 w-4" />
              <span className="sm:inline">Cancel</span>
            </Button>
            
            <Button 
              variant="default" 
              size="sm" 
              className="flex items-center gap-2 relative flex-1 sm:flex-initial justify-center"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-primary text-black text-xs rounded-full">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
        
        {/* Search and Filters - Improved mobile layout */}
        <div className="bg-white rounded-lg shadow-sm border p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex flex-col gap-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products, vendors..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-initial justify-center">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
          </div>
          
          <div className="mt-3 md:mt-4">
            <div className="flex flex-wrap items-center gap-y-2">
              <span className="text-sm text-gray-500 mr-2">Vendors:</span>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={selectedVendor === null ? "default" : "outline"}
                  className="cursor-pointer text-xs md:text-sm"
                  onClick={() => setSelectedVendor(null)}
                >
                  All
                </Badge>
                
                {vendors.map(vendor => (
                  <Badge 
                    key={vendor.id} 
                    variant={selectedVendor === vendor.id ? "default" : "outline"}
                    className="cursor-pointer text-xs md:text-sm"
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
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Categories Sidebar - Collapsible on mobile */}
          <div className="lg:w-1/4 w-full">
            <Card>
              <CardHeader className="py-3 md:py-4">
                <CardTitle className="text-base md:text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className={`w-full justify-start text-xs md:text-sm py-1.5 px-2 h-auto ${selectedCategory === category ? 'bg-primary text-black' : ''}`}
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
              <CardHeader className="pb-2 py-3 md:py-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base md:text-lg">
                    {selectedCategory === 'All Products' ? 'All Products' : selectedCategory}
                  </CardTitle>
                  <span className="text-xs md:text-sm text-gray-500">
                    {filteredProducts.length} products found
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                {currentProducts.length > 0 ? (
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4">
                    {currentProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        addToCart={() => addToCart(product)} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No products found matching your criteria.</p>
                    <Button 
                      variant="link" 
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
                <CardFooter className="flex justify-center pt-2 pb-4">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className="h-8 px-2 md:px-3"
                    >
                      Previous
                    </Button>
                    
                    <span className="text-xs md:text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className="h-8 px-2 md:px-3"
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
        cartTotal={cartTotal}
        proceedToCheckout={proceedToCheckout}
      />
      
      {/* Delivery Scheduler Dialog */}
      <DeliveryScheduler 
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
        cartTotal={cartTotal}
        onScheduleDelivery={placeOrder}
      />
    </DashboardLayout>
  );
};

export default NewOrder;
