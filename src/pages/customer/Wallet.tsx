import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Wallet, ArrowUp, ArrowDown, RefreshCw, Download,
  DollarSign, TrendingUp, CreditCard, Gift, Leaf
} from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { settlementService } from '@/services/settlementService';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

const CustomerWalletPage = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (user?.id) {
      loadWalletData();
    }
  }, [user?.id]);

  const loadWalletData = async () => {
    setLoading(true);
    try {
      const [walletData, txHistory] = await Promise.all([
        settlementService.getCustomerWalletBalance(user!.id),
        settlementService.getTransactionHistory(user!.id, 'customer', 50),
      ]);

      setWallet(walletData);
      setTransactions(txHistory);
    } catch (error) {
      console.error('Error loading wallet data:', error);
      toast.error('Failed to load wallet data');
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
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
      </div>
    </DashboardLayout>
  );
};

export default CustomerWalletPage;
