
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Wallet,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Download,
  Plus,
  Calendar,
  Search,
  CreditCard,
  DollarSign,
  BarChart4,
  Filter,
  ChevronDown,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock bank account data
const bankAccounts = [
  {
    id: 1,
    bank: 'First Bank of Nigeria',
    accountNumber: '0123456789',
    accountName: 'Green Foods Vendor',
    isDefault: true
  },
  {
    id: 2,
    bank: 'Guaranty Trust Bank',
    accountNumber: '9876543210',
    accountName: 'Green Foods Vendor',
    isDefault: false
  }
];

// Mock transaction data
const transactions = [
  {
    id: 'TRX-9012',
    type: 'payout',
    amount: 253000.00,
    fee: 1500.00,
    date: '2025-04-09T10:23:00Z',
    status: 'completed',
    description: 'Weekly payout',
    account: 'First Bank - 0123456789'
  },
  {
    id: 'TRX-8901',
    type: 'sale',
    amount: 65923.30,
    fee: 1978.00,
    date: '2025-04-09T09:45:00Z',
    status: 'completed',
    description: 'Order #ORD-5679',
    customer: 'David Wilson'
  },
  {
    id: 'TRX-7890',
    type: 'sale',
    amount: 73579.77,
    fee: 2207.00,
    date: '2025-04-09T08:15:00Z',
    status: 'completed',
    description: 'Order #ORD-5678',
    customer: 'Emily Johnson'
  },
  {
    id: 'TRX-6789',
    type: 'payout',
    amount: 500000.00,
    fee: 2500.00,
    date: '2025-04-02T14:30:00Z',
    status: 'completed',
    description: 'Weekly payout',
    account: 'First Bank - 0123456789'
  },
  {
    id: 'TRX-5678',
    type: 'refund',
    amount: 30662.00,
    fee: 0,
    date: '2025-04-01T11:20:00Z',
    status: 'completed',
    description: 'Refund for Order #ORD-5665',
    customer: 'Jennifer Liu'
  },
  {
    id: 'TRX-4567',
    type: 'payout',
    amount: 150000.00,
    fee: 1000.00,
    date: '2025-03-28T16:45:00Z',
    status: 'failed',
    description: 'Special payout request',
    account: 'Guaranty Trust Bank - 9876543210',
    failureReason: 'Insufficient account balance'
  }
];

