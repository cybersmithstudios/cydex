
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Star, Plus } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    vendor: string;
    rating: number;
    eco_friendly: boolean;
    description: string;
    weight: string;
  };
  addToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-40 w-full">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {product.eco_friendly && (
          <Badge className="absolute top-2 right-2 bg-green-500 flex items-center gap-1">
            <Leaf className="h-3 w-3" />
            <span>Eco</span>
          </Badge>
        )}
      </div>
      
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <span className="font-bold">₦{product.price.toLocaleString()}</span>
        </div>
        
        <p className="text-xs text-gray-500 mt-1">{product.weight}</p>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-600">{product.vendor}</span>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="text-xs">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-600 mt-2 line-clamp-2">{product.description}</p>
      </CardContent>
      
      <CardFooter className="p-3 pt-0">
        <Button 
          className="w-full bg-primary hover:bg-primary/80 text-black"
          onClick={addToCart}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
