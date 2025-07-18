
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

export const IntegrationStatus: React.FC = () => {
  return (
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
  );
};
