
import React from 'react';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

interface LoadingDisplayProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
  fullScreen?: boolean;
}

const LoadingDisplay = ({
  size = 'md',
  message = 'Loading...',
  className,
  fullScreen = false,
}: LoadingDisplayProps) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center'
    : 'flex flex-col items-center justify-center p-4';

  return (
    <div className={cn(containerClasses, className)}>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="relative">
          <LoaderCircle
            className={cn(
              "animate-spin text-primary",
              sizeClasses[size]
            )}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn(
              "bg-primary rounded-full",
              {
                'h-1.5 w-1.5': size === 'sm',
                'h-2 w-2': size === 'md',
                'h-3 w-3': size === 'lg',
              }
            )} />
          </div>
        </div>
        {message && (
          <p className={cn(
            "text-muted-foreground font-medium",
            {
              'text-xs': size === 'sm',
              'text-sm': size === 'md',
              'text-base': size === 'lg',
            }
          )}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingDisplay;
