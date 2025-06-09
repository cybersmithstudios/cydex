
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePaystackPayment } from 'react-paystack';
import { toast } from 'sonner';
import { TestTube, Info } from 'lucide-react';
import { TestConfiguration } from './paystack/TestConfiguration';
import { TestResults } from './paystack/TestResults';
import { IntegrationStatus } from './paystack/IntegrationStatus';

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

    initializePayment({
      onSuccess: (response: any) => {
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
      onClose: () => {
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
    });
  };

  const clearTestResults = () => {
    setTestResults([]);
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

          <TestConfiguration
            testEmail={testEmail}
            onEmailChange={setTestEmail}
            testAmount={testAmount}
            onAmountChange={setTestAmount}
            onTestPayment={handleTestPayment}
            hasResults={testResults.length > 0}
            onClearResults={clearTestResults}
          />

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

      <TestResults results={testResults} />
      <IntegrationStatus />
    </div>
  );
};
