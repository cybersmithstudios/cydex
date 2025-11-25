import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Wallet, ArrowUp, ArrowDown, RefreshCw, Download,
  DollarSign, TrendingUp, CreditCard, Gift, Leaf, Building2, Plus
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { settlementService } from '@/services/settlementService';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

const CustomerWalletPage = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [selectedBankAccount, setSelectedBankAccount] = useState('');
  const [showAddBankDialog, setShowAddBankDialog] = useState(false);
  const [newBankAccount, setNewBankAccount] = useState({
    account_name: '',
    bank_name: '',
    bank_code: '',
    account_number: ''
  });

  useEffect(() => {
    if (user?.id) {
      loadWalletData();
      loadBankAccounts();
    }
  }, [user?.id]);

  const loadBankAccounts = async () => {
    if (!user?.id) return;
    try {
      const { data, error } = await supabase
        .from('customer_bank_accounts')
        .select('*')
        .eq('customer_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBankAccounts(data || []);
    } catch (error) {
      console.error('Error loading bank accounts:', error);
    }
  };

  const loadWalletData = async () => {
    setLoading(true);
    try {
      const [walletData, txHistory] = await Promise.all([
        settlementService.getCustomerWalletBalance(user!.id),
        settlementService.getTransactionHistory(user!.id, 'customer', 50),
      ]);

      console.log('Wallet data loaded:', walletData);
      setWallet(walletData);
      setTransactions(txHistory || []);
      
      // If no virtual account, it will be created automatically on next login
      if (!walletData.virtual_account) {
        console.log('No virtual account found, will be created automatically');
      }
    } catch (error) {
      console.error('Error loading wallet data:', error);
      toast.error('Failed to load wallet data');
      // Set default wallet to prevent blank page
      setWallet({
        available_balance: 0,
        bonus_balance: 0,
        carbon_credits: 0,
        total_spent: 0,
        virtual_account: null,
      });
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadWalletData();
    setRefreshing(false);
    toast.success('Wallet data refreshed');
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />;
      case 'refund':
        return <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />;
      case 'bonus':
      case 'reward':
        return <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />;
      default:
        return <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string }> = {
      completed: { label: 'Completed', className: 'bg-green-500 text-white' },
      pending: { label: 'Pending', className: 'bg-amber-500 text-white' },
      failed: { label: 'Failed', className: 'bg-red-500 text-white' },
      cancelled: { label: 'Cancelled', className: 'bg-gray-500 text-white' },
    };

    const statusInfo = config[status] || { label: 'Unknown', className: 'bg-gray-400 text-white' };
    return <Badge className={`${statusInfo.className} text-xs`}>{statusInfo.label}</Badge>;
  };

  const filteredTransactions = activeTab === 'all'
    ? transactions
    : transactions.filter((t) => t.type === activeTab);

  if (loading) {
    return (
      <DashboardLayout userRole="CUSTOMER">
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">My Wallet</h1>
            <p className="text-sm sm:text-base text-gray-600">Track your spending and rewards</p>
          </div>

          <Button 
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto text-xs sm:text-sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Spent */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm text-gray-500">Total Spent</p>
                <div className="p-2 bg-red-100 rounded-full">
                  <CreditCard className="h-4 w-4 text-red-600" />
                </div>
                  </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                {formatCurrency(wallet?.total_spent || 0)}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Lifetime spending</p>
            </CardContent>
          </Card>

          {/* Available Balance */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm text-gray-500">Wallet Balance</p>
                <div className="p-2 bg-blue-100 rounded-full">
                  <Wallet className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                {formatCurrency(wallet?.available_balance || 0)}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Available to spend</p>
            </CardContent>
          </Card>

          {/* Bonus Balance */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm text-gray-500">Rewards</p>
                <div className="p-2 bg-purple-100 rounded-full">
                  <Gift className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                {formatCurrency(wallet?.bonus_balance || 0)}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Bonus credits</p>
            </CardContent>
          </Card>

          {/* Carbon Credits */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm text-gray-500">Eco Points</p>
                <div className="p-2 bg-green-100 rounded-full">
                  <Leaf className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                {(wallet?.carbon_credits || 0).toFixed(2)}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Carbon credits earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Virtual Account Info - Always show */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
              Your Virtual Account
            </CardTitle>
            <CardDescription className="text-sm">
              {wallet?.virtual_account 
                ? 'Receive payments directly to this account' 
                : 'Your virtual account is being set up...'}
            </CardDescription>
            </CardHeader>
          <CardContent>
            {wallet?.virtual_account ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">Account Number</p>
                    <p className="font-mono text-lg sm:text-xl font-bold text-gray-900">
                      {wallet.virtual_account.account_number}
                    </p>
                    </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(wallet.virtual_account.account_number);
                      toast.success('Account number copied to clipboard!');
                    }}
                    className="w-full sm:w-auto border-blue-300 hover:bg-blue-100"
                  >
                    Copy Account Number
                  </Button>
              </div>
              
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Account Name</p>
                    <p className="font-medium text-sm sm:text-base">{wallet.virtual_account.account_name}</p>
                      </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Bank</p>
                    <p className="font-medium text-sm sm:text-base">{wallet.virtual_account.bank_name}</p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-1">How to Deposit</p>
                  <p className="text-xs text-green-700">
                    Transfer money from any bank to the account number above. Funds will be credited automatically to your wallet.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <CreditCard className="h-8 w-8 text-blue-600 animate-pulse" />
                </div>
                <h3 className="font-medium text-base sm:text-lg mb-2">Setting up your virtual account</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Your virtual account is being created automatically. This usually takes 2-5 seconds.
                </p>
                <p className="text-xs text-gray-400 mb-2">
                  If it's taking longer, try refreshing or check the browser console for errors.
                </p>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                  <p className="text-xs text-amber-800">
                    <strong>Note:</strong> If you see an "account allocation" error, virtual accounts require setup with Squad support. 
                    You can still use the platform - funds can be added via bank transfer to your wallet.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button
                    variant="outline"
                    onClick={handleRefresh}
                    disabled={refreshing}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                    Refresh Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={async () => {
                      // Force wallet setup retry
                      const { walletSetupService } = await import('@/services/walletSetupService');
                      if (user) {
                        toast.info('Retrying virtual account setup...');
                        await walletSetupService.ensureWalletSetup({
                          id: user.id,
                          role: user.role,
                          name: user.name,
                          email: user.email,
                          phone: null,
                        });
                        setTimeout(() => handleRefresh(), 2000);
                      }
                    }}
                  >
                    Retry Setup
                  </Button>
                </div>
                    </div>
            )}
            </CardContent>
          </Card>

        {/* Withdrawal Section */}
        {wallet && wallet.available_balance > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
                Withdraw Funds
              </CardTitle>
              <CardDescription className="text-sm">
                Transfer money from your wallet to your bank account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Available Balance</span>
                    <span className="text-xl font-bold text-blue-700">
                      {formatCurrency(wallet.available_balance)}
                        </span>
                  </div>
                </div>

                <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-primary hover:bg-primary-hover text-black">
                      <ArrowUp className="h-4 w-4 mr-2" />
                      Withdraw to Bank Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Withdraw Funds</DialogTitle>
                      <DialogDescription>
                        Transfer money from your wallet to your bank account. A 1.5% processing fee applies.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="withdraw-amount">Amount (₦)</Label>
                        <Input
                          id="withdraw-amount"
                          type="number"
                          placeholder="Enter amount"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Available: {formatCurrency(wallet.available_balance)}
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="bank-account">Bank Account</Label>
                        <Select value={selectedBankAccount} onValueChange={setSelectedBankAccount}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bank account" />
                          </SelectTrigger>
                          <SelectContent>
                            {bankAccounts.length > 0 ? (
                              bankAccounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.bank_name} - **** {account.account_number.slice(-4)}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="none" disabled>
                                No bank accounts added
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        {bankAccounts.length === 0 && (
                          <Button
                            variant="outline"
                            className="w-full mt-2"
                            onClick={() => {
                              setShowWithdrawDialog(false);
                              setShowAddBankDialog(true);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Bank Account
                          </Button>
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={async () => {
                          if (!withdrawAmount || !selectedBankAccount) {
                            toast.error('Please fill all fields');
                            return;
                          }
                          const amount = parseFloat(withdrawAmount);
                          if (isNaN(amount) || amount <= 0) {
                            toast.error('Please enter a valid amount');
                            return;
                          }
                          if (amount > wallet.available_balance) {
                            toast.error('Insufficient balance');
                            return;
                          }
                          if (amount < 100) {
                            toast.error('Minimum withdrawal amount is ₦100');
                            return;
                          }

                          try {
                            await settlementService.requestCustomerWithdrawal(
                              user!.id,
                              amount,
                              selectedBankAccount
                            );
                            toast.success(`Withdrawal of ${formatCurrency(amount)} initiated successfully!`);
                            setShowWithdrawDialog(false);
                            setWithdrawAmount('');
                            setSelectedBankAccount('');
                            await Promise.all([loadWalletData(), loadBankAccounts()]);
                          } catch (error) {
                            console.error('Withdrawal error:', error);
                            toast.error(error instanceof Error ? error.message : 'Failed to process withdrawal');
                          }
                        }}
                      >
                        Withdraw
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transaction History */}
          <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Transaction History</CardTitle>
            <CardDescription className="text-sm">
              View all your payments, refunds, and rewards
            </CardDescription>
            </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 w-full sm:w-auto grid grid-cols-4 sm:flex">
                <TabsTrigger value="all" className="text-xs sm:text-sm">
                  All
                </TabsTrigger>
                <TabsTrigger value="payment" className="text-xs sm:text-sm">
                  Payments
                </TabsTrigger>
                <TabsTrigger value="refund" className="text-xs sm:text-sm">
                  Refunds
                </TabsTrigger>
                <TabsTrigger value="bonus" className="text-xs sm:text-sm">
                  Rewards
                </TabsTrigger>
                </TabsList>
                
              <div className="space-y-3 sm:space-y-4">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="bg-white border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div
                            className={`p-1.5 sm:p-2 rounded-full ${
                              transaction.type === 'payment'
                                ? 'bg-red-100'
                                : transaction.type === 'refund'
                                ? 'bg-green-100'
                                : 'bg-purple-100'
                            }`}
                          >
                            {getTransactionIcon(transaction.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <span className="font-medium text-sm sm:text-base truncate">
                                {transaction.description || 'Transaction'}
                              </span>
                              <span className="hidden sm:inline-block text-gray-300">•</span>
                              <span className="text-xs sm:text-sm text-gray-600">
                                {transaction.transaction_id}
                              </span>
              </div>

                            <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                              {getStatusBadge(transaction.status)}
                              <span className="text-xs sm:text-sm text-gray-600">
                                {formatDate(transaction.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span
                            className={`font-bold text-sm sm:text-base ${
                              transaction.type === 'payment'
                                ? 'text-red-600'
                                : 'text-green-600'
                            }`}
                          >
                            {transaction.type === 'payment' ? '-' : '+'}
                            {formatCurrency(transaction.amount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 sm:py-10">
                    <DollarSign className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400 mx-auto mb-2" />
                    <h3 className="font-medium text-base sm:text-lg mb-2">No Transactions</h3>
                    <p className="text-sm sm:text-base text-gray-500">
                      {activeTab === 'all'
                        ? 'No transactions found'
                        : `No ${activeTab} transactions found`}
                    </p>
                  </div>
                    )}
                  </div>
              </Tabs>
            </CardContent>
          </Card>

        {/* Add Bank Account Dialog */}
        <Dialog open={showAddBankDialog} onOpenChange={setShowAddBankDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Bank Account</DialogTitle>
              <DialogDescription>
                Add a bank account to withdraw funds from your wallet
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="account-name">Account Name</Label>
                <Input
                  id="account-name"
                  placeholder="Account holder name"
                  value={newBankAccount.account_name}
                  onChange={(e) => setNewBankAccount(prev => ({ ...prev, account_name: e.target.value }))}
                />
        </div>
              <div>
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input
                  id="bank-name"
                  placeholder="Bank name"
                  value={newBankAccount.bank_name}
                  onChange={(e) => setNewBankAccount(prev => ({ ...prev, bank_name: e.target.value }))}
                />
                      </div>
              <div>
                <Label htmlFor="bank-code">Bank Code (NIP)</Label>
                <Input
                  id="bank-code"
                  placeholder="e.g. 000013 for GTBank"
                  value={newBankAccount.bank_code}
                  onChange={(e) => setNewBankAccount(prev => ({ ...prev, bank_code: e.target.value }))}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the 6-digit NIP bank code required by Squad for transfers.
                </p>
              </div>
              <div>
                <Label htmlFor="account-number">Account Number</Label>
                <Input
                  id="account-number"
                  placeholder="10-digit account number"
                  value={newBankAccount.account_number}
                  onChange={(e) => setNewBankAccount(prev => ({ ...prev, account_number: e.target.value }))}
                />
                    </div>
                  </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setShowAddBankDialog(false);
                setNewBankAccount({ account_name: '', bank_name: '', bank_code: '', account_number: '' });
              }}>
                Cancel
                      </Button>
              <Button
                onClick={async () => {
                  if (!newBankAccount.account_name || !newBankAccount.bank_name || !newBankAccount.account_number) {
                    toast.error('Please fill all required fields');
                    return;
                  }
                  if (!newBankAccount.bank_code) {
                    toast.error('Bank code is required for withdrawals');
                    return;
                  }

                  try {
                    const { data, error } = await supabase
                      .from('customer_bank_accounts')
                      .insert({
                        customer_id: user!.id,
                        account_name: newBankAccount.account_name,
                        bank_name: newBankAccount.bank_name,
                        bank_code: newBankAccount.bank_code,
                        account_number: newBankAccount.account_number,
                        is_default: bankAccounts.length === 0, // First account is default
                      })
                      .select()
                      .single();

                    if (error) throw error;

                    toast.success('Bank account added successfully!');
                    setShowAddBankDialog(false);
                    setNewBankAccount({ account_name: '', bank_name: '', bank_code: '', account_number: '' });
                    await loadBankAccounts();
                  } catch (error) {
                    console.error('Error adding bank account:', error);
                    toast.error(error instanceof Error ? error.message : 'Failed to add bank account');
                  }
                }}
              >
                Add Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default CustomerWalletPage;
