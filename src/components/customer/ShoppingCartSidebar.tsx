import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  vendor_id: string;
  vendor_name: string;
}

interface ShoppingCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  cartTotal: number;
  proceedToCheckout: () => void;
}

export const ShoppingCartSidebar: React.FC<ShoppingCartSidebarProps> = ({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeFromCart,
  cartTotal,
  proceedToCheckout
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-xl flex flex-col animate-in slide-in-from-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Your Cart</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow p-6 text-gray-500">
            <ShoppingBag className="h-16 w-16 mb-4 text-gray-300" />
            <p className="mb-2">Your cart is empty</p>
            <Button variant="link" onClick={onClose}>Browse Products</Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-grow p-4">
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="flex-grow">
                      <h3 className="font-medium line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.vendor_name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-semibold">₦{item.price.toLocaleString()}</span>
                        
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 w-7 p-0 rounded-full"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="mx-2 w-5 text-center">{item.quantity}</span>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 w-7 p-0 rounded-full"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0 text-gray-400 hover:text-gray-800"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₦{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>₦1,000.00</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₦{(cartTotal + 1000).toLocaleString()}</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-primary hover:bg-primary/80 text-black"
                onClick={proceedToCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
