
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface TestResult {
  id: string;
  amount: number;
  status: 'success' | 'failed';
  reference: string;
  timestamp: string;
}

interface TestResultsProps {
  results: TestResult[];
}

export const TestResults: React.FC<TestResultsProps> = ({ results }) => {
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

  if (results.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Results</CardTitle>
        <CardDescription>
          Payment test history for this session
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {results.map((result) => (
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
  );
};
