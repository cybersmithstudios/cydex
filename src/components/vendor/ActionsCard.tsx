
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ActionsCardProps {
  status: string;
}

const ActionsCard = ({ status }: ActionsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            Print Invoice
          </Button>
          {status === 'delivered' && (
            <Button variant="outline" className="w-full">
              Download Receipt
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionsCard;
