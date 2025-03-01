
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, ArrowDownUp, Undo, CreditCard, DollarSign } from 'lucide-react';

export function PaymentsRefunds() {
  // Mock payment data
  const recentTransactions = [
    { id: 'TX123', user: 'John Doe', type: 'Order Payment', amount: '$34.50', status: 'Completed', date: '2023-05-10' },
    { id: 'TX124', user: 'Jane Smith', type: 'Refund', amount: '$21.75', status: 'Processing', date: '2023-05-09' },
    { id: 'TX125', user: 'Vendor Co.', type: 'Payout', amount: '$342.00', status: 'Completed', date: '2023-05-09' },
    { id: 'TX126', user: 'Alice Brown', type: 'Order Payment', amount: '$18.99', status: 'Completed', date: '2023-05-08' },
    { id: 'TX127', user: 'Rider Joe', type: 'Earnings', amount: '$45.25', status: 'Pending', date: '2023-05-08' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$54,232.89</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,543.00</div>
            <p className="text-xs text-muted-foreground">To 24 vendors and 38 riders</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refunds</CardTitle>
            <Undo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234.56</div>
            <p className="text-xs text-muted-foreground">8 pending approvals</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaction Fees</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,345.67</div>
            <p className="text-xs text-muted-foreground">From payment processors</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Latest payment activities across the platform
            </CardDescription>
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            <ArrowDownUp className="h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2 font-medium">Transaction ID</th>
                  <th className="pb-2 font-medium">User</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b">
                    <td className="py-4">{tx.id}</td>
                    <td className="py-4">{tx.user}</td>
                    <td className="py-4">{tx.type}</td>
                    <td className="py-4">{tx.amount}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        tx.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        tx.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4">{tx.date}</td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
