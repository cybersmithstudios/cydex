
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DesktopCategoriesSidebarProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: string[];
}

export const DesktopCategoriesSidebar: React.FC<DesktopCategoriesSidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  categories
}) => {
  return (
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
  );
};
