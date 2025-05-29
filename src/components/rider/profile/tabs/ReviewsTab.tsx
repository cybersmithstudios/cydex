
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Star, Copy as Clipboard } from 'lucide-react';

interface ReviewsTabProps {
  profile: any;
  recentReviews: any[];
}

const ReviewsTab = ({ profile, recentReviews }: ReviewsTabProps) => {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-lg flex items-center">
              <Star className="h-5 w-5 mr-2 text-amber-500" />
              Customer Reviews
            </CardTitle>
            <CardDescription>What customers are saying about you</CardDescription>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center">
            <div className="flex items-center mr-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.floor(profile.stats.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <div>
              <p className="font-bold">{profile.stats.rating}/5.0</p>
              <p className="text-xs text-gray-500">{profile.stats.reviews} reviews</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="space-y-4">
            {recentReviews.map(review => (
              <div key={review.id} className="p-4 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">{review.customer}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            View All Reviews
          </Button>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Clipboard className="h-5 w-5 mr-2" />
            Rating Breakdown
          </CardTitle>
          <CardDescription>Detailed analysis of your customer ratings</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="font-medium mr-2">5</span>
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                </div>
                <span className="text-sm">180 reviews</span>
              </div>
              <Progress value={76} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="font-medium mr-2">4</span>
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                </div>
                <span className="text-sm">42 reviews</span>
              </div>
              <Progress value={18} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="font-medium mr-2">3</span>
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                </div>
                <span className="text-sm">11 reviews</span>
              </div>
              <Progress value={4} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="font-medium mr-2">2</span>
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                </div>
                <span className="text-sm">3 reviews</span>
              </div>
              <Progress value={1} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="font-medium mr-2">1</span>
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                </div>
                <span className="text-sm">1 review</span>
              </div>
              <Progress value={0.4} className="h-2" />
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg text-center">
              <p className="text-sm text-gray-500">On-time Delivery</p>
              <p className="font-bold text-lg">98%</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <p className="text-sm text-gray-500">Order Accuracy</p>
              <p className="font-bold text-lg">99%</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <p className="text-sm text-gray-500">Customer Service</p>
              <p className="font-bold text-lg">4.8/5</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <p className="text-sm text-gray-500">Handling Quality</p>
              <p className="font-bold text-lg">4.9/5</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ReviewsTab;
