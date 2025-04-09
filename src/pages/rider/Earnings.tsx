
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wallet, Download, ArrowUpRight, BarChart, 
  TrendingUp, Calendar, Clock, ChevronDown, ChevronUp, Filter, 
  ArrowDownUp, FileText, DollarSign, Leaf, Gift
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Sample data for charts and tables
const weeklyEarningsData = [
  { day: 'Mon', deliveryFee: 12500, ecoBonus: 2500, tips: 1200, total: 16200 },
  { day: 'Tue', deliveryFee: 15300, ecoBonus: 3100, tips: 2500, total: 20900 },
  { day: 'Wed', deliveryFee: 9800, ecoBonus: 1900, tips: 800, total: 12500 },
  { day: 'Thu', deliveryFee: 16700, ecoBonus: 3400, tips: 3000, total: 23100 },
  { day: 'Fri', deliveryFee: 18200, ecoBonus: 3700, tips: 3200, total: 25100 },
  { day: 'Sat', deliveryFee: 22500, ecoBonus: 4500, tips: 4100, total: 31100 },
  { day: 'Sun', deliveryFee: 10500, ecoBonus: 2100, tips: 1800, total: 14400 }
];

const monthlyEarningsData = [
  { week: 'Week 1', deliveryFee: 78500, ecoBonus: 15700, tips: 12000, total: 106200 },
  { week: 'Week 2', deliveryFee: 83200, ecoBonus: 16600, tips: 14500, total: 114300 },
  { week: 'Week 3', deliveryFee: 92100, ecoBonus: 18400, tips: 16800, total: 127300 },
  { week: 'Week 4', deliveryFee: 88700, ecoBonus: 17700, tips: 15900, total: 122300 }
];

const recentTransactions = [
  { 
    id: 'TR-7842', 
    type: 'Earnings', 
    description: 'Weekly earnings payout',
    amount: 143500,
    status: 'completed',
    date: 'Apr 8, 2025',
    time: '09:15 AM'
  },
  { 
    id: 'TR-7830', 
    type: 'Withdrawal', 
    description: 'Bank withdrawal - Zenith Bank',
    amount: -125000,
    status: 'completed',
    date: 'Apr 7, 2025',
    time: '02:30 PM'
  },
  { 
    id: 'TR-7813', 
    type: 'Bonus', 
    description: 'Sustainability achievement bonus',
    amount: 25000,
    status: 'completed',
    date: 'Apr 5, 2025',
    time: '11:20 AM'
  },
  { 
    id: 'TR-7798', 
    type: 'Tip', 
    description: 'Customer tip - Order #ORD-2339',
    amount: 5000,
    status: 'completed',
    date: 'Apr 5, 2025',
    time: '10:45 AM'
  },
  { 
    id: 'TR-7785', 
    type: 'Earnings', 
    description: 'Daily delivery earnings',
    amount: 37500,
    status: 'completed',
    date: 'Apr 4, 2025',
    time: '08:30 PM'
  },
  { 
    id: 'TR-7766', 
    type: 'Withdrawal', 
    description: 'Bank withdrawal - GTBank',
    amount: -100000,
    status: 'completed',
    date: 'Apr 2, 2025',
    time: '03:15 PM'
  }
];

// Delivery history data
const deliveryHistory = [
  {
    id: 'ORD-2339',
    date: 'Apr 9, 2025',
    vendor: 'Zero Waste Store',
    customer: 'Michael Brown',
    deliveryFee: 8500.75,
    ecoBonus: 1200.25,
    tip: 2000,
    total: 11701.00,
    location: 'Ikoyi'
  },
  {
    id: 'ORD-2337',
    date: 'Apr 9, 2025',
    vendor: 'Green Earth Groceries',
    customer: 'Sarah Okafor',
    deliveryFee: 10800.25,
    ecoBonus: 1650.75,
    tip: 2000,
    total: 14451.00,
    location: 'Victoria Island'
  },
  {
    id: 'ORD-2334',
    date: 'Apr 9, 2025',
    vendor: 'Fresh Farm Produce',
    customer: 'Emmanuel Adegoke',
    deliveryFee: 15620.00,
    ecoBonus: 2200.50,
    tip: 1500,
    total: 19320.50,
    location: 'Lekki'
  },
  {
    id: 'ORD-2328',
    date: 'Apr 8, 2025',
    vendor: 'Tech Gadgets Store',
    customer: 'Chidi Okonkwo',
    deliveryFee: 9500.75,
    ecoBonus: 950.25,
    tip: 500,
    total: 10951.00,
    location: 'Ikeja'
  },
  {
    id: 'ORD-2325',
    date: 'Apr 8, 2025',
    vendor: 'Health Essentials',
    customer: 'Fatima Ahmed',
    deliveryFee: 7250.50,
    ecoBonus: 725.05,
    tip: 0,
    total: 7975.55,
    location: 'Surulere'
  }
];

