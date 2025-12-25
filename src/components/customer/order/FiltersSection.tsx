
import React from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FiltersSectionProps {
  isFiltersExpanded: boolean;
  setIsFiltersExpanded: (expanded: boolean) => void;
  selectedCategory: string | null;
  selectedVendor: string | null;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  setSelectedVendor: (vendorId: string | null) => void;
  vendors: Array<{ id: string; name: string }>;
}

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  isFiltersExpanded,
  setIsFiltersExpanded,
  selectedCategory,
  selectedVendor,
  sortBy,
  setSortBy,
  setSelectedVendor,
  vendors
}) => {
  return (
    <div className="bg-card rounded-lg shadow-sm border-border border overflow-hidden">
      <button
        onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
        className="w-full flex items-center justify-between p-2 sm:p-3 hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-2">
          <Filter className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          <span className="text-xs sm:text-sm font-medium">Filters & Sort</span>
          {(selectedCategory || selectedVendor || sortBy !== 'recommended') && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-5">
              Active
            </Badge>
          )}
        </div>
        {isFiltersExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
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
  );
};
