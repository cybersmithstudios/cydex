
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, TrendingUp, Clock, AlertCircle } from 'lucide-react';

export function OrderAnalytics() {
  // Mock data
  const orderStats = [
    { title: "Total Orders", value: "12,543", icon: Package },
    { title: "Completed", value: "11,982", icon: TrendingUp },
    { title: "In Progress", value: "124", icon: Clock },
    { title: "Issues", value: "37", icon: AlertCircle },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Order Analytics</CardTitle>
          <CardDescription>
            Monitor real-time orders and analyze performance metrics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {orderStats.map((stat, index) => (
              <div key={index} className="bg-muted/50 p-4 rounded-lg flex items-center gap-4">
                <div className="bg-background p-2 rounded-full">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="h-[400px] border rounded-lg flex items-center justify-center mb-6">
            <div className="text-center text-muted-foreground p-6">
              <TrendingUp className="h-16 w-16 mx-auto mb-2 opacity-50" />
              <h3 className="text-lg font-medium mb-1">Order Volume Chart</h3>
              <p className="mb-4">Detailed analytics will be displayed here</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm">Daily</Button>
                <Button variant="outline" size="sm">Weekly</Button>
                <Button variant="outline" size="sm">Monthly</Button>
                <Button variant="outline" size="sm">Custom</Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline">View All Orders</Button>
            <Button>Generate Reports</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
