import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Wallet as WalletIcon, Plus, CreditCard, ArrowUpRight, 
  RefreshCw, Leaf, Gift, Download, Calendar, Filter, Check, 
  ChevronsUpDown, ChevronDown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock transaction data
const transactions = [
  {
    id: 'TRX-3456',
    type: 'payment',
    amount: '₦4,250.00',
    status: 'completed',
    date: '2023-07-12',
    description: 'Payment for order #ORD-1234',
    orderId: 'ORD-1234'
  },
  {
    id: 'TRX-3455',
    type: 'top-up',
    amount: '₦10,000.00',
    status: 'completed',
    date: '2023-07-10',
    description: 'Wallet top-up via bank transfer',
    orderId: null
  },
  {
    id: 'TRX-3450',
    type: 'cashback',
    amount: '₦325.50',
    status: 'completed',
    date: '2023-07-08',
    description: 'Cashback for order #ORD-1230',
    orderId: 'ORD-1230'
  },
  {
    id: 'TRX-3445',
    type: 'carbon-credit',
    amount: '₦150.00',
    status: 'completed',
    date: '2023-07-05',
    description: 'Carbon credits converted to cash',
    orderId: null
  },
  {
    id: 'TRX-3440',
    type: 'payment',
    amount: '₦1,850.75',
    status: 'completed',
    date: '2023-07-03',
    description: 'Payment for order #ORD-1229',
    orderId: 'ORD-1229'
  }
];

// Mock payment methods
const paymentMethods = [
  {
    id: 'pm-1',
    type: 'card',
    name: 'Visa ending in 4242',
    lastUsed: '2023-07-12',
    isDefault: true,
    expiryDate: '12/25'
  },
  {
    id: 'pm-2',
    type: 'bank',
    name: 'Access Bank',
    lastUsed: '2023-07-01',
    isDefault: false,
    accountNumber: '****1234'
  }
];

// Mock reward data
const carbonRewards = [
  {
    id: 'reward-1',
    name: '15% Off Next Order',
    points: 300,
    expiryDate: '2023-09-30',
    status: 'available'
  },
  {
    id: 'reward-2',
    name: 'Free Delivery',
    points: 200,
    expiryDate: '2023-08-15',
    status: 'available'
  },
  {
    id: 'reward-3',
    name: 'Plant a Tree',
    points: 500,
    expiryDate: '2023-10-31',
    status: 'available'
  }
];

