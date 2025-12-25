
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MobileCategoriesSectionProps {
  isCategoriesExpanded: boolean;
  setIsCategoriesExpanded: (expanded: boolean) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: string[];
}

export const MobileCategoriesSection: React.FC<MobileCategoriesSectionProps> = ({
  isCategoriesExpanded,
  setIsCategoriesExpanded,
  selectedCategory,
  setSelectedCategory,
  categories
}) => {
  return (
    <div className="lg:hidden bg-card rounded-lg shadow-sm border-border border overflow-hidden">
      <button
        onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
        className="w-full flex items-center justify-between p-2 sm:p-3 hover:bg-muted transition-colors"
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
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
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
  );
};
