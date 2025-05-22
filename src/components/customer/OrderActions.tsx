
import React from 'react';
import { Button } from '@/components/ui/button';

interface OrderActionsProps {
  status: string;
  onCancelOrder?: () => void;
  onDownloadReceipt?: () => void;
  onReorder?: () => void;
}

const OrderActions = ({ status, onCancelOrder, onDownloadReceipt, onReorder }: OrderActionsProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {status !== 'delivered' && status !== 'cancelled' && (
        <Button 
          variant="outline" 
          className="border-red-500 text-red-500 hover:bg-red-50"
          onClick={onCancelOrder}
        >
          Cancel Order
        </Button>
      )}
      <Button variant="outline" onClick={onDownloadReceipt}>Download Receipt</Button>
      <Button className="bg-primary hover:bg-primary-hover text-black" onClick={onReorder}>Reorder</Button>
    </div>
  );
};

export default OrderActions;
