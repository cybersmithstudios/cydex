import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { VendorSelectionCard } from './VendorSelectionCard';
import LoadingDisplay from '@/components/ui/LoadingDisplay';

interface Vendor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  productCount: number;
  categories: string[];
}

interface VendorSelectionPageProps {
  onVendorSelect: (vendorId: string, vendorName: string) => void;
}

export const VendorSelectionPage: React.FC<VendorSelectionPageProps> = ({
  onVendorSelect
}) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      
      // First, get vendors with active products using a more reliable approach
      const { data: vendorData, error } = await supabase
        .from('profiles')
        .select('id, name, email, avatar')
        .eq('role', 'vendor')
        .eq('status', 'active');

      if (error) throw error;

      if (!vendorData || vendorData.length === 0) {
        console.log('No active vendors found');
        setVendors([]);
        return;
      }

      // Then fetch products for each vendor
      const vendorsWithProducts = await Promise.all(
        vendorData.map(async (vendor) => {
          const { data: products } = await supabase
            .from('products')
            .select('id, name, category, status, stock_quantity')
            .eq('vendor_id', vendor.id)
            .eq('status', 'active')
            .gt('stock_quantity', 0);

          const activeProducts = products || [];
          const categories = Array.from(
            new Set(activeProducts.map(p => p.category).filter(Boolean))
          );

          return {
            id: vendor.id,
            name: vendor.name,
            email: vendor.email,
            avatar: vendor.avatar,
            productCount: activeProducts.length,
            categories: categories as string[]
          };
        })
      );

      // Filter to only include vendors with products
      const processedVendors = vendorsWithProducts.filter(vendor => vendor.productCount > 0);
      
      console.log('Processed vendors:', processedVendors);
      setVendors(processedVendors);
      
      // Extract all unique categories
      const uniqueCategories = Array.from(
        new Set(processedVendors.flatMap(v => v.categories))
      );
      setAllCategories(uniqueCategories);
      
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.categories.some(cat => 
                           cat.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    
    const matchesCategory = !selectedCategory || 
                           vendor.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <LoadingDisplay message="Loading vendors..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Choose Your Vendor</h1>
        <p className="text-gray-600">Select a vendor to view their menu and place your order</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search vendors or cuisine types..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="text-xs"
          >
            All Cuisines
          </Button>
          {allCategories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            {selectedCategory ? `${selectedCategory} Vendors` : 'All Vendors'}
          </h2>
          <Badge variant="outline">{filteredVendors.length}</Badge>
        </div>
        
        {(searchQuery || selectedCategory) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Vendors Grid */}
      {filteredVendors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredVendors.map(vendor => (
            <VendorSelectionCard
              key={vendor.id}
              vendor={vendor}
              onSelect={(vendorId) => onVendorSelect(vendorId, vendor.name)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No vendors found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || selectedCategory
              ? "Try adjusting your search or filter criteria"
              : "No vendors are currently available in your area"
            }
          </p>
          {(searchQuery || selectedCategory) && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};