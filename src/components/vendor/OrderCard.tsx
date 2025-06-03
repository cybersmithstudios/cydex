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
        return <Badge className="bg-amber-500 text-white text-xs">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500 text-white text-xs">Processing</Badge>;
      case 'delivering':
        return <Badge className="bg-purple-500 text-white text-xs">Out for Delivery</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500 text-white text-xs">Delivered</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 text-white text-xs">Cancelled</Badge>;
      default:
        return <Badge className="text-xs">Unknown</Badge>;
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
      minimumFractionDigits: isMobile ? 0 : 2,
      maximumFractionDigits: isMobile ? 0 : 2
    });
  };

  const handleRejectOrder = (orderId: string) => {
    toast.error('Order rejected', {
      description: `Order ${orderId} has been rejected.`
    });
  };

  return (
    <div className="bg-white border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Main Order Info */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${
            order.status === 'pending' ? 'bg-amber-100' :
            order.status === 'processing' ? 'bg-blue-100' :
            order.status === 'delivered' ? 'bg-green-100' : 
            order.status === 'cancelled' ? 'bg-red-100' : 'bg-gray-100'
          }`}>
            {order.status === 'pending' ? <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" /> :
             order.status === 'processing' ? <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" /> :
             order.status === 'delivered' ? <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" /> :
             order.status === 'cancelled' ? <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" /> :
             <Package className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="font-medium text-sm sm:text-base">{order.id}</span>
              <span className="hidden sm:inline-block text-gray-300">•</span>
              <span className="text-xs sm:text-sm text-gray-600">{formatDate(order.createdAt)}</span>
            </div>
            <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              {getStatusBadge(order.status)}
              <span className="text-sm sm:text-base truncate">{order.customer}</span>
            </div>
            <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
              {order.items.length} items
            </div>
          </div>
          
          <div className="flex flex-col items-end flex-shrink-0">
            <div className="text-base sm:text-lg font-bold mb-1">{formatPrice(order.total)}</div>
        </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {order.status === 'pending' && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-red-300 text-red-600 hover:bg-red-50 text-xs sm:text-sm w-full sm:w-auto"
                onClick={() => handleRejectOrder(order.id)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm w-full sm:w-auto"
                onClick={() => navigate('/vendor/process-order', { state: { order } })}
              >
                Process Order
              </Button>
            </>
          )}
          
          {order.status === 'processing' && (
            <>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm w-full sm:w-auto">
                Contact Rider
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm w-full sm:w-auto"
                onClick={() => navigate(`/vendor/orders/${order.id}`)}
              >
                View Details
              </Button>
            </>
          )}
          
          {(order.status === 'delivered' || order.status === 'cancelled') && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto text-xs sm:text-sm w-full sm:w-auto"
              onClick={() => navigate(`/vendor/orders/${order.id}`)}
            >
              View Details
              <ChevronRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          )}
      </div>
      
        {/* Additional Info - Desktop Only */}
      {!isMobile && (
          <div className="pt-3 border-t text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-1">
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
    </div>
  );
};

export default OrderCard;
