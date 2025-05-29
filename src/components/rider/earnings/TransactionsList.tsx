
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: string;
  customer: string;
  orderType: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList = ({ transactions }: TransactionsListProps) => {
  return (
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
          {transactions.map(transaction => (
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
  );
};

export default TransactionsList;
