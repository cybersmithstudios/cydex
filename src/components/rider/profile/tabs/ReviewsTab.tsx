
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MessageSquare } from 'lucide-react';

interface ReviewsTabProps {
  profile: any;
  recentReviews: any[];
}

const ReviewsTab = ({ profile, recentReviews }: ReviewsTabProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Star className="h-5 w-5 mr-2 text-amber-500" />
            Customer Reviews
          </CardTitle>
          <CardDescription>What customers will say about your delivery service</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-500">Complete deliveries to start receiving customer reviews!</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Rating Overview</CardTitle>
          <CardDescription>Your rating breakdown will appear here once you receive reviews</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="text-center py-8">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 text-gray-300" />
              ))}
            </div>
            <p className="text-2xl font-bold text-gray-400">0.0/5.0</p>
            <p className="text-gray-500 mt-2">No ratings yet</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ReviewsTab;
