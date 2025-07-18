
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowUpRight } from 'lucide-react';

export const WeeklyScheduleCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg">This Week's Schedule</CardTitle>
        <CardDescription className="text-sm">Your upcoming delivery shifts</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 sm:space-y-3">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
            <div key={day} className="flex justify-between items-center p-2 sm:p-3 border rounded-lg">
              <div className="flex items-center">
                <div className={`p-1.5 sm:p-2 ${index < 2 ? 'bg-gray-100' : 'bg-primary-light'} rounded-full mr-2 sm:mr-3 flex-shrink-0`}>
                  <Calendar className={`h-4 w-4 sm:h-5 sm:w-5 ${index < 2 ? 'text-gray-500' : 'text-primary'}`} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-sm sm:text-base">{day}</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {index < 2 ? 'Completed' : index === 2 ? 'Today' : 'Upcoming'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-xs sm:text-sm">
                  {index === 4 ? 'Off' : `${2 + index}:00 PM - ${7 + index}:00 PM`}
                </div>
                {index < 2 && (
                  <div className="text-xs text-gray-600">
                    {index === 0 ? '6 deliveries' : '8 deliveries'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-3 sm:mt-4 flex items-center justify-center bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9">
          <span>Manage Schedule</span>
          <ArrowUpRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
