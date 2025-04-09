
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Wallet, CreditCard, ArrowUpRight, BarChart3, 
  Download, ArrowDown, ArrowUp, Plus, Bank,
  Calendar, Search, Filter, RefreshCw, CheckCircle
} from 'lucide-react';

// Mock data for wallet
const walletData = {
  balance: 1834657.50, // ₦1,834,657.50
  pendingAmount: 189426.43, // ₦189,426.43
  totalEarnings: 2453982.18, // ₦2,453,982.18
  withdrawableAmount: 1834657.50, // ₦1,834,657.50
  monthlyEarnings: 768245.33, // ₦768,245.33
  carbonOffsets: 125, // kg
  transactions: [
    {
      id: 'TRX-001234',
      type: 'credit',
      amount: 45916.34,
      description: 'Payment for order #ORD-5668',
      date: 'Today, 10:24 AM',
      status: 'completed'
    },
    {
      id: 'TRX-001233',
      type: 'debit',
      amount: 76527.23,
      description: 'Withdrawal to Zenith Bank (...4582)',
      date: 'Yesterday, 2:45 PM',
      status: 'completed'
    },
    {
      id: 'TRX-001232',
      type: 'credit',
      amount: 80104.97,
      description: 'Payment for order #ORD-5670',
      date: 'Yesterday, 9:30 AM',
      status: 'completed'
    },
    {
      id: 'TRX-001231',
      type: 'credit',
      amount: 64083.58,
      description: 'Payment for order #ORD-5665',
      date: 'Aug 15, 2023',
      status: 'completed'
    },
    {
      id: 'TRX-001230',
      type: 'debit',
      amount: 153054.45,
      description: 'Withdrawal to GT Bank (...7821)',
      date: 'Aug 10, 2023',
      status: 'completed'
    }
  ],
  pendingPayouts: [
    {
      id: 'PAY-00123',
      amount: 45916.34,
      orderId: 'ORD-5675',
      customerName: 'Jennifer Wilson',
      date: 'Processing (Expected in 24 hours)'
    },
    {
      id: 'PAY-00122',
      amount: 64083.58,
      orderId: 'ORD-5674',
      customerName: 'Robert Davis',
      date: 'Processing (Expected in 24 hours)'
    }
  ],
  paymentMethods: [
    {
      id: 'PM-001',
      name: 'Zenith Bank',
      accountNumber: '****4582',
      type: 'bank',
      isPrimary: true
    },
    {
      id: 'PM-002',
      name: 'GT Bank',
      accountNumber: '****7821',
      type: 'bank',
      isPrimary: false
    }
  ]
};

