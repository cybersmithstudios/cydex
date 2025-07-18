import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, AlertCircle, Package } from 'lucide-react';
import { toast } from 'sonner';

interface VerificationInputProps {
  orderNumber: string;
  customerName: string;
  expectedCode: string;
  onVerificationSuccess: () => void;
  onVerificationFailure: () => void;
  loading?: boolean;
}

export const VerificationInput: React.FC<VerificationInputProps> = ({
  orderNumber,
  customerName,
  expectedCode,
  onVerificationSuccess,
  onVerificationFailure,
  loading = false
}) => {
  const [inputCode, setInputCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerification = async () => {
    if (inputCode.trim().length !== 4) {
      toast.error('Please enter a 4-digit verification code');
      return;
    }

    setIsVerifying(true);

    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (inputCode.trim() === expectedCode) {
      toast.success('Verification successful! Order completed.');
      onVerificationSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        toast.error('Maximum verification attempts reached. Please contact support.');
        onVerificationFailure();
      } else {
        toast.error(`Incorrect code. ${3 - newAttempts} attempts remaining.`);
      }
      
      setInputCode('');
    }

    setIsVerifying(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setInputCode(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputCode.length === 4) {
      handleVerification();
    }
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-500" />
          Delivery Verification Required
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <div className="font-medium text-blue-900">Order #{orderNumber}</div>
              <div className="text-blue-700 text-sm">Customer: {customerName}</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm text-gray-600">
            Ask the customer for their 4-digit verification code to complete the delivery.
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label htmlFor="verification-code" className="block text-sm font-medium mb-1">
                Verification Code
              </label>
              <Input
                id="verification-code"
                type="text"
                placeholder="0000"
                value={inputCode}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="text-center text-lg tracking-widest font-mono"
                maxLength={4}
                disabled={loading || isVerifying || attempts >= 3}
              />
            </div>
            
            <Button
              onClick={handleVerification}
              disabled={inputCode.length !== 4 || loading || isVerifying || attempts >= 3}
              className="mt-6"
            >
              {isVerifying ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verify
                </>
              )}
            </Button>
          </div>

          {attempts > 0 && attempts < 3 && (
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">
                {attempts} failed attempt{attempts > 1 ? 's' : ''}. {3 - attempts} remaining.
              </span>
            </div>
          )}

          {attempts >= 3 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-600 mb-2">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium text-sm">Maximum attempts reached</span>
              </div>
              <div className="text-red-700 text-sm">
                Please contact customer support or the customer directly to resolve this issue.
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600">
            <strong>Security Note:</strong> The verification code ensures the order is delivered to the correct customer. 
            Do not complete the delivery without the correct code.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};