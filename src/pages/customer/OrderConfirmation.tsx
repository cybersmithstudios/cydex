import { CheckCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface LocationState {
  orderNumber?: string;
  amount?: number;
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, amount } = (location.state || {}) as LocationState;

  if (!orderNumber) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Order information not found.</h2>
          <Button onClick={() => navigate('/customer/orders')}>Go to Orders</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">Order Confirmed!</h1>
        <p className="mt-2 text-gray-600">
          Your order <span className="font-medium">#{orderNumber}</span> has been placed successfully.
        </p>
        <p className="mt-2 text-lg font-medium">Amount: ₦{amount?.toLocaleString()}</p>

        <div className="mt-6 space-y-3">
          <Button className="w-full" onClick={() => navigate('/customer/orders')}>
            Track Order
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate('/customer/new-order')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
