import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useCustomerAddress } from '@/hooks/useCustomerAddress';

interface DeliveryAddress {
  location: string;
  landmark: string;
  phone: string;
  additional_info: string;
}

interface DeliveryAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressConfirmed: (address: DeliveryAddress) => void;
  customerPhone?: string;
}

export const DeliveryAddressModal: React.FC<DeliveryAddressModalProps> = ({
  isOpen,
  onClose,
  onAddressConfirmed,
  customerPhone = ''
}) => {
  const { user } = useAuth();
  const { savedAddress, saveAddress } = useCustomerAddress();
  const defaultPhone = customerPhone || '';

  const [address, setAddress] = useState<DeliveryAddress>({
    location: '',
    landmark: '',
    phone: defaultPhone,
    additional_info: ''
  });

  const [errors, setErrors] = useState<Partial<DeliveryAddress>>({});

  // Load saved address when modal opens
  useEffect(() => {
    if (isOpen && savedAddress) {
      setAddress({
        location: savedAddress.street || '', // Map street to location
        landmark: savedAddress.landmark || '',
        phone: savedAddress.phone || defaultPhone,
        additional_info: savedAddress.additional_info || ''
      });
    } else if (isOpen) {
      setAddress({
        location: '',
        landmark: '',
        phone: defaultPhone,
        additional_info: ''
      });
    }
  }, [isOpen, savedAddress, defaultPhone]);

  const validateForm = () => {
    const newErrors: Partial<DeliveryAddress> = {};

    if (!address.location.trim()) newErrors.location = 'Location is required';
    if (!address.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Convert simplified address to full address format for saving
      const fullAddress = {
        street: address.location,
        city: 'Ibadan', // Default to Ibadan for campus deliveries
        state: 'Oyo State',
        country: 'Nigeria',
        landmark: address.landmark,
        phone: address.phone,
        additional_info: address.additional_info
      };
      
      // Save address for future use
      saveAddress(fullAddress);
      onAddressConfirmed(address);
      onClose();
    }
  };

  const handleInputChange = (field: keyof DeliveryAddress, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Delivery Address
          </DialogTitle>
          <DialogDescription>
            {savedAddress 
              ? "Update your delivery address or use the saved one below"
              : "Please provide your delivery address details"
            }
          </DialogDescription>
          {savedAddress && (
            <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
              ✓ Using your saved address. You can modify it below.
            </div>
          )}
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="e.g., UI Campus, Faculty of Science, Room 205"
              value={address.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className={errors.location ? 'border-red-500' : ''}
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="landmark">Nearest Landmark</Label>
            <Input
              id="landmark"
              placeholder="e.g., Near Faculty of Arts, Behind Library"
              value={address.landmark}
              onChange={(e) => handleInputChange('landmark', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Contact Phone Number *</Label>
            <Input
              id="phone"
              placeholder="e.g., +234 801 234 5678"
              value={address.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional_info">Additional Instructions</Label>
            <Textarea
              id="additional_info"
              placeholder="e.g., Ring the bell twice, Call when you arrive"
              value={address.additional_info}
              onChange={(e) => handleInputChange('additional_info', e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Confirm Address
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};