
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
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
      {status !== 'delivered' && status !== 'cancelled' && (
        <Button 
          variant="outline" 
          size="sm"
          className="border-red-500 text-red-500 hover:bg-red-50 h-8 sm:h-9 text-xs sm:text-sm flex-1 sm:flex-none"
          onClick={onCancelOrder}
        >
          Cancel Order
        </Button>
      )}
      <Button 
        variant="outline" 
        size="sm"
        className="h-8 sm:h-9 text-xs sm:text-sm flex-1 sm:flex-none"
        onClick={onDownloadReceipt}
      >
        <span className="hidden xs:inline">Download </span>Receipt
      </Button>
      <Button 
        size="sm"
        className="bg-primary hover:bg-primary-hover text-black h-8 sm:h-9 text-xs sm:text-sm flex-1 sm:flex-none" 
        onClick={onReorder}
      >
        Reorder
      </Button>
    </div>
  );
};

export default OrderActions;
