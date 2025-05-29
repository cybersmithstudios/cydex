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
        return <CreditCard className="h-4 w-4 text-red-500" />;
      case 'top-up':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'cashback':
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      case 'carbon-credit':
        return <Leaf className="h-4 w-4 text-green-500" />;
      default:
        return <WalletIcon className="h-4 w-4" />;
    }
  };

  const getTransactionStatusBadge = (status: string) => {
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
      <div className="p-2 sm:p-4 md:p-6 max-w-full mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Wallet</h1>
            <p className="text-gray-600">
              Manage your balance, payments, and rewards
            </p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary-hover text-black flex items-center gap-2"
            onClick={() => {}}
          >
            <Download className="h-4 w-4" />
            Statement
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Balance</CardTitle>
              <CardDescription>Your current wallet balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start">
                <div className="text-4xl font-bold">₦37,560.95</div>
                <div className="mt-2 text-sm text-gray-600">Last updated: Today at 09:45 AM</div>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Top up your wallet</p>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Amount"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                    />
                    <Button 
                      onClick={handleTopUp}
                      className="bg-primary hover:bg-primary-hover text-black"
                    >
                      Top Up
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between items-center text-sm mb-1">
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
            <CardHeader>
              <CardTitle>Carbon Credits</CardTitle>
              <CardDescription>Earn by choosing eco-friendly options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <div className="text-2xl font-bold">240</div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span>Level Progress</span>
                  <span>80%</span>
                </div>
                <Progress value={80} className="h-2 bg-gray-100" />
                <p className="text-xs text-gray-500 mt-2">60 points until Eco Champion</p>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                Convert to Cash
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Recent activity in your wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Transaction Type</span>
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
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Time Period</span>
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
              
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>A list of your recent transactions</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getTransactionIcon(transaction.type)}
                            <span className="ml-2 capitalize">{transaction.type.replace('-', ' ')}</span>
                          </div>
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell className={transaction.type === 'payment' ? 'text-red-600' : 'text-green-600'}>
                          {transaction.type === 'payment' ? `-${transaction.amount}` : transaction.amount}
                        </TableCell>
                        <TableCell>{getTransactionStatusBadge(transaction.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" className="w-full sm:w-auto">
                View All Transactions
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rewards</CardTitle>
              <CardDescription>Redeem your carbon credits</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="available" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="available" className="flex-1">Available</TabsTrigger>
                  <TabsTrigger value="redeemed" className="flex-1">Redeemed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="available">
                  <div className="space-y-3">
                    {carbonRewards.map((reward) => (
                      <div key={reward.id} className="border rounded-lg p-3 hover:bg-gray-50">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{reward.name}</h4>
                            <div className="flex items-center mt-1 text-sm text-gray-600">
                              <Leaf className="h-3 w-3 mr-1 text-green-600" />
                              <span>{reward.points} points</span>
                            </div>
                          </div>
                          <div>
                            <Button size="sm" variant="outline" className="h-8">
                              Redeem
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Expires: {reward.expiryDate}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="redeemed">
                  <div className="text-center py-8 text-gray-500">
                    <Gift className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                    <p>No redeemed rewards yet</p>
                    <Button variant="outline" className="mt-4">
                      Browse Available Rewards
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your payment options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between border rounded-lg p-4">
                  <div className="flex items-center">
                    <CreditCard className="h-8 w-8 text-primary mr-4" />
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{method.name}</h4>
                        {method.isDefault && (
                          <Badge className="ml-2 bg-primary text-white">Default</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {method.type === 'card' ? `Expires: ${method.expiryDate}` : `Account: ${method.accountNumber}`}
                      </p>
                      <p className="text-xs text-gray-400">Last used: {method.lastUsed}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <Button size="sm" variant="outline">
                        Set Default
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-gray-500">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button 
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 border border-dashed border-gray-300"
              >
                <Plus className="h-4 w-4 mr-2" />
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
