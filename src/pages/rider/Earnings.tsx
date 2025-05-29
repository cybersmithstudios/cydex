import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

import EarningsOverviewCards from '@/components/rider/earnings/EarningsOverviewCards';
import EarningsChart from '@/components/rider/earnings/EarningsChart';
import TransactionsList from '@/components/rider/earnings/TransactionsList';
import WithdrawalHistory from '@/components/rider/earnings/WithdrawalHistory';
import DeliveryPerformance from '@/components/rider/earnings/DeliveryPerformance';
import PaymentSettings from '@/components/rider/earnings/PaymentSettings';

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

  return (
    <DashboardLayout userRole="RIDER">
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Earnings Dashboard</h1>
          <p className="text-gray-600">Track your earnings, transactions, and withdrawals</p>
        </div>

        <EarningsOverviewCards 
          availableBalance={45600}
          todaysEarnings={8000}
          weeklyEarnings={32400}
          monthlyEarnings={172000}
        />

        <EarningsChart 
          period={period}
          setPeriod={setPeriod}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          dailyData={dailyEarningsData}
          weeklyData={weeklyEarningsData}
          monthlyData={monthlyEarningsData}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <TransactionsList transactions={recentTransactions} />
          <WithdrawalHistory withdrawals={withdrawalHistory} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DeliveryPerformance 
            completedDeliveries={75}
            onTimeRate={97}
            cancelledOrders={2}
            averageDeliveryTime={23}
            customerRating={4.9}
          />
          <PaymentSettings />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EarningsPage;
