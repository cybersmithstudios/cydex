import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePaystackPayment } from 'react-paystack';
import { toast } from 'sonner';
import { CheckCircle, XCircle, CreditCard, TestTube, Info } from 'lucide-react';

export const PaystackTestPanel = () => {
  const [testAmount, setTestAmount] = useState(1000);
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testResults, setTestResults] = useState<Array<{
    id: string;
    amount: number;
    status: 'success' | 'failed';
    reference: string;
    timestamp: string;
  }>>([]);

  // Paystack configuration for testing
  const config = {
    reference: `TEST-${Date.now()}`,
    email: testEmail,
    amount: testAmount * 100, // Convert to kobo
    publicKey: 'pk_test_b11301f99f310c1a5002e66379e5eaa5906b7e63',
    currency: 'NGN',
    metadata: {
      custom_fields: [
        {
          display_name: 'Test Type',
          variable_name: 'test_type',
          value: 'Integration Test',
        },
        {
          display_name: 'Platform',
          variable_name: 'platform',
          value: 'Cydex Admin Panel',
        },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  const handleTestPayment = () => {
    if (!testEmail || testAmount <= 0) {
      toast.error('Please enter valid email and amount');
      return;
    }

    initializePayment(
      (response: any) => {
        const result = {
          id: Date.now().toString(),
          amount: testAmount,
          status: 'success' as const,
          reference: response.reference,
          timestamp: new Date().toLocaleString(),
        };
        
        setTestResults(prev => [result, ...prev]);
        toast.success('Test payment successful!');
        
        console.log('Test payment successful:', response);
      },
      () => {
        const result = {
          id: Date.now().toString(),
          amount: testAmount,
          status: 'failed' as const,
          reference: config.reference,
          timestamp: new Date().toLocaleString(),
        };
        
        setTestResults(prev => [result, ...prev]);
        toast.error('Test payment failed');
        
        console.log('Test payment failed');
      }
    );
  };

  const clearTestResults = () => {
    setTestResults([]);
  };

  const getStatusIcon = (status: 'success' | 'failed') => {
    return status === 'success' 
      ? <CheckCircle className="h-4 w-4 text-green-500" />
      : <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusBadge = (status: 'success' | 'failed') => {
    return status === 'success'
      ? <Badge className="bg-green-100 text-green-800">Success</Badge>
      : <Badge className="bg-red-100 text-red-800">Failed</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-blue-500" />
            <CardTitle>Paystack Integration Test Panel</CardTitle>
          </div>
          <CardDescription>
            Test Paystack payment integration in a safe environment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configuration Info */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Test Mode Active:</strong> Using test public key: pk_test_b11...6e63
              <br />
              No real money will be charged during testing.
            </AlertDescription>
          </Alert>

          {/* Test Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="test-email">Test Email</Label>
              <Input
                id="test-email"
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="test@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="test-amount">Test Amount (₦)</Label>
              <Input
                id="test-amount"
                type="number"
                value={testAmount}
                onChange={(e) => setTestAmount(Number(e.target.value))}
                min="1"
                max="100000"
              />
            </div>
          </div>

          {/* Test Actions */}
          <div className="flex gap-3">
            <Button 
              onClick={handleTestPayment}
              className="bg-primary hover:bg-primary/80 text-black"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Test Payment (₦{testAmount.toLocaleString()})
            </Button>
            {testResults.length > 0 && (
              <Button variant="outline" onClick={clearTestResults}>
                Clear Results
              </Button>
            )}
          </div>

          {/* Test Cards Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Test Card Details</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Successful Payment:</strong> 4084 0840 8408 4081, Expiry: 12/25, CVV: 408</p>
              <p><strong>Failed Payment:</strong> 4084 0840 8408 4099, Expiry: 12/25, CVV: 408</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>
              Payment test history for this session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <p className="font-medium">₦{result.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{result.reference}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(result.status)}
                    <p className="text-sm text-gray-500 mt-1">{result.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Status</CardTitle>
          <CardDescription>
            Current Paystack configuration status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Environment</Label>
              <Badge className="bg-orange-100 text-orange-800">Test Mode</Badge>
            </div>
            <div className="space-y-2">
              <Label>Public Key</Label>
              <p className="text-sm font-mono">pk_test_b11...6e63</p>
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <p className="text-sm">Nigerian Naira (NGN)</p>
            </div>
            <div className="space-y-2">
              <Label>Payment Channels</Label>
              <p className="text-sm">Card, Bank Transfer, USSD</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
