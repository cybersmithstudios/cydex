
import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CreditCard, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DELIVERY_FEE } from '@/constants/delivery';

interface DeliverySchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  cartTotal: number;
  onScheduleDelivery: (deliveryDetails: any) => void;
}

export const DeliveryScheduler: React.FC<DeliverySchedulerProps> = ({
  isOpen,
  onClose,
  cartTotal,
  onScheduleDelivery
}) => {
  const [deliveryType, setDeliveryType] = useState('standard');
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(new Date());
  const [deliveryTime, setDeliveryTime] = useState('asap');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Calculate delivery fees and total - Flat rate pricing
  const getDeliveryFee = () => {
    return DELIVERY_FEE; // Flat rate of ₦500 for all delivery types
  };
  
  const handleScheduleDelivery = () => {
    if (!address) {
      alert('Please enter your delivery address');
      return;
    }
    
    setLoading(true);
    
    // Create delivery details object
    const deliveryDetails = {
      deliveryType,
      deliveryDate: deliveryDate ? format(deliveryDate, 'PPP') : 'Today',
      deliveryTime,
      paymentMethod,
      address,
      notes,
      fee: getDeliveryFee(),
      total: cartTotal + getDeliveryFee()
    };
    
    // Simulate API call
    setTimeout(() => {
      onScheduleDelivery(deliveryDetails);
      setLoading(false);
      onClose();
    }, 1000);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl bg-background rounded-lg shadow-xl flex flex-col max-h-[90vh] animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold text-lg">Schedule Delivery</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="overflow-y-auto p-4 space-y-6">
          {/* Delivery Type */}
          <div>
            <h3 className="font-medium mb-3">Delivery Type</h3>
            <RadioGroup value={deliveryType} onValueChange={setDeliveryType} className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem 
                  value="standard" 
                  id="standard" 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="standard"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Clock className="mb-2 h-6 w-6" />
                  <span className="font-medium">Standard</span>
                  <span className="text-xs text-gray-500">1-2 hours</span>
                  <span className="font-medium mt-2">₦500</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem 
                  value="express" 
                  id="express" 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="express"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Clock className="mb-2 h-6 w-6" />
                  <span className="font-medium">Express</span>
                  <span className="text-xs text-gray-500">30-45 min</span>
                  <span className="font-medium mt-2">₦500</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Delivery Schedule */}
          <div>
            <h3 className="font-medium mb-3">Delivery Schedule</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="delivery-date" className="text-sm mb-1 block">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left",
                        !deliveryDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {deliveryDate ? format(deliveryDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <CalendarComponent
                      mode="single"
                      selected={deliveryDate}
                      onSelect={setDeliveryDate}
                      initialFocus
                      disabled={(date) => {
                        // Can't select dates in the past
                        return date < new Date(new Date().setHours(0, 0, 0, 0));
                      }}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="delivery-time" className="text-sm mb-1 block">Time</Label>
                <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                  <SelectTrigger id="delivery-time" className="w-full">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">As soon as possible</SelectItem>
                    <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12pm - 4pm)</SelectItem>
                    <SelectItem value="evening">Evening (4pm - 8pm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Delivery Address */}
          <div>
            <h3 className="font-medium mb-3">Delivery Address</h3>
            <div className="space-y-2">
              <Input 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="Enter your delivery address" 
                className="w-full"
                required
              />
              <Textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                placeholder="Additional instructions (optional)" 
                className="w-full"
              />
            </div>
          </div>
          
          {/* Payment Method */}
          <div>
            <h3 className="font-medium mb-3">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-3 gap-4">
              <div>
                <RadioGroupItem 
                  value="card" 
                  id="card" 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="card"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCard className="mb-2 h-6 w-6" />
                  <span className="font-medium">Card</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem 
                  value="cash" 
                  id="cash" 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="cash"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <MapPin className="mb-2 h-6 w-6" />
                  <span className="font-medium">Cash on Delivery</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem 
                  value="wallet" 
                  id="wallet" 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="wallet"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Leaf className="mb-2 h-6 w-6" />
                  <span className="font-medium">Eco Wallet</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Order Summary */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee ({deliveryType})</span>
                <span>₦{getDeliveryFee().toLocaleString()}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₦{(cartTotal + getDeliveryFee()).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/80 text-black"
            onClick={handleScheduleDelivery}
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
};
