
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useRiderData } from '@/hooks/useRiderData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Wallet, 
  Calendar,
  RefreshCw,
  Download,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { toast } from 'sonner';

const EarningsPage = () => {
  const { 
    todaysEarnings, 
    weeklyEarnings, 
    monthlyEarnings, 
    riderProfile, 
    loading,
    refetch
  } = useRiderData();
  
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  // Auto-refresh earnings every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch.todaysEarnings();
      refetch.weeklyEarnings();
      refetch.monthlyEarnings();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetch.todaysEarnings(),
        refetch.weeklyEarnings(),
        refetch.monthlyEarnings()
      ]);
      toast.success('Earnings refreshed');
    } catch (error) {
      toast.error('Failed to refresh earnings');
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout userRole="RIDER">
        <div className="p-2 sm:p-4 max-w-7xl mx-auto">
          <div className="animate-pulse space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate totals
  const todaysTotal = todaysEarnings.reduce((sum, earning) => 
    sum + (earning.delivery_fee + earning.eco_bonus + earning.tip_amount), 0
  );
  
  const weeklyTotal = weeklyEarnings.reduce((sum, earning) => 
    sum + (earning.delivery_fee + earning.eco_bonus + earning.tip_amount), 0
  );
  
  const monthlyTotal = monthlyEarnings.reduce((sum, earning) => 
    sum + (earning.delivery_fee + earning.eco_bonus + earning.tip_amount), 0
  );

  const todaysEcoBonus = todaysEarnings.reduce((sum, earning) => sum + Number(earning.eco_bonus), 0);
  const weeklyEcoBonus = weeklyEarnings.reduce((sum, earning) => sum + Number(earning.eco_bonus), 0);
  const monthlyEcoBonus = monthlyEarnings.reduce((sum, earning) => sum + Number(earning.eco_bonus), 0);

  const deliveriesCompleted = todaysEarnings.length;
  const weeklyDeliveries = weeklyEarnings.length;
  const monthlyDeliveries = monthlyEarnings.length;

  const formatCurrency = (amount: number) => 
    `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const getEarningsData = () => {
    switch (selectedPeriod) {
      case 'today':
        return { total: todaysTotal, eco: todaysEcoBonus, deliveries: deliveriesCompleted };
      case 'week':
        return { total: weeklyTotal, eco: weeklyEcoBonus, deliveries: weeklyDeliveries };
      case 'month':
        return { total: monthlyTotal, eco: monthlyEcoBonus, deliveries: monthlyDeliveries };
      default:
        return { total: todaysTotal, eco: todaysEcoBonus, deliveries: deliveriesCompleted };
    }
  };

  const currentData = getEarningsData();
  const dailyGoal = 8; // Target deliveries per day
  const progressPercentage = selectedPeriod === 'today' 
    ? Math.min((deliveriesCompleted / dailyGoal) * 100, 100)
    : 100;

  return (
    <DashboardLayout userRole="RIDER">
      <div className="p-2 sm:p-4 max-w-7xl mx-auto space-y-3 sm:space-y-4">
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold">Earnings</h1>
            <p className="text-xs sm:text-sm text-gray-600">Track your income and performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1 h-8"
            >
              <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 h-8"
            >
              <Download className="h-3 w-3" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Period Selector - Compact */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit">
          {(['today', 'week', 'month'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedPeriod === period 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period === 'today' ? 'Today' : period === 'week' ? 'Week' : 'Month'}
            </button>
          ))}
        </div>

        {/* Compact Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {/* Available Balance */}
          <Card className="p-3">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 truncate">Available</p>
                  <h3 className="text-sm sm:text-base font-bold truncate">
                    {formatCurrency(monthlyTotal)}
                  </h3>
                </div>
                <div className="flex-shrink-0 p-1.5 bg-primary/10 rounded-full">
                  <Wallet className="h-3 w-3 text-primary" />
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2 h-7 text-xs"
              >
                Withdraw
              </Button>
            </CardContent>
          </Card>

          {/* Current Period Earnings */}
          <Card className="p-3">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 truncate">
                    {selectedPeriod === 'today' ? "Today's" : selectedPeriod === 'week' ? "This Week" : "This Month"}
                  </p>
                  <h3 className="text-sm sm:text-base font-bold truncate">
                    {formatCurrency(currentData.total)}
                  </h3>
                </div>
                <div className="flex-shrink-0 p-1.5 bg-green-100 rounded-full">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                </div>
              </div>
              {currentData.eco > 0 && (
                <div className="flex items-center mt-1 text-green-600">
                  <ArrowUp className="h-2 w-2 mr-1" />
                  <span className="text-xs">+{formatCurrency(currentData.eco)} eco</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Deliveries */}
          <Card className="p-3">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 truncate">Deliveries</p>
                  <h3 className="text-sm sm:text-base font-bold">
                    {currentData.deliveries}
                  </h3>
                </div>
                <div className="flex-shrink-0 p-1.5 bg-blue-100 rounded-full">
                  <Calendar className="h-3 w-3 text-blue-600" />
                </div>
              </div>
              {selectedPeriod === 'today' && (
                <div className="mt-1">
                  <div className="flex justify-between text-xs mb-0.5">
                    <span>Goal Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-1" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Rating */}
          <Card className="p-3">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 truncate">Rating</p>
                  <h3 className="text-sm sm:text-base font-bold">
                    {(riderProfile?.rating || 0).toFixed(1)}
                  </h3>
                </div>
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="h-2 w-2 fill-current" viewBox="0 0 24 24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {riderProfile?.total_deliveries || 0} total trips
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Stats - Compact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Earnings Breakdown */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Earnings Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Delivery Fees</span>
                <span className="font-medium">
                  {formatCurrency(currentData.total - currentData.eco)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Eco Bonuses</span>
                <span className="font-medium text-green-600">
                  +{formatCurrency(currentData.eco)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-bold text-sm">Total</span>
                <span className="text-base font-bold">{formatCurrency(currentData.total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">On-Time Rate</span>
                <span className="font-medium">97%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Avg. Delivery Time</span>
                <span className="font-medium">23 mins</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">CO₂ Saved</span>
                <span className="font-medium text-green-600">
                  {(todaysEarnings.reduce((sum, earning) => sum + Number(earning.carbon_credits_earned || 0), 0) / 1000).toFixed(1)} kg
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions - Compact */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              Recent Transactions
              <Badge variant="outline" className="text-xs">
                {todaysEarnings.length} today
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todaysEarnings.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No transactions today
              </p>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {todaysEarnings.slice(0, 5).map((earning, index) => (
                  <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">
                        Delivery #{String(index + 1).padStart(3, '0')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(earning.earnings_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium">
                        {formatCurrency(earning.delivery_fee + earning.eco_bonus + earning.tip_amount)}
                      </p>
                      {earning.eco_bonus > 0 && (
                        <p className="text-xs text-green-600">
                          +{formatCurrency(earning.eco_bonus)} eco
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EarningsPage;
