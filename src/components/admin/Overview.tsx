
import { ArrowUpRight, Users, Package, Wallet, Leaf, ShieldCheck, Settings, BarChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function Overview() {
  // Mock data for the dashboard
  const stats = [
    {
      title: "Total Users",
      value: "2,856",
      change: "+12.5%",
      icon: Users,
    },
    {
      title: "Active Orders",
      value: "134",
      change: "+3.2%",
      icon: Package,
    },
    {
      title: "Revenue",
      value: "$28.4k",
      change: "+15.6%",
      icon: Wallet,
    },
    {
      title: "Carbon Saved",
      value: "12.6t",
      change: "+24.3%",
      icon: Leaf,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className={stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>
                <ArrowUpRight className="h-3 w-3 ml-1" />
                <span className="ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
            <CardDescription>
              Daily active users and orders
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t pt-4">
            <div className="text-center text-muted-foreground">
              <BarChart className="h-16 w-16 mx-auto mb-2 opacity-50" />
              <p>Activity chart will be displayed here</p>
              <Button variant="outline" className="mt-4">Generate Report</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common admin tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                View Active Orders
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Wallet className="mr-2 h-4 w-4" />
                Process Refunds
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Security Audit
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                System Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
