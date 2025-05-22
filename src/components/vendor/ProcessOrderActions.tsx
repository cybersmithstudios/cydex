
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { X, CheckCircle } from 'lucide-react';

interface ProcessOrderActionsProps {
  order: any;
  isProcessing: boolean;
  onProcess: () => void;
}

const ProcessOrderActions = ({ order, isProcessing, onProcess }: ProcessOrderActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-end">
      <Button 
        variant="outline" 
        className="border-red-300 text-red-600 hover:bg-red-50"
        onClick={() => {
          navigate('/vendor/orders');
          toast.error('Order rejected', {
            description: `Order ${order.id} has been rejected.`
          });
        }}
      >
        <X className="mr-2 h-4 w-4" />
        Reject Order
      </Button>
      
      <Button 
        className="bg-primary hover:bg-primary-hover text-black" 
        onClick={onProcess}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <span className="animate-pulse">Processing...</span>
          </>
        ) : (
          <>
            <CheckCircle className="mr-2 h-4 w-4" />
            Confirm Processing
          </>
        )}
      </Button>
    </div>
  );
};

export default ProcessOrderActions;
