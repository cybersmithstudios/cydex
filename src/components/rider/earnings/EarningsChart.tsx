
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Download } from 'lucide-react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EarningsChartProps {
  period: string;
  setPeriod: (period: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  dailyData: any[];
  weeklyData: any[];
  monthlyData: any[];
}

const EarningsChart = ({
  period,
  setPeriod,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  dailyData,
  weeklyData,
  monthlyData
}: EarningsChartProps) => {
  const getChartData = () => {
    switch (period) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const getDataKey = () => {
    switch (period) {
      case 'daily':
        return 'date';
      case 'weekly':
        return 'week';
      case 'monthly':
        return 'month';
      default:
        return 'date';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Earnings Overview</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="w-[120px] pl-3 text-left font-normal">
                    {startDate ? format(startDate, 'PPP') : 'Start date'}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="w-[120px] pl-3 text-left font-normal">
                    {endDate ? format(endDate, 'PPP') : 'End date'}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getChartData()}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey={getDataKey()} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(value) => `₦${value}`} 
              />
              <Tooltip 
                formatter={(value: number) => [`₦${value}`, 'Earnings']}
                labelFormatter={(value) => `${value}`}
              />
              <Bar dataKey="earnings" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsChart;
