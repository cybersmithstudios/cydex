import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupabase } from '@/contexts/SupabaseContext';
import { useCartContext } from '@/contexts/CartContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Leaf, ShoppingCart, Star, Store, Package, Scale } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { useVendorRatings } from '@/hooks/useVendorRatings';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { supabase } = useSupabase();
  const { addToCart } = useCartContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { getRatingForVendor } = useVendorRatings();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            vendor:profiles!products_vendor_id_fkey (
              name,
              email
            )
          `)
          .eq('id', productId)
          .single();

        if (error) throw error;
        setProduct(data as Product);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      vendor_id: product.vendor_id,
      vendor_name: product.vendor?.name || 'Unknown Vendor'
    }, quantity);
  };

  // Get vendor rating
  const vendorRating = product ? getRatingForVendor(product.vendor_id) : null;
  const displayRating = vendorRating?.average_rating > 0 ? vendorRating.average_rating : 4.5;

  if (loading) {
    return (
      <DashboardLayout userRole="CUSTOMER">
        <div className="p-2 sm:p-4 md:p-6 max-w-5xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!product) {
    return (
      <DashboardLayout userRole="CUSTOMER">
        <div className="p-2 sm:p-4 md:p-6 max-w-5xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/customer/new-order')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="p-2 sm:p-4 md:p-6 max-w-5xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 text-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <Card className="overflow-hidden">
            <div className="relative aspect-square">
              <img 
                src={product.image_url || '/placeholder.svg'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.is_eco_friendly && (
                <Badge className="absolute top-4 right-4 bg-green-500 flex items-center gap-1">
                  <Leaf className="h-3 w-3" />
                  <span>Eco-Friendly</span>
                </Badge>
              )}
            </div>
          </Card>

          {/* Product Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Store className="h-4 w-4" />
                    <span>{product.vendor?.name || 'Unknown Vendor'}</span>
                    <div className="flex items-center ml-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span>
                        {displayRating.toFixed(1)}
                        {vendorRating && vendorRating.total_ratings > 0 && (
                          <span className="text-gray-400 ml-1">({vendorRating.total_ratings} reviews)</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">₦{product.price.toLocaleString()}</span>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      <span>{product.stock_quantity} in stock</span>
                    </Badge>
                  </div>

                  <p className="text-gray-600">{product.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">Carbon Impact</p>
                        <p className="text-xs text-gray-500">{product.carbon_impact}kg CO2 saved</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <div>
                        <p className="text-sm font-medium">Vendor Rating</p>
                        <p className="text-xs text-gray-500">
                          {displayRating.toFixed(1)} stars
                          {vendorRating && vendorRating.total_ratings > 0 && (
                            <span> • {vendorRating.total_ratings} reviews</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Show detailed ratings if available */}
                  {vendorRating && vendorRating.total_ratings > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-2">Detailed Ratings</h4>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        {vendorRating.average_delivery_rating > 0 && (
                          <div className="flex items-center gap-2">
                            <span>Delivery:</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                              <span>{vendorRating.average_delivery_rating.toFixed(1)}</span>
                            </div>
                          </div>
                        )}
                        {vendorRating.average_product_quality_rating > 0 && (
                          <div className="flex items-center gap-2">
                            <span>Quality:</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                              <span>{vendorRating.average_product_quality_rating.toFixed(1)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3"
                      >
                        -
                      </Button>
                      <span className="w-12 text-center">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                        className="px-3"
                      >
                        +
                      </Button>
                    </div>
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/80 text-black"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductDetails; 