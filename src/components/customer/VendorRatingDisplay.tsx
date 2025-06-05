import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VendorRatingDisplayProps {
  rating: number;
  totalRatings: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export const VendorRatingDisplay: React.FC<VendorRatingDisplayProps> = ({
  rating,
  totalRatings,
  size = 'md',
  showCount = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  if (rating === 0 || totalRatings === 0) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <Star className={`${sizeClasses[size]} text-gray-300`} />
        <span className={`${textSizeClasses[size]} text-gray-400`}>No reviews</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Star className={`${sizeClasses[size]} text-yellow-400 fill-yellow-400`} />
      <span className={`${textSizeClasses[size]} font-medium`}>
        {rating.toFixed(1)}
      </span>
      {showCount && (
        <span className={`${textSizeClasses[size]} text-gray-500`}>
          ({totalRatings})
        </span>
      )}
    </div>
  );
};

interface VendorRatingBadgeProps {
  rating: number;
  totalRatings: number;
}

export const VendorRatingBadge: React.FC<VendorRatingBadgeProps> = ({
  rating,
  totalRatings
}) => {
  if (rating === 0 || totalRatings === 0) {
    return (
      <Badge variant="outline" className="text-xs">
        New Vendor
      </Badge>
    );
  }

  const getBadgeColor = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-100 text-green-800';
    if (rating >= 4.0) return 'bg-blue-100 text-blue-800';
    if (rating >= 3.5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };

  return (
    <Badge className={`${getBadgeColor(rating)} text-xs`}>
      ⭐ {rating.toFixed(1)}
    </Badge>
  );
}; 