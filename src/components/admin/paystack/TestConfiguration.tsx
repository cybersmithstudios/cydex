
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

interface TestConfigurationProps {
  testEmail: string;
  onEmailChange: (email: string) => void;
  testAmount: number;
  onAmountChange: (amount: number) => void;
  onTestPayment: () => void;
  hasResults: boolean;
  onClearResults: () => void;
}

export const TestConfiguration: React.FC<TestConfigurationProps> = ({
  testEmail,
  onEmailChange,
  testAmount,
  onAmountChange,
  onTestPayment,
  hasResults,
  onClearResults
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="test-email">Test Email</Label>
          <Input
            id="test-email"
            type="email"
            value={testEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="test@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="test-amount">Test Amount (₦)</Label>
          <Input
            id="test-amount"
            type="number"
            value={testAmount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            min="1"
            max="100000"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          onClick={onTestPayment}
          className="bg-primary hover:bg-primary/80 text-black"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Test Payment (₦{testAmount.toLocaleString()})
        </Button>
        {hasResults && (
          <Button variant="outline" onClick={onClearResults}>
            Clear Results
          </Button>
        )}
      </div>
    </>
  );
};