const VendorWallet = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredTransactions = () => {
    return walletData.transactions.filter((tx) => {
      const matchesSearch = 
        tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = 
        selectedType === 'all' ||
        (selectedType === 'credit' && tx.type === 'credit') ||
        (selectedType === 'debit' && tx.type === 'debit');
      
      return matchesSearch && matchesType;
    });
  };

  const getTransactionIcon = (type: string) => {
    return type === 'credit' ? (
      <div className="p-2 bg-green-100 rounded-full">
        <ArrowDown className="h-4 w-4 text-green-600" />
      </div>
    ) : (
      <div className="p-2 bg-amber-100 rounded-full">
        <ArrowUp className="h-4 w-4 text-amber-600" />
      </div>
    );
  };

  const formatAmount = (amount: number, type: string) => {
    return `${type === 'debit' ? '-' : ''}₦${amount.toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <DashboardLayout userRole="vendor">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Vendor Wallet</h1>
            <p className="text-gray-600">
              Manage your earnings, withdrawals, and payment methods
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-black">
            <ArrowUp className="mr-2 h-4 w-4" />
            Withdraw Funds
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-gradient-to-r from-primary/30 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Wallet className="mr-2 h-5 w-5" />
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                ₦{walletData.balance.toLocaleString('en-NG', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </div>
              <div className="flex flex-col sm:flex-row justify-between text-sm">
                <div>
                  <span className="text-gray-600">Pending: </span>
                  <span className="font-medium">₦{walletData.pendingAmount.toLocaleString('en-NG', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Earnings: </span>
                  <span className="font-medium">₦{walletData.totalEarnings.toLocaleString('en-NG', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 sm:gap-2 pt-0">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-black">
                <ArrowUp className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Statement
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Earnings</span>
                  <span>₦{walletData.monthlyEarnings.toLocaleString('en-NG')}</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Orders</span>
                  <span>38/50</span>
                </div>
                <Progress value={76} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Target: 50 orders</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Carbon Offset</span>
                  <span>{walletData.carbonOffsets} kg</span>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Target: 150 kg</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Management</CardTitle>
            <CardDescription>View your transactions and manage payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="transactions" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="pending">Pending Payouts</TabsTrigger>
                <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
              </TabsList>
              
              {/* Transactions Tab */}
              <TabsContent value="transactions">
                <div className="space-y-4">
                  {/* Search and Filter for transactions */}
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        className="pl-10"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant={selectedType === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedType('all')}
                      >
                        All
                      </Button>
                      <Button 
                        variant={selectedType === 'credit' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedType('credit')}
                        className={selectedType === 'credit' ? 'bg-green-600 hover:bg-green-700' : ''}
                      >
                        Credits
                      </Button>
                      <Button 
                        variant={selectedType === 'debit' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedType('debit')}
                        className={selectedType === 'debit' ? 'bg-amber-600 hover:bg-amber-700' : ''}
                      >
                        Debits
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Transactions list */}
                  <div className="space-y-2">
                    {filteredTransactions().map((transaction) => (
                      <div 
                        key={transaction.id} 
                        className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            {getTransactionIcon(transaction.type)}
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <span>{transaction.id}</span>
                                <span className="mx-1">•</span>
                                <span>{transaction.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className={`text-right ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-amber-600'
                          }`}>
                            <p className="font-medium">{formatAmount(transaction.amount, transaction.type)}</p>
                            <p className="text-xs mt-1">
                              {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button variant="outline" className="flex items-center">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Load More
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              {/* Pending Payouts Tab */}
              <TabsContent value="pending">
                <div className="space-y-4">
                  {walletData.pendingPayouts.length > 0 ? (
                    walletData.pendingPayouts.map((payout) => (
                      <div 
                        key={payout.id} 
                        className="p-4 border rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">Payment from {payout.customerName}</h3>
                              <Badge className="ml-2 bg-amber-500">Pending</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Order {payout.orderId}</p>
                            <p className="text-sm text-amber-700 font-medium mt-1">{payout.date}</p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <p className="text-lg font-bold text-amber-600">
                              ₦{payout.amount.toLocaleString('en-NG', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <CheckCircle className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="mt-2 text-gray-600">No pending payouts at the moment</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Payment Methods Tab */}
              <TabsContent value="payment-methods">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {walletData.paymentMethods.map((method) => (
                      <div 
                        key={method.id} 
                        className={`p-4 border rounded-lg ${
                          method.isPrimary ? 'border-primary bg-primary/5' : ''
                        } hover:shadow-md transition-shadow`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex space-x-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Bank className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{method.name}</p>
                              <p className="text-sm text-gray-600 mt-1">Account: {method.accountNumber}</p>
                              {method.isPrimary && (
                                <Badge className="mt-2 bg-primary text-black">Primary</Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            {!method.isPrimary && (
                              <Button variant="ghost" size="sm">Remove</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add New Payment Method Card */}
                    <div className="p-4 border-2 border-dashed rounded-lg hover:bg-gray-50 cursor-pointer flex items-center justify-center">
                      <div className="text-center">
                        <div className="p-2 bg-gray-100 rounded-full mx-auto mb-2 w-10 h-10 flex items-center justify-center">
                          <Plus className="h-6 w-6 text-gray-600" />
                        </div>
                        <p className="font-medium">Add New Payment Method</p>
                        <p className="text-sm text-gray-600 mt-1">Connect bank account or card</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Method Form Section */}
                  <div className="mt-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Add Bank Account</CardTitle>
                        <CardDescription>Enter your bank details for withdrawals</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="bank-name">Bank Name</Label>
                            <Input id="bank-name" placeholder="Select your bank" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="account-number">Account Number</Label>
                            <Input id="account-number" placeholder="10-digit account number" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="account-name">Account Name</Label>
                            <Input id="account-name" placeholder="Account holder name" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="bg-primary hover:bg-primary-hover text-black">
                          Save Bank Account
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VendorWallet;
