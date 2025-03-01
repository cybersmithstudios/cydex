
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, TrendingUp, Recycle, Trophy, FileText } from 'lucide-react';

export function CarbonCredits() {
  // Mock stats
  const stats = [
    { title: "Total Carbon Saved", value: "12.6 Tons", change: "+24%", icon: Leaf },
    { title: "Active Participants", value: "1,845", change: "+12%", icon: Trophy },
    { title: "Recycling Rate", value: "78%", change: "+8%", icon: Recycle },
    { title: "Carbon Credits Issued", value: "28,456", change: "+18%", icon: TrendingUp },
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
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Sustainability Impact</CardTitle>
          <CardDescription>
            Tracking carbon footprint reduction and recycling participation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 text-center">
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                <Leaf className="h-16 w-16 opacity-50" />
              </div>
              <h3 className="text-lg font-medium">Carbon Reduction Over Time</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Monthly carbon savings in CO₂ equivalent
              </p>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
            
            <div className="border rounded-lg p-6 text-center">
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                <Recycle className="h-16 w-16 opacity-50" />
              </div>
              <h3 className="text-lg font-medium">Recycling Performance</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Tracking recycling rates and participation
              </p>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" className="gap-1.5">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
            <Button className="gap-1.5">
              <Leaf className="h-4 w-4" />
              Launch Carbon Initiative
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