const earningsStats = {
  daily: {
    deliveryFees: 35720.50,
    ecoBonus: 6150.25,
    tips: 5500.00,
    total: 47370.75
  },
  weekly: {
    deliveryFees: 234178.25,
    ecoBonus: 43693.35,
    tips: 64390.20,
    total: 342261.80
  },
  monthly: {
    deliveryFees: 869588.83,
    ecoBonus: 137211.45,
    tips: 234564.30,
    total: 1241364.58
  }
};

const formatCurrency = (amount) => {
  return amount.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const Earnings = () => {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState('week');
  const [walletBalance, setWalletBalance] = useState(285679.45);
  const [transactionSortOrder, setTransactionSortOrder] = useState('desc');
  const [showTransactionFilters, setShowTransactionFilters] = useState(false);
  const [chartType, setChartType] = useState('area');

  const getStatusBadge = (status) => {
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

  const getTransactionTypeIcon = (type) => {
    switch (type) {
      case 'Earnings':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'Withdrawal':
        return <Wallet className="h-4 w-4 text-amber-600" />;
      case 'Bonus':
        return <Gift className="h-4 w-4 text-blue-600" />;
      case 'Tip':
        return <Leaf className="h-4 w-4 text-purple-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const sortedTransactions = [...recentTransactions].sort((a, b) => {
    if (transactionSortOrder === 'desc') {
      return new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`);
    } else {
      return new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`);
    }
  });

  const areaColors = {
    deliveryFee: '#9b87f5',
    ecoBonus: '#4ade80',
    tips: '#60a5fa'
  };

  return (
    <DashboardLayout userRole="rider">
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Earnings & Wallet</h1>
            <p className="text-gray-600">Track your income and manage your finances</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download Report</span>
            </Button>
            <Button className="bg-primary hover:bg-primary-hover text-black" onClick={() => console.log('Withdraw clicked')}>
              <Wallet className="mr-2 h-4 w-4" />
              <span>Withdraw</span>
            </Button>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="mb-6">
          <Card className="bg-gradient-to-br from-primary-light to-white overflow-hidden relative">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-2">Wallet Balance</h3>
                  <p className="text-3xl font-bold">₦{formatCurrency(walletBalance)}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                    <span className="text-green-600">+₦{formatCurrency(earningsStats.daily.total)} today</span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                  <div className="flex items-center mb-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                    <span className="ml-2 text-sm text-gray-600">Auto-deposit: Off</span>
                  </div>
                  <Button className="bg-primary hover:bg-primary-hover text-black mt-2" onClick={() => console.log('Withdraw clicked')}>
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>Withdraw Funds</span>
                  </Button>
                </div>
              </div>
              
              <div className="absolute right-0 bottom-0 opacity-10">
                <Wallet className="h-32 w-32" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">Today's Earnings</p>
                  <p className="text-2xl font-bold mt-1">₦{formatCurrency(earningsStats.daily.total)}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm">
                      <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                      <span>Delivery Fees: ₦{formatCurrency(earningsStats.daily.deliveryFees)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      <span>Eco Bonus: ₦{formatCurrency(earningsStats.daily.ecoBonus)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      <span>Tips: ₦{formatCurrency(earningsStats.daily.tips)}</span>
                    </div>
                  </div>
                </div>
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">This Week's Earnings</p>
                  <p className="text-2xl font-bold mt-1">₦{formatCurrency(earningsStats.weekly.total)}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm">
                      <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                      <span>Delivery Fees: ₦{formatCurrency(earningsStats.weekly.deliveryFees)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      <span>Eco Bonus: ₦{formatCurrency(earningsStats.weekly.ecoBonus)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      <span>Tips: ₦{formatCurrency(earningsStats.weekly.tips)}</span>
                    </div>
                  </div>
                </div>
                <BarChart className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">This Month's Earnings</p>
                  <p className="text-2xl font-bold mt-1">₦{formatCurrency(earningsStats.monthly.total)}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm">
                      <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                      <span>Delivery Fees: ₦{formatCurrency(earningsStats.monthly.deliveryFees)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      <span>Eco Bonus: ₦{formatCurrency(earningsStats.monthly.ecoBonus)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      <span>Tips: ₦{formatCurrency(earningsStats.monthly.tips)}</span>
                    </div>
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Chart */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <CardTitle>Earnings Breakdown</CardTitle>
                <CardDescription>View your earnings by category over time</CardDescription>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="This Week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Chart Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="area">Area Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'area' ? (
                  <AreaChart 
                    data={dateRange === 'week' ? weeklyEarningsData : monthlyEarningsData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey={dateRange === 'week' ? 'day' : 'week'} 
                      fontSize={12}
                    />
                    <YAxis 
                      fontSize={12}
                      tickFormatter={(value) => `₦${value/1000}k`}
                    />
                    <Tooltip 
                      formatter={(value) => `₦${formatCurrency(value)}`} 
                      labelFormatter={(label) => dateRange === 'week' ? label : `${label}`}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="deliveryFee" 
                      name="Delivery Fee"
                      stackId="1" 
                      stroke={areaColors.deliveryFee} 
                      fill={areaColors.deliveryFee} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="ecoBonus" 
                      name="Eco Bonus"
                      stackId="1" 
                      stroke={areaColors.ecoBonus} 
                      fill={areaColors.ecoBonus} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="tips" 
                      name="Tips"
                      stackId="1" 
                      stroke={areaColors.tips} 
                      fill={areaColors.tips} 
                    />
                  </AreaChart>
                ) : (
                  <RechartsBarChart
                    data={dateRange === 'week' ? weeklyEarningsData : monthlyEarningsData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey={dateRange === 'week' ? 'day' : 'week'} 
                      fontSize={12}
                    />
                    <YAxis 
                      fontSize={12} 
                      tickFormatter={(value) => `₦${value/1000}k`}
                    />
                    <Tooltip 
                      formatter={(value) => `₦${formatCurrency(value)}`}
                      labelFormatter={(label) => dateRange === 'week' ? label : `${label}`}
                    />
                    <Legend />
                    <Bar 
                      dataKey="deliveryFee" 
                      name="Delivery Fee" 
                      stackId="a" 
                      fill={areaColors.deliveryFee} 
                    />
                    <Bar 
                      dataKey="ecoBonus" 
                      name="Eco Bonus" 
                      stackId="a" 
                      fill={areaColors.ecoBonus} 
                    />
                    <Bar 
                      dataKey="tips" 
                      name="Tips" 
                      stackId="a" 
                      fill={areaColors.tips} 
                    />
                  </RechartsBarChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Transactions and Delivery History */}
        <Tabs defaultValue="transactions" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="deliveries">Delivery History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Your recent financial activity</CardDescription>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => setShowTransactionFilters(!showTransactionFilters)}
                    >
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Filter</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => setTransactionSortOrder(transactionSortOrder === 'desc' ? 'asc' : 'desc')}
                    >
                      <ArrowDownUp className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        Sort {transactionSortOrder === 'desc' ? 'Oldest' : 'Newest'}
                      </span>
                    </Button>
                  </div>
                </div>
                
                {showTransactionFilters && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-3">
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Transaction Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="earnings">Earnings</SelectItem>
                          <SelectItem value="withdrawal">Withdrawals</SelectItem>
                          <SelectItem value="bonus">Bonuses</SelectItem>
                          <SelectItem value="tip">Tips</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select defaultValue="7days">
                        <SelectTrigger>
                          <SelectValue placeholder="Date Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7days">Last 7 Days</SelectItem>
                          <SelectItem value="30days">Last 30 Days</SelectItem>
                          <SelectItem value="90days">Last 90 Days</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Amounts</SelectItem>
                          <SelectItem value="lt10k">Under ₦10,000</SelectItem>
                          <SelectItem value="10k-50k">₦10,000 - ₦50,000</SelectItem>
                          <SelectItem value="gt50k">Over ₦50,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">Reset</Button>
                      <Button size="sm" className="bg-primary hover:bg-primary-hover text-black">Apply Filters</Button>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedTransactions.map((transaction) => (
                    <div 
                      key={transaction.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start sm:items-center">
                        <div className={`p-2 rounded-full mr-3 ${
                          transaction.amount > 0 ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {getTransactionTypeIcon(transaction.type)}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{transaction.description}</h3>
                            <span className="mx-2 text-gray-300 hidden sm:inline">•</span>
                            <span className="text-sm text-gray-500 hidden sm:inline">{transaction.id}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-xs sm:text-sm text-gray-500">
                              {transaction.date} {transaction.time}
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            {getStatusBadge(transaction.status)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 sm:mt-0 flex flex-col items-end">
                        <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-700'}`}>
                          {transaction.amount > 0 ? '+' : ''}₦{formatCurrency(Math.abs(transaction.amount))}
                        </p>
                        <p className="text-sm text-gray-500">Balance: ₦{formatCurrency(285679.45)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" className="w-full sm:w-auto">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="deliveries">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <CardTitle>Delivery History</CardTitle>
                    <CardDescription>Your recent completed deliveries</CardDescription>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <Select defaultValue="7days">
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Time Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="yesterday">Yesterday</SelectItem>
                        <SelectItem value="7days">Last 7 Days</SelectItem>
                        <SelectItem value="30days">Last 30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vendor/Customer
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Delivery Fee
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Eco Bonus
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tip
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {deliveryHistory.map((delivery) => (
                        <tr key={delivery.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {delivery.id}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {delivery.date}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <div>{delivery.vendor}</div>
                            <div className="text-gray-500">{delivery.customer}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {delivery.location}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                            ₦{formatCurrency(delivery.deliveryFee)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-green-600">
                            ₦{formatCurrency(delivery.ecoBonus)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                            ₦{formatCurrency(delivery.tip)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-right">
                            ₦{formatCurrency(delivery.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" className="w-full sm:w-auto">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  View Complete History
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Goal Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Earnings Goals</CardTitle>
            <CardDescription>Track your progress towards your financial targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="font-medium">Daily Target</p>
                  <p className="text-sm">₦{formatCurrency(earningsStats.daily.total)} / ₦50,000.00</p>
                </div>
                <Progress value={Math.min(earningsStats.daily.total / 50000 * 100, 100)} className="h-2" />
                <p className="text-sm text-gray-500 mt-1">
                  {Math.round(earningsStats.daily.total / 50000 * 100)}% complete
                </p>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <p className="font-medium">Weekly Target</p>
                  <p className="text-sm">₦{formatCurrency(earningsStats.weekly.total)} / ₦350,000.00</p>
                </div>
                <Progress value={Math.min(earningsStats.weekly.total / 350000 * 100, 100)} className="h-2" />
                <p className="text-sm text-gray-500 mt-1">
                  {Math.round(earningsStats.weekly.total / 350000 * 100)}% complete
                </p>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <p className="font-medium">Monthly Target</p>
                  <p className="text-sm">₦{formatCurrency(earningsStats.monthly.total)} / ₦1,500,000.00</p>
                </div>
                <Progress value={Math.min(earningsStats.monthly.total / 1500000 * 100, 100)} className="h-2" />
                <p className="text-sm text-gray-500 mt-1">
                  {Math.round(earningsStats.monthly.total / 1500000 * 100)}% complete
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full sm:w-auto flex items-center justify-center bg-primary hover:bg-primary-hover text-black">
              <span>Adjust Earnings Goals</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Earnings;