const WalletPage = () => {
  const isMobile = useIsMobile();
  
  const formatAmount = (amount) => {
    return amount.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    });
  };
  
  const formatDate = (dateString) => {
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
  
  const getTransactionIcon = (type, status) => {
    if (status === 'failed') {
      return <XCircle className="h-6 w-6 text-red-500" />;
    }
    
    switch (type) {
      case 'sale':
        return <ArrowDown className="h-6 w-6 text-green-500" />;
      case 'payout':
        return <ArrowUp className="h-6 w-6 text-blue-500" />;
      case 'refund':
        return <RefreshCw className="h-6 w-6 text-amber-500" />;
      default:
        return <DollarSign className="h-6 w-6 text-gray-500" />;
    }
  };

  const getTransactionStatus = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Calculate total balance
  const totalBalance = transactions
    .filter(t => t.status === 'completed')
    .reduce((acc, t) => {
      if (t.type === 'sale') {
        return acc + t.amount - t.fee;
      } else if (t.type === 'payout') {
        return acc - t.amount - t.fee;
      } else if (t.type === 'refund') {
        return acc - t.amount;
      }
      return acc;
    }, 1550000); // Starting with an initial balance
    
  // Calculate available for payout
  const availableForPayout = transactions
    .filter(t => t.status === 'completed' && t.type === 'sale')
    .reduce((acc, t) => acc + t.amount - t.fee, 0) - 
    transactions
    .filter(t => t.status === 'completed' && t.type === 'payout')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <DashboardLayout userRole="vendor">
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Wallet</h1>
            <p className="text-gray-600">Manage your finances and track transactions</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Export Transactions</span>
            </Button>
            <Button className="bg-primary hover:bg-primary-hover text-black">
              <Plus className="mr-2 h-4 w-4" />
              Request Payout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Account Balance</CardTitle>
              <CardDescription>Your current balance and available funds</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Balance</p>
                  <h2 className="text-3xl font-bold mb-2">
                    {formatAmount(totalBalance)}
                  </h2>
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+12.5% from last week</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    <ArrowDown className="mr-2 h-4 w-4" />
                    <span>Top Up</span>
                  </Button>
                  <Button className="bg-primary hover:bg-primary-hover text-black">
                    <ArrowUp className="mr-2 h-4 w-4" />
                    <span>Withdraw</span>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-blue-700">Available for Payout</span>
                    <Info className="h-4 w-4 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-700">
                    {formatAmount(availableForPayout)}
                  </h3>
                  <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Request Payout
                  </Button>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-green-700">Total Earnings (This Month)</span>
                    <BarChart4 className="h-4 w-4 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-700">
                    {formatAmount(139503.07)}
                  </h3>
                  <p className="mt-4 text-sm text-green-600">
                    <span className="font-medium">+4.6%</span> compared to last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your bank accounts</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {bankAccounts.map((account) => (
                  <div key={account.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {account.bank.substring(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{account.bank}</p>
                          <p className="text-sm text-gray-500">
                            **** {account.accountNumber.slice(-4)}
                          </p>
                        </div>
                      </div>
                      {account.isDefault && (
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          Default
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full border-dashed">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Bank Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Recent payments, payouts and refunds</CardDescription>
          </CardHeader>
          
          <div className="px-6 py-2 flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search transactions..."
                  className="pl-10"
                />
              </div>
              
              <Button variant="outline" className="flex items-center justify-between">
                <span className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Last 30 days</span>
                </span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
              
              <Button variant="outline" className="flex items-center justify-between">
                <span className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>All Transactions</span>
                </span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
          
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="payouts">Payouts</TabsTrigger>
                <TabsTrigger value="refunds">Refunds</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full ${
                            transaction.status === 'failed' ? 'bg-red-100' :
                            transaction.type === 'sale' ? 'bg-green-100' :
                            transaction.type === 'payout' ? 'bg-blue-100' : 
                            'bg-amber-100'
                          }`}>
                            {getTransactionIcon(transaction.type, transaction.status)}
                          </div>
                          
                          <div className="ml-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                              <span className="font-medium">
                                {transaction.description}
                              </span>
                              <span className="hidden md:inline-block text-gray-300">•</span>
                              <span className="text-sm text-gray-600">{transaction.id}</span>
                            </div>
                            
                            <div className="mt-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                              {getTransactionStatus(transaction.status)}
                              <span className="text-sm text-gray-600">
                                {formatDate(transaction.date)}
                              </span>
                            </div>
                            
                            {transaction.failureReason && (
                              <div className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {transaction.failureReason}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-lg font-bold ${
                            transaction.type === 'sale' ? 'text-green-600' :
                            transaction.type === 'payout' ? 'text-blue-600' :
                            'text-amber-600'
                          }`}>
                            {transaction.type === 'sale' ? '+' : transaction.type === 'payout' ? '-' : ''}
                            {formatAmount(transaction.amount)}
                          </div>
                          
                          {transaction.fee > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              Fee: {formatAmount(transaction.fee)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {!isMobile && (transaction.customer || transaction.account) && (
                        <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                          {transaction.customer && (
                            <div>Customer: <span className="font-medium">{transaction.customer}</span></div>
                          )}
                          {transaction.account && (
                            <div>Account: <span className="font-medium">{transaction.account}</span></div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="sales">
                {/* Similar structure as "all" tab but filtered for sales */}
                <div className="text-center py-10">
                  <DollarSign className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <h3 className="font-medium text-lg mb-2">Sales Transactions</h3>
                  <p className="text-gray-500">All your sales will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="payouts">
                {/* Similar structure but filtered for payouts */}
                <div className="text-center py-10">
                  <ArrowUp className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <h3 className="font-medium text-lg mb-2">Payout Transactions</h3>
                  <p className="text-gray-500">All your payouts will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="refunds">
                {/* Similar structure but filtered for refunds */}
                <div className="text-center py-10">
                  <RefreshCw className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <h3 className="font-medium text-lg mb-2">Refund Transactions</h3>
                  <p className="text-gray-500">All your refunds will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default WalletPage;
