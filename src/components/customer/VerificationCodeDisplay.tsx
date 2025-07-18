import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Shield, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface VerificationCodeDisplayProps {
  code: string;
  orderNumber: string;
  riderName?: string;
  status: string;
}

export const VerificationCodeDisplay: React.FC<VerificationCodeDisplayProps> = ({
  code,
  orderNumber,
  riderName,
  status
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Verification code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'ready':
        return 'bg-blue-100 text-blue-800';
      case 'out_for_delivery':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'ready':
        return 'Ready for Pickup';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Processing';
    }
  };

  return (
    <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-primary" />
          Delivery Verification Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-32 h-16 bg-white rounded-lg border-2 border-primary/20 mb-3">
            <span className="text-3xl font-bold text-primary tracking-widest">
              {code}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="ml-2"
          >
            {copied ? (
              <Check className="h-4 w-4 mr-1" />
            ) : (
              <Copy className="h-4 w-4 mr-1" />
            )}
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Order:</span>
            <span className="font-medium">{orderNumber}</span>
          </div>
          
          {riderName && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Rider:</span>
              <span className="font-medium">{riderName}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <Badge className={getStatusColor()}>
              {getStatusText()}
            </Badge>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Important:</p>
              <p>
                Only share this code with your delivery rider upon arrival. 
                The rider will need to enter this code to complete the delivery.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};