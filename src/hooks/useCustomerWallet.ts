import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { settlementService } from '@/services/settlementService';
import { toast } from 'sonner';

export interface CustomerTransaction {
  id: string;
  transaction_id: string;
  type: 'payment' | 'refund' | 'bonus' | 'reward' | 'adjustment';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  reference_id?: string;
  reference_type?: string;
  payment_method?: string;
  metadata: Record<string, any>;
  processed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerWallet {
  available_balance: number;
  bonus_balance: number;
  carbon_credits: number;
  total_spent: number;
}

export const useCustomerWallet = () => {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<CustomerWallet | null>(null);
  const [transactions, setTransactions] = useState<CustomerTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWallet = async () => {
    if (!user?.id) return;

    try {
      const walletData = await settlementService.getCustomerWalletBalance(user.id);
      setWallet(walletData);
    } catch (error) {
      console.error('Error fetching wallet:', error);
      toast.error('Failed to load wallet data');
    }
  };

  const fetchTransactions = async () => {
    if (!user?.id) return;

    try {
      const txData = await settlementService.getTransactionHistory(user.id, 'customer', 50);
      setTransactions(txData as CustomerTransaction[]);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transactions');
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await Promise.all([
      fetchWallet(),
      fetchTransactions()
    ]);
    setRefreshing(false);
  };

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchWallet(),
        fetchTransactions()
      ]);
      setLoading(false);
    };

    if (user?.id) {
      loadData();
    }
  }, [user?.id]);

  return {
    wallet,
    transactions,
    loading,
    refreshing,
    refreshData,
  };
};

