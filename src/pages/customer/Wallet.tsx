import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Clock } from 'lucide-react';

const CustomerWalletPage = () => {
  return (
    <DashboardLayout userRole="CUSTOMER">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Wallet</h1>
          <p className="text-gray-600 mt-1">Manage your funds and transactions</p>
        </div>

        <Card className="border-2 border-dashed">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Wallet className="h-8 w-8 text-primary" />
              </div>
            <CardTitle className="text-xl sm:text-2xl">Wallet Feature Coming Soon</CardTitle>
          </CardHeader>
          <CardContent className="text-center pb-8">
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
              <Clock className="h-5 w-5" />
              <p className="text-base">We're working on something amazing!</p>
            </div>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Our wallet feature is currently under development. Soon you'll be able to manage your balance, 
              view transaction history, and make seamless payments. Stay tuned!
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CustomerWalletPage;