const WalletPage = () => {
  const [topUpAmount, setTopUpAmount] = useState('');
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />;
      case 'top-up':
        return <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />;
      case 'cashback':
        return <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />;
      case 'carbon-credit':
        return <Leaf className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />;
      default:
        return <WalletIcon className="h-3 w-3 sm:h-4 sm:w-4" />;
    }
  };

  const getTransactionStatusBadge = (status: string) => {
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

  const filteredTransactions = transactions.filter(transaction => {
    if (transactionFilter !== 'all' && transaction.type !== transactionFilter) {
      return false;
    }
    return true;
  });

  const handleTopUp = () => {
    // This would be handled with actual payment integration
    alert(`Processing top-up of ${topUpAmount}`);
  };

  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="p-2 sm:p-4 md:p-6 max-w-full mx-auto space-y-3 sm:space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Wallet</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage your balance, payments, and rewards
            </p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary-hover text-black flex items-center gap-1 sm:gap-2 text-sm sm:text-base w-full sm:w-auto"
            onClick={() => {}}
          >
            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            Statement
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Balance</CardTitle>
              <CardDescription className="text-sm">Your current wallet balance</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col items-start">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">₦37,560.95</div>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">Last updated: Today at 09:45 AM</div>
              </div>
              <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-xs sm:text-sm font-medium mb-2">Top up your wallet</p>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Amount"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      className="text-sm h-8 sm:h-9"
                    />
                    <Button 
                      onClick={handleTopUp}
                      className="bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9 px-3"
                    >
                      Top Up
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between items-center text-xs sm:text-sm mb-1">
                    <span className="font-medium">Monthly Spend</span>
                    <span>₦12,450 / ₦50,000</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  <p className="text-xs text-gray-500 mt-2">25% of your monthly budget used</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Carbon Credits</CardTitle>
              <CardDescription className="text-sm">Earn by choosing eco-friendly options</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                <div className="text-xl sm:text-2xl font-bold">240</div>
              </div>
              
              <div className="mt-3 sm:mt-4">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span>Level Progress</span>
                  <span>80%</span>
                </div>
                <Progress value={80} className="h-2 bg-gray-100" />
                <p className="text-xs text-gray-500 mt-2">60 points until Eco Champion</p>
              </div>
              
              <Button variant="outline" className="w-full mt-3 sm:mt-4 text-xs sm:text-sm h-8 sm:h-9">
                Convert to Cash
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <Card className="xl:col-span-2">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Transactions</CardTitle>
              <CardDescription className="text-sm">Recent activity in your wallet</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col gap-2 sm:gap-4 mb-4 sm:mb-6">
                <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                  <SelectTrigger className="w-full h-8 sm:h-9">
                    <div className="flex items-center">
                      <Filter className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Transaction Type</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="payment">Payments</SelectItem>
                    <SelectItem value="top-up">Top-ups</SelectItem>
                    <SelectItem value="cashback">Cashback</SelectItem>
                    <SelectItem value="carbon-credit">Carbon Credits</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full h-8 sm:h-9">
                    <div className="flex items-center">
                      <Calendar className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Time Period</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Mobile-friendly transaction list */}
              <div className="block sm:hidden space-y-2">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-3 bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        {getTransactionIcon(transaction.type)}
                        <span className="ml-2 text-xs font-medium capitalize">{transaction.type.replace('-', ' ')}</span>
                      </div>
                      {getTransactionStatusBadge(transaction.status)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600 truncate">{transaction.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{transaction.date}</span>
                        <span className={`text-sm font-medium ${transaction.type === 'payment' ? 'text-red-600' : 'text-green-600'}`}>
                          {transaction.type === 'payment' ? `-${transaction.amount}` : transaction.amount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Desktop table view */}
              <div className="hidden sm:block overflow-x-auto">
                <Table>
                  <TableCaption className="text-xs">A list of your recent transactions</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">ID</TableHead>
                      <TableHead className="text-xs">Type</TableHead>
                      <TableHead className="text-xs">Description</TableHead>
                      <TableHead className="text-xs">Date</TableHead>
                      <TableHead className="text-xs">Amount</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-xs">{transaction.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getTransactionIcon(transaction.type)}
                            <span className="ml-2 capitalize text-xs">{transaction.type.replace('-', ' ')}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">{transaction.description}</TableCell>
                        <TableCell className="text-xs">{transaction.date}</TableCell>
                        <TableCell className={`text-xs ${transaction.type === 'payment' ? 'text-red-600' : 'text-green-600'}`}>
                          {transaction.type === 'payment' ? `-${transaction.amount}` : transaction.amount}
                        </TableCell>
                        <TableCell>{getTransactionStatusBadge(transaction.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-2">
              <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9">
                View All Transactions
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Rewards</CardTitle>
              <CardDescription className="text-sm">Redeem your carbon credits</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs defaultValue="available" className="w-full">
                <TabsList className="w-full mb-3 sm:mb-4 h-8 sm:h-9">
                  <TabsTrigger value="available" className="flex-1 text-xs sm:text-sm">Available</TabsTrigger>
                  <TabsTrigger value="redeemed" className="flex-1 text-xs sm:text-sm">Redeemed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="available">
                  <div className="space-y-2 sm:space-y-3">
                    {carbonRewards.map((reward) => (
                      <div key={reward.id} className="border rounded-lg p-2 sm:p-3 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-xs sm:text-sm truncate">{reward.name}</h4>
                            <div className="flex items-center mt-1 text-xs text-gray-600">
                              <Leaf className="h-3 w-3 mr-1 text-green-600 flex-shrink-0" />
                              <span>{reward.points} points</span>
                            </div>
                          </div>
                          <div className="ml-2">
                            <Button size="sm" variant="outline" className="h-6 sm:h-8 text-xs px-2 sm:px-3">
                              Redeem
                            </Button>
                          </div>
                        </div>
                        <div className="mt-1 sm:mt-2 text-xs text-gray-500">
                          Expires: {reward.expiryDate}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="redeemed">
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <Gift className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mb-2" />
                    <p className="text-xs sm:text-sm">No redeemed rewards yet</p>
                    <Button variant="outline" className="mt-3 sm:mt-4 text-xs sm:text-sm h-8 sm:h-9">
                      Browse Available Rewards
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Payment Methods</CardTitle>
            <CardDescription className="text-sm">Manage your payment options</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 sm:space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between border rounded-lg p-3 sm:p-4">
                  <div className="flex items-center min-w-0 flex-1">
                    <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-3 sm:mr-4 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center flex-wrap gap-1 sm:gap-2">
                        <h4 className="font-medium text-sm sm:text-base truncate">{method.name}</h4>
                        {method.isDefault && (
                          <Badge className="bg-primary text-white text-xs px-1.5 py-0.5">Default</Badge>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {method.type === 'card' ? `Expires: ${method.expiryDate}` : `Account: ${method.accountNumber}`}
                      </p>
                      <p className="text-xs text-gray-400">Last used: {method.lastUsed}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 ml-2">
                    {!method.isDefault && (
                      <Button size="sm" variant="outline" className="text-xs h-7 sm:h-8 px-2 sm:px-3">
                        Set Default
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-gray-500 h-7 sm:h-8 w-7 sm:w-8 p-0">
                      <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button 
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 border border-dashed border-gray-300 text-xs sm:text-sm h-8 sm:h-9"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Add New Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default WalletPage;
