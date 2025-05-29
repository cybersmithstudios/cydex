
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface EarningsOverviewCardsProps {
  availableBalance: number;
  todaysEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
}

const EarningsOverviewCards = ({ 
  availableBalance, 
  todaysEarnings, 
  weeklyEarnings, 
  monthlyEarnings 
}: EarningsOverviewCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Available Balance</p>
              <h3 className="text-2xl font-bold mt-1">₦{availableBalance.toLocaleString()}</h3>
            </div>
            <div className="bg-primary/10 p-2 rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 9H9V15H15V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <button className="text-xs w-full px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
              Withdraw
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Today's Earnings</p>
              <h3 className="text-2xl font-bold mt-1">₦{todaysEarnings.toLocaleString()}</h3>
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
              <h3 className="text-2xl font-bold mt-1">₦{weeklyEarnings.toLocaleString()}</h3>
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
              <h3 className="text-2xl font-bold mt-1">₦{monthlyEarnings.toLocaleString()}</h3>
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
  );
};

export default EarningsOverviewCards;
