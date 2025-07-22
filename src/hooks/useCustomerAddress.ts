import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

export interface CustomerAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  landmark: string;
  phone: string;
  additional_info: string;
}

const CUSTOMER_ADDRESS_KEY = 'customer_delivery_address';

export const useCustomerAddress = () => {
  const { user } = useAuth();
  const [savedAddress, setSavedAddress] = useState<CustomerAddress | null>(null);

  // Load saved address from localStorage on mount
  useEffect(() => {
    if (user?.id) {
      const saved = localStorage.getItem(`${CUSTOMER_ADDRESS_KEY}_${user.id}`);
      if (saved) {
        try {
          setSavedAddress(JSON.parse(saved));
        } catch (error) {
          console.error('Error parsing saved address:', error);
        }
      }
    }
  }, [user?.id]);

  const saveAddress = (address: CustomerAddress) => {
    if (user?.id) {
      localStorage.setItem(`${CUSTOMER_ADDRESS_KEY}_${user.id}`, JSON.stringify(address));
      setSavedAddress(address);
    }
  };

  const clearAddress = () => {
    if (user?.id) {
      localStorage.removeItem(`${CUSTOMER_ADDRESS_KEY}_${user.id}`);
      setSavedAddress(null);
    }
  };

  return {
    savedAddress,
    saveAddress,
    clearAddress
  };
};