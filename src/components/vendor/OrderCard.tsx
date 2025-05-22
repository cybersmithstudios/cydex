
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Clock, Truck, CheckCircle, XCircle, Package, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface OrderCardProps {
  order: {
    id: string;
    customer: string;
    status: string;
    createdAt: string;
    items: Array<any>;
    total: number;
    paymentMethod: string;
    deliveryType?: string;
    timeSlot?: string;
    rider?: {
      name: string;
      contact: string;
    };
  };
}

const OrderCard = ({ order }: OrderCardProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500 text-white">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500 text-white">Processing</Badge>;
      case 'delivering':
        return <Badge className="bg-purple-500 text-white">Out for Delivery</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500 text-white">Delivered</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 text-white">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    });
  };

  const handleRejectOrder = (orderId: string) => {
    toast.error('Order rejected', {
      description: `Order ${orderId} has been rejected.`
    });
  };

  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center">
          <div className={`p-2 rounded-full ${
            order.status === 'pending' ? 'bg-amber-100' :
            order.status === 'processing' ? 'bg-blue-100' :
            order.status === 'delivered' ? 'bg-green-100' : 
            order.status === 'cancelled' ? 'bg-red-100' : 'bg-gray-100'
          }`}>
            {order.status === 'pending' ? <Clock className="h-5 w-5 text-amber-600" /> :
             order.status === 'processing' ? <Truck className="h-5 w-5 text-blue-600" /> :
             order.status === 'delivered' ? <CheckCircle className="h-5 w-5 text-green-600" /> :
             order.status === 'cancelled' ? <XCircle className="h-5 w-5 text-red-600" /> :
             <Package className="h-5 w-5 text-gray-600" />}
          </div>
          <div className="ml-4">
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
              <span className="font-medium">{order.id}</span>
              <span className="hidden md:inline-block text-gray-300">•</span>
              <span className="text-sm text-gray-600">{formatDate(order.createdAt)}</span>
            </div>
            <div className="mt-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
              {getStatusBadge(order.status)}
              <span className="text-sm">{order.customer}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:items-end justify-between">
          <div className="text-lg font-bold mb-1">{formatPrice(order.total)}</div>
          <div className="text-sm text-gray-600">{order.items.length} items</div>
        </div>
        
        <div className="flex md:items-center gap-2">
          {order.status === 'pending' && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => handleRejectOrder(order.id)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-hover text-black"
                onClick={() => navigate('/vendor/process-order', { state: { order } })}
              >
                Process
              </Button>
            </>
          )}
          
          {order.status === 'processing' && (
            <>
              <Button variant="outline" size="sm">
                Contact Rider
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-hover text-black"
                onClick={() => navigate(`/vendor/orders/${order.id}`)}
              >
                Details
              </Button>
            </>
          )}
          
          {(order.status === 'delivered' || order.status === 'cancelled') && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto"
              onClick={() => navigate(`/vendor/orders/${order.id}`)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      
      {!isMobile && (
        <div className="mt-3 pt-3 border-t text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-1">
          <div>
            <span className="font-medium">Payment:</span> {order.paymentMethod}
          </div>
          {order.deliveryType && (
            <div>
              <span className="font-medium">Delivery:</span> {order.deliveryType}
            </div>
          )}
          {order.timeSlot && (
            <div>
              <span className="font-medium">Time Slot:</span> {order.timeSlot}
            </div>
          )}
          {order.rider && (
            <div>
              <span className="font-medium">Rider:</span> {order.rider.name}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
