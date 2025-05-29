import React, { useState } from 'react';
import { format } from 'date-fns';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Wallet, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Leaf, 
  Star,
  ArrowUp,
  ArrowDown,
  ChevronRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EarningsPage = () => {
  // States for date pickers
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [period, setPeriod] = useState('weekly');

  // Daily earnings data (mock data)
  const dailyEarningsData = [
    { date: 'Apr 1', earnings: 5200, deliveries: 8 },
    { date: 'Apr 2', earnings: 6700, deliveries: 10 },
    { date: 'Apr 3', earnings: 4900, deliveries: 7 },
    { date: 'Apr 4', earnings: 7300, deliveries: 12 },
    { date: 'Apr 5', earnings: 8400, deliveries: 14 },
    { date: 'Apr 6', earnings: 5600, deliveries: 9 },
    { date: 'Apr 7', earnings: 3800, deliveries: 6 },
    { date: 'Apr 8', earnings: 6200, deliveries: 11 },
    { date: 'Apr 9', earnings: 7500, deliveries: 13 }
  ];

  // Weekly earnings data (mock data)
  const weeklyEarningsData = [
    { week: 'Week 1', earnings: 42000, deliveries: 67 },
    { week: 'Week 2', earnings: 38500, deliveries: 58 },
    { week: 'Week 3', earnings: 45200, deliveries: 72 },
    { week: 'Week 4', earnings: 51000, deliveries: 81 }
  ];

  // Monthly earnings data (mock data)
  const monthlyEarningsData = [
    { month: 'Jan', earnings: 184000, deliveries: 290 },
    { month: 'Feb', earnings: 176500, deliveries: 275 },
    { month: 'Mar', earnings: 195200, deliveries: 310 },
    { month: 'Apr', earnings: 172000, deliveries: 270 }
  ];

  // Recent transactions (mock data)
  const recentTransactions = [
    {
      id: 'TRX-001',
      date: 'Apr 9, 2025',
      amount: 3800,
      status: 'completed',
      customer: 'Sarah Johnson',
      orderType: 'Food Delivery'
    },
    {
      id: 'TRX-002',
      date: 'Apr 9, 2025',
      amount: 4200,
      status: 'completed',
      customer: 'Michael Brown',
      orderType: 'Package Delivery'
    },
    {
      id: 'TRX-003',
      date: 'Apr 8, 2025',
      amount: 2900,
      status: 'completed',
      customer: 'David Wilson',
      orderType: 'Food Delivery'
    },
    {
      id: 'TRX-004',
      date: 'Apr 8, 2025',
      amount: 5100,
      status: 'completed',
      customer: 'Emily Taylor',
      orderType: 'Grocery Delivery'
    },
    {
      id: 'TRX-005',
      date: 'Apr 7, 2025',
      amount: 3400,
      status: 'completed',
      customer: 'Daniel Martinez',
      orderType: 'Package Delivery'
    }
  ];

  // Withdrawal history (mock data)
  const withdrawalHistory = [
    {
      id: 'WDR-001',
      date: 'Apr 5, 2025',
      amount: 35000,
      status: 'completed',
      accountNumber: '****4587',
      bank: 'Zenith Bank'
    },
    {
      id: 'WDR-002',
      date: 'Mar 29, 2025',
      amount: 42000,
      status: 'completed',
      accountNumber: '****4587',
      bank: 'Zenith Bank'
    },
    {
      id: 'WDR-003',
      date: 'Mar 22, 2025',
      amount: 38500,
      status: 'completed',
      accountNumber: '****4587',
      bank: 'Zenith Bank'
    }
  ];

  // Calculate total earnings
  const totalEarnings = recentTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  
  // Calculate total withdrawals
  const totalWithdrawals = withdrawalHistory.reduce((sum, wdr) => sum + wdr.amount, 0);

  // Helper function to determine if earnings are up or down
  const earningsChange = () => {
    // In a real app, this would compare current period with previous period
    // For this demo, we'll just hardcode a value
    return {
      percentage: 12.5,
      isUp: true
    };
  };

  return (
    <DashboardLayout userRole="RIDER">
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Earnings Dashboard</h1>
          <p className="text-gray-600">Track your earnings, transactions, and withdrawals</p>
        </div>

        {/* Earnings Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Available Balance</p>
                  <h3 className="text-2xl font-bold mt-1">₦{(45600).toLocaleString()}</h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 9H9V15H15V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Button size="sm" variant="outline" className="text-xs w-full">
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Today's Earnings</p>
                  <h3 className="text-2xl font-bold mt-1">₦{(8000).toLocaleString()}</h3>
                </div>
                <div className="bg-green-100 text-green-700 p-2 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 8L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 8L16 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span className="text-xs font-medium">23% vs yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">This Week</p>
                  <h3 className="text-2xl font-bold mt-1">₦{(32400).toLocaleString()}</h3>
                </div>
                <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span className="text-xs font-medium">8% vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">This Month</p>
                  <h3 className="text-2xl font-bold mt-1">₦{(172000).toLocaleString()}</h3>
                </div>
                <div className="bg-amber-100 text-amber-700 p-2 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-red-600">
                <ArrowDown className="h-3 w-3 mr-1" />
                <span className="text-xs font-medium">5% vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter and Chart Section */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Earnings Overview</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="w-[120px] pl-3 text-left font-normal">
                        {startDate ? format(startDate, 'PPP') : 'Start date'}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="w-[120px] pl-3 text-left font-normal">
                        {endDate ? format(endDate, 'PPP') : 'End date'}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={period === 'daily' ? dailyEarningsData : period === 'weekly' ? weeklyEarningsData : monthlyEarningsData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey={period === 'daily' ? 'date' : period === 'weekly' ? 'week' : 'month'} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(value) => `₦${value}`} 
                  />
                  <Tooltip 
                    formatter={(value: number) => [`₦${value}`, 'Earnings']}
                    labelFormatter={(value) => `${value}`}
                  />
                  <Bar dataKey="earnings" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent Transactions Card */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">{transaction.orderType}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+₦{transaction.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">ID: {transaction.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Withdrawal History Card */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Withdrawal History</CardTitle>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {withdrawalHistory.map(withdrawal => (
                  <div key={withdrawal.id} className="flex flex-col p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between">
                      <p className="font-medium">{withdrawal.bank}</p>
                      <Badge variant="outline">{withdrawal.status}</Badge>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-gray-500">{withdrawal.accountNumber}</p>
                      <p className="font-bold">-₦{withdrawal.amount.toLocaleString()}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{withdrawal.date}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button className="w-full bg-primary hover:bg-primary-hover text-black">
                  Withdraw Funds
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Delivery Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Performance</CardTitle>
              <CardDescription>Your delivery metrics this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Completed Deliveries</p>
                  <p className="font-bold">75</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">On-Time Rate</p>
                  <p className="font-bold">97%</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Cancelled Orders</p>
                  <p className="font-bold">2</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Average Delivery Time</p>
                  <p className="font-bold">23 mins</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Customer Rating</p>
                  <div className="flex items-center">
                    <p className="font-bold mr-1">4.9</p>
                    <div className="flex">
                      {[1,2,3,4,5].map(star => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={star <= 5 ? "gold" : "none"} stroke="gold" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  View Detailed Performance
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Manage your payout preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                          <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Zenith Bank</p>
                        <p className="text-xs text-gray-500">****4587</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="font-medium">Auto Withdrawal</p>
                    <p className="text-xs text-gray-500">Withdraw earnings every week</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="font-medium">Payment Notifications</p>
                    <p className="text-xs text-gray-500">Get alerts for new payments</p>
                  </div>
                  <Switch checked />
                </div>
                
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="font-medium">Minimum Withdrawal</p>
                    <p className="text-xs text-gray-500">Threshold for auto withdrawal</p>
                  </div>
                  <div className="font-bold">₦10,000</div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline">
                  Add Bank Account
                </Button>
                <Button className="bg-primary hover:bg-primary-hover text-black">
                  Update Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EarningsPage;
