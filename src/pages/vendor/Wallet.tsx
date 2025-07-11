import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Wallet, ArrowUp, ArrowDown, RefreshCw, Download, Plus, Calendar,
  Search, CreditCard, DollarSign, BarChart4, Filter, ChevronDown,
  Info, AlertCircle, CheckCircle, XCircle, TrendingUp, Loader2
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useVendorFinancials } from '@/hooks/useVendorFinancials';

const WalletPage = () => {
  const isMobile = useIsMobile();
  const { 
    transactions, 
    bankAccounts, 
    payoutRequests, 
    loading, 
    refreshing,
    addBankAccount,
    requestPayout,
    refreshData,
    balances 
  } = useVendorFinancials();

  const [showAddBankDialog, setShowAddBankDialog] = useState(false);
  const [showPayoutDialog, setShowPayoutDialog] = useState(false);
  const [newBankAccount, setNewBankAccount] = useState({
    account_name: '',
    bank_name: '',
    account_number: '',
    is_default: false,
    is_verified: false
  });
  const [payoutAmount, setPayoutAmount] = useState('');
  const [selectedBankAccount, setSelectedBankAccount] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [activeTab, setActiveTab] = useState('all');

  // Filter transactions based on active tab
  React.useEffect(() => {
    if (activeTab === 'all') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter(t => t.type === activeTab));
    }
  }, [transactions, activeTab]);
  
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: isMobile ? 0 : 2,
      maximumFractionDigits: isMobile ? 0 : 2
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
      hour12: true
    }).format(date);
  };
  
  const getTransactionIcon = (type: string, status: string) => {
    if (status === 'failed') {
      return <XCircle className="h-4 w-4 sm:h-6 sm:w-6 text-red-500" />;
    }
    
    switch (type) {
      case 'sale':
        return <ArrowDown className="h-4 w-4 sm:h-6 sm:w-6 text-green-500" />;
      case 'payout':
        return <ArrowUp className="h-4 w-4 sm:h-6 sm:w-6 text-blue-500" />;
      case 'refund':
        return <RefreshCw className="h-4 w-4 sm:h-6 sm:w-6 text-amber-500" />;
      default:
        return <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-gray-500" />;
    }
  };

  const getTransactionStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 text-xs">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500 text-xs">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-500 text-xs">Failed</Badge>;
      default:
        return <Badge className="text-xs">Unknown</Badge>;
    }
  };

  const handleAddBankAccount = async () => {
    try {
      await addBankAccount(newBankAccount);
      setNewBankAccount({
        account_name: '',
        bank_name: '',
        account_number: '',
        is_default: false,
        is_verified: false
      });
      setShowAddBankDialog(false);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleRequestPayout = async () => {
    if (!payoutAmount || !selectedBankAccount) return;
    
    try {
      await requestPayout(parseFloat(payoutAmount), selectedBankAccount);
      setPayoutAmount('');
      setSelectedBankAccount('');
      setShowPayoutDialog(false);
    } catch (error) {
      // Error handled in hook
    }
  };

  if (loading) {
    return (
      <DashboardLayout userRole="VENDOR">
        <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="VENDOR">
      <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Wallet</h1>
            <p className="text-sm sm:text-base text-gray-600">Manage your finances and track transactions</p>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
            <Button 
              variant="outline" 
              className="flex items-center justify-center gap-2 w-full sm:w-auto text-xs sm:text-sm"
              onClick={refreshData}
              disabled={refreshing}
            >
              {refreshing ? <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" /> : <Download className="h-3 w-3 sm:h-4 sm:w-4" />}
              <span>Refresh</span>
            </Button>
            
            <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary-hover text-black w-full sm:w-auto text-xs sm:text-sm">
                  <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Request Payout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request Payout</DialogTitle>
                  <DialogDescription>
                    Request a payout to your bank account. A 1.5% processing fee will be applied.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Amount (₦)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Available: {formatAmount(balances.availableForPayout)}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="bank-account">Bank Account</Label>
                    <Select value={selectedBankAccount} onValueChange={setSelectedBankAccount}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bank account" />
                      </SelectTrigger>
                      <SelectContent>
                        {bankAccounts.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.bank_name} - **** {account.account_number.slice(-4)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowPayoutDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleRequestPayout}>
                    Request Payout
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Balance and Payment Methods Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Account Balance</CardTitle>
              <CardDescription className="text-sm">Your current balance and available funds</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Total Balance</p>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                    {formatAmount(balances.totalBalance)}
                  </h2>
                  <div className="flex items-center text-green-600 text-xs sm:text-sm">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span>Real-time data from Supabase</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary-hover text-black w-full sm:w-auto text-xs sm:text-sm">
                        <ArrowUp className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span>Withdraw</span>
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm text-blue-700">Available for Payout</span>
                    <Info className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-blue-700">
                    {formatAmount(balances.availableForPayout)}
                  </h3>
                  <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
                    <DialogTrigger asChild>
                      <Button className="mt-3 sm:mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm">
                        Request Payout
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
                
                <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm text-green-700">Sales (This Month)</span>
                    <BarChart4 className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-green-700">
                    {formatAmount(balances.salesThisMonth)}
                  </h3>
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-green-600">
                    <span className="font-medium">Live</span> sales data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Methods Card */}
          <Card>
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Payment Methods</CardTitle>
              <CardDescription className="text-sm">Manage your bank accounts</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {bankAccounts.map((account) => (
                  <div key={account.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs sm:text-sm">
                            {account.bank_name.substring(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm sm:text-base">{account.bank_name}</p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            **** {account.account_number.slice(-4)}
                          </p>
                        </div>
                      </div>
                      {account.is_default && (
                        <Badge variant="outline" className="border-green-500 text-green-500 text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                
                <Dialog open={showAddBankDialog} onOpenChange={setShowAddBankDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-dashed text-xs sm:text-sm">
                      <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Add New Bank Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Bank Account</DialogTitle>
                      <DialogDescription>
                        Add a new bank account for payouts
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
                      <Button variant="outline" onClick={() => setShowAddBankDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddBankAccount}>
                        Add Account
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Transaction History */}
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Transaction History</CardTitle>
            <CardDescription className="text-sm">Recent payments, payouts and refunds</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-3 sm:mb-4 w-full sm:w-auto grid grid-cols-4 sm:flex sm:gap-2">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
                <TabsTrigger value="sale" className="text-xs sm:text-sm">Sales</TabsTrigger>
                <TabsTrigger value="payout" className="text-xs sm:text-sm">Payouts</TabsTrigger>
                <TabsTrigger value="refund" className="text-xs sm:text-sm">Refunds</TabsTrigger>
              </TabsList>
              
              <div className="space-y-3 sm:space-y-4">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TransactionCard 
                      key={transaction.id}
                      transaction={transaction}
                      formatAmount={formatAmount}
                      formatDate={formatDate}
                      getTransactionIcon={getTransactionIcon}
                      getTransactionStatus={getTransactionStatus}
                      isMobile={isMobile}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 sm:py-10">
                    <DollarSign className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400 mx-auto mb-2" />
                    <h3 className="font-medium text-base sm:text-lg mb-2">No Transactions</h3>
                    <p className="text-sm sm:text-base text-gray-500">
                      {activeTab === 'all' ? 'No transactions found' : `No ${activeTab} transactions found`}
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

// Transaction Card Component
const TransactionCard = ({ 
  transaction, 
  formatAmount, 
  formatDate, 
  getTransactionIcon, 
  getTransactionStatus,
  isMobile 
}: any) => (
  <div className="bg-white border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between gap-3 sm:gap-4">
      <div className="flex items-start gap-3">
        <div className={`p-1.5 sm:p-2 rounded-full ${
          transaction.status === 'failed' ? 'bg-red-100' :
          transaction.type === 'sale' ? 'bg-green-100' :
          transaction.type === 'payout' ? 'bg-blue-100' : 
          'bg-amber-100'
        }`}>
          {getTransactionIcon(transaction.type, transaction.status)}
        </div>
        
        <div className="min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="font-medium text-sm sm:text-base truncate">
              {transaction.description || `${transaction.type} transaction`}
            </span>
            <span className="hidden sm:inline-block text-gray-300">•</span>
            <span className="text-xs sm:text-sm text-gray-600">{transaction.transaction_id}</span>
          </div>
          
          <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            {getTransactionStatus(transaction.status)}
            <span className="text-xs sm:text-sm text-gray-600">
              {formatDate(transaction.created_at)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <span className={`font-bold text-sm sm:text-base ${
          transaction.type === 'sale' ? 'text-green-600' :
          transaction.type === 'payout' ? 'text-blue-600' :
          'text-amber-600'
        }`}>
          {transaction.type === 'sale' ? '+' : '-'}{formatAmount(transaction.amount)}
        </span>
        {transaction.fee > 0 && (
          <p className="text-xs text-gray-500">
            Fee: {formatAmount(transaction.fee)}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default WalletPage;