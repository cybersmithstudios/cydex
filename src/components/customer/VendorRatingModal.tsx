import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Package, Truck, ThumbsUp } from 'lucide-react';
import { useSupabase } from '@/contexts/SupabaseContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from 'sonner';

interface VendorRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendorId: string;
  vendorName: string;
  orderId: string;
  orderNumber: string;
}

const StarRating: React.FC<{
  rating: number;
  onRatingChange: (rating: number) => void;
  label: string;
  icon?: React.ReactNode;
}> = ({ rating, onRatingChange, label, icon }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="focus:outline-none transition-colors"
          >
            <Star
              className={`h-6 w-6 ${
                star <= rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export const VendorRatingModal: React.FC<VendorRatingModalProps> = ({
  isOpen,
  onClose,
  vendorId,
  vendorName,
  orderId,
  orderNumber,
}) => {
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const [overallRating, setOverallRating] = useState(0);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [productQualityRating, setProductQualityRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasExistingRating, setHasExistingRating] = useState(false);
  const [checkingRating, setCheckingRating] = useState(true);

  // Check if user has already rated this vendor for this order
  useEffect(() => {
    const checkExistingRating = async () => {
      if (!user?.id || !vendorId || !orderId) {
        setCheckingRating(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('vendor_ratings')
          .select('id')
          .eq('customer_id', user.id)
          .eq('vendor_id', vendorId)
          .eq('order_id', orderId)
          .single();

        if (data && !error) {
          setHasExistingRating(true);
        }
      } catch (error) {
        // No existing rating found, which is fine
        setHasExistingRating(false);
      } finally {
        setCheckingRating(false);
      }
    };

    if (isOpen) {
      checkExistingRating();
    }
  }, [user?.id, vendorId, orderId, supabase, isOpen]);

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error('Please log in to submit a rating');
      return;
    }

    if (overallRating === 0) {
      toast.error('Please provide an overall rating');
      return;
    }

    try {
      setIsSubmitting(true);

      const { error } = await supabase
        .from('vendor_ratings')
        .insert({
          customer_id: user.id,
          vendor_id: vendorId,
          order_id: orderId,
          rating: overallRating,
          delivery_rating: deliveryRating || null,
          product_quality_rating: productQualityRating || null,
          feedback: feedback.trim() || null,
        });

      if (error) {
        console.error('Error submitting rating:', error);
        toast.error('Failed to submit rating. Please try again.');
        return;
      }

      toast.success('Thank you for your feedback!');
      onClose();
      
      // Reset form
      setOverallRating(0);
      setDeliveryRating(0);
      setProductQualityRating(0);
      setFeedback('');
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onClose();
    // Reset form
    setOverallRating(0);
    setDeliveryRating(0);
    setProductQualityRating(0);
    setFeedback('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ThumbsUp className="h-5 w-5 text-green-500" />
            {hasExistingRating ? 'Already Rated' : 'Rate Your Experience'}
          </DialogTitle>
          <DialogDescription>
            {hasExistingRating 
              ? `You have already rated ${vendorName} for order ${orderNumber}.`
              : `How was your experience with ${vendorName} for order ${orderNumber}?`
            }
          </DialogDescription>
        </DialogHeader>

        {checkingRating ? (
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              Checking rating status...
            </p>
          </div>
        ) : hasExistingRating ? (
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              Thank you for your feedback! You can only rate each order once.
            </p>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overall Rating */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Overall Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <StarRating
                  rating={overallRating}
                  onRatingChange={setOverallRating}
                  label="Overall Rating"
                  icon={<Star className="h-4 w-4 text-yellow-400" />}
                />
              </CardContent>
            </Card>

            {/* Detailed Ratings */}
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <StarRating
                    rating={deliveryRating}
                    onRatingChange={setDeliveryRating}
                    label="Delivery Speed"
                    icon={<Truck className="h-4 w-4 text-blue-500" />}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <StarRating
                    rating={productQualityRating}
                    onRatingChange={setProductQualityRating}
                    label="Product Quality"
                    icon={<Package className="h-4 w-4 text-green-500" />}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Feedback */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Additional Feedback (Optional)
              </label>
              <Textarea
                placeholder="Tell us more about your experience..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-gray-500">
                {feedback.length}/500 characters
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleSkip}
                disabled={isSubmitting}
                className="flex-1"
              >
                Skip
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || overallRating === 0}
                className="flex-1"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Rating'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};