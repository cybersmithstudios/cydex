
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OrderHeaderProps {
  cartItems: any[];
  setIsCartOpen: (isOpen: boolean) => void;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({
  cartItems,
  setIsCartOpen
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2 sm:mb-4">
      <div className="flex-1">
        <h1 className="text-base sm:text-xl md:text-2xl font-bold">New Order</h1>
        <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Browse eco-friendly products</p>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 flex-1 sm:flex-initial justify-center text-xs h-7 sm:h-8"
          onClick={() => navigate('/customer')}
        >
          <X className="h-3 w-3" />
          <span className="hidden xs:inline">Cancel</span>
        </Button>
        
        {/* Cart button removed - now handled by mobile header */}
        <div className="lg:flex items-center gap-1 flex-1 sm:flex-initial hidden">
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center gap-1 relative justify-center text-xs h-7 sm:h-8"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-3 w-3" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <Badge className="absolute -top-1 -right-1 px-1 py-0 bg-primary text-black text-xs rounded-full min-w-[14px] h-3.5 flex items-center justify-center">
                {cartItems.length}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
