
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useRiderData } from '@/hooks/useRiderData';

import EarningsOverviewCards from '@/components/rider/earnings/EarningsOverviewCards';
import EarningsChart from '@/components/rider/earnings/EarningsChart';
import TransactionsList from '@/components/rider/earnings/TransactionsList';
import WithdrawalHistory from '@/components/rider/earnings/WithdrawalHistory';
import DeliveryPerformance from '@/components/rider/earnings/DeliveryPerformance';
import PaymentSettings from '@/components/rider/earnings/PaymentSettings';

const EarningsPage = () => {
  const { todaysEarnings, weeklyEarnings, monthlyEarnings, riderProfile, loading } = useRiderData();
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [period, setPeriod] = useState('weekly');

  if (loading) {
    return (
      <DashboardLayout userRole="RIDER">
        <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate totals from real data
  const todaysTotal = todaysEarnings.reduce((sum, earning) => 
    sum + (earning.delivery_fee + earning.eco_bonus + earning.tip_amount), 0
  );
  
  const weeklyTotal = weeklyEarnings.reduce((sum, earning) => 
    sum + (earning.delivery_fee + earning.eco_bonus + earning.tip_amount), 0
  );
  
  const monthlyTotal = monthlyEarnings.reduce((sum, earning) => 
    sum + (earning.delivery_fee + earning.eco_bonus + earning.tip_amount), 0
  );

  // Transform earnings data for charts
  const dailyEarningsData = todaysEarnings.map((earning, index) => ({
    date: `Day ${index + 1}`,
    earnings: earning.delivery_fee + earning.eco_bonus + earning.tip_amount,
    deliveries: 1
  }));

  const weeklyEarningsData = [{
    week: 'This Week',
    earnings: weeklyTotal,
    deliveries: weeklyEarnings.length
  }];

  const monthlyEarningsData = [{
    month: 'This Month',
    earnings: monthlyTotal,
    deliveries: monthlyEarnings.length
  }];

  // Transform earnings to transaction format
  const recentTransactions = todaysEarnings.map((earning, index) => ({
    id: `TRX-${String(index + 1).padStart(3, '0')}`,
    date: new Date(earning.earnings_date).toLocaleDateString(),
    amount: earning.delivery_fee + earning.eco_bonus + earning.tip_amount,
    status: 'completed' as const,
    customer: 'Customer',
    orderType: 'Delivery'
  }));

  // Mock withdrawal history for now
  const withdrawalHistory = [
    {
      id: 'WDR-001',
      date: 'Last Week',
      amount: weeklyTotal * 0.8,
      status: 'completed' as const,
      accountNumber: '****4587',
      bank: 'Bank'
    }
  ];

  return (
    <DashboardLayout userRole="RIDER">
      <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
        <div className="mb-3 sm:mb-4 md:mb-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Earnings Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Track your earnings, transactions, and withdrawals</p>
        </div>

        <EarningsOverviewCards 
          availableBalance={monthlyTotal}
          todaysEarnings={todaysTotal}
          weeklyEarnings={weeklyTotal}
          monthlyEarnings={monthlyTotal}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <TransactionsList transactions={recentTransactions} />
          <WithdrawalHistory withdrawals={withdrawalHistory} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <DeliveryPerformance 
            completedDeliveries={riderProfile?.total_deliveries || 0}
            onTimeRate={97}
            cancelledOrders={0}
            averageDeliveryTime={23}
            customerRating={riderProfile?.rating || 0}
          />
          <PaymentSettings />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EarningsPage;
