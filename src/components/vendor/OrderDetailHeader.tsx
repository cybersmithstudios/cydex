
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft } from 'lucide-react';

interface OrderDetailHeaderProps {
  orderId: string;
  status: string;
  createdAt: string;
  onUpdateStatus: (newStatus: string) => void;
  order: any;
  getStatusBadge: () => React.ReactNode;
  formatDate: (date: string) => string;
}

const OrderDetailHeader = ({ 
  orderId, 
  status, 
  createdAt, 
  onUpdateStatus, 
  order, 
  getStatusBadge,
  formatDate 
}: OrderDetailHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Button variant="outline" onClick={() => navigate('/vendor/orders')} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            Order Details: {orderId}
            <div className="ml-3">{getStatusBadge()}</div>
          </h1>
          <p className="text-gray-600">Created on {formatDate(createdAt)}</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          {status === 'pending' && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => {
                  onUpdateStatus('cancelled');
                }}
              >
                Cancel Order
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-hover text-black"
                onClick={() => navigate('/vendor/process-order', { state: { order } })}
              >
                Process Order
              </Button>
            </div>
          )}
          
          {status === 'processing' && (
            <div className="flex gap-2">
              <Button variant="outline">Contact Rider</Button>
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => onUpdateStatus('delivered')}
              >
                Mark as Delivered
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderDetailHeader;
