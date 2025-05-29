
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

interface Withdrawal {
  id: string;
  date: string;
  amount: number;
  status: string;
  accountNumber: string;
  bank: string;
}

interface WithdrawalHistoryProps {
  withdrawals: Withdrawal[];
}

const WithdrawalHistory = ({ withdrawals }: WithdrawalHistoryProps) => {
  return (
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
          {withdrawals.map(withdrawal => (
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
  );
};

export default WithdrawalHistory;
