
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowDown, ArrowUp, Clock, Package, TrendingUp, Truck, UserCheck } from "lucide-react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";

// Mock data
const stats = [
  {
    title: "Active Orders",
    value: "132",
    change: "+12%",
    changeType: "increase",
    icon: Package,
  },
  {
    title: "Active Riders",
    value: "28",
    change: "+4",
    changeType: "increase",
    icon: UserCheck,
  },
  {
    title: "Average Delivery Time",
    value: "24m",
    change: "-2m",
    changeType: "decrease",
    icon: Clock,
  },
  {
    title: "Carbon Offset",
    value: "342kg",
    change: "+18kg",
    changeType: "increase",
    icon: TrendingUp,
  },
];

const Dashboard = () => {
  return (
    <AdminDashboardLayout title="Dashboard">
      <div className="grid gap-6">
        {/* Stats section */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  {stat.changeType === "increase" ? (
                    <ArrowUp className="mr-1 h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDown className="mr-1 h-4 w-4 text-green-600" />
                  )}
                  <span className={stat.changeType === "increase" ? "text-green-600" : "text-green-600"}>
                    {stat.change} from yesterday
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent activity and map section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Recent activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from the fleet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 rounded-md bg-muted/50 p-3"
                  >
                    <Activity className="mt-0.5 h-5 w-5 text-green-600" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        {index === 0 && "Order #8721 delivered successfully"}
                        {index === 1 && "Rider Ahmad accepted order #8734"}
                        {index === 2 && "New escalation reported on order #8702"}
                        {index === 3 && "Rider Fatima went offline"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {index === 0 && "2 minutes ago"}
                        {index === 1 && "5 minutes ago"}
                        {index === 2 && "10 minutes ago"}
                        {index === 3 && "18 minutes ago"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delivery performance */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Performance</CardTitle>
              <CardDescription>
                Today's metrics vs 7-day average
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Average Delivery Time
                  </p>
                  <p className="text-2xl font-bold">24m</p>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    8% improvement
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Order Fulfillment Rate
                  </p>
                  <p className="text-2xl font-bold">98.3%</p>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    1.2% improvement
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">On-time deliveries</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[92%]" />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Customer satisfaction</span>
                  <span className="font-medium">89%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[89%]" />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Carbon savings target</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[78%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fleet summary */}
        <Card>
          <CardHeader>
            <CardTitle>Fleet Summary</CardTitle>
            <CardDescription>
              Current status of all delivery vehicles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-green-600" />
                    Electric Vehicles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-sm text-muted-foreground">
                    6 active, 2 charging
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-green-600" />
                    E-Bikes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14</div>
                  <p className="text-sm text-muted-foreground">
                    12 active, 2 maintenance
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-green-600" />
                    Bicycles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-sm text-muted-foreground">
                    All active and deployed
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default Dashboard;
