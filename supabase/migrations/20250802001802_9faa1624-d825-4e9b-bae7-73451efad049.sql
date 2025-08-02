-- Fix the trigger to only create delivery when vendor accepts order
-- Drop the existing trigger first
DROP TRIGGER IF EXISTS create_delivery_trigger ON orders;

-- Update the trigger function to only create delivery when vendor accepts
CREATE OR REPLACE FUNCTION public.create_delivery_for_order()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Only create delivery when order status changes to 'accepted' or 'processing' and vendor has accepted
  IF (OLD.status != NEW.status AND NEW.status IN ('accepted', 'processing')) AND 
     NEW.payment_status = 'paid' AND 
     NEW.delivery_type != 'pickup' THEN
    
    INSERT INTO public.deliveries (
      order_id,
      status,
      estimated_pickup_time,
      estimated_delivery_time,
      delivery_fee,
      pickup_location,
      delivery_location
    ) VALUES (
      NEW.id,
      'available',
      NOW() + INTERVAL '30 minutes',
      NOW() + INTERVAL '60 minutes',
      NEW.delivery_fee,
      jsonb_build_object('address', 'Vendor Location', 'vendor_id', NEW.vendor_id),
      NEW.delivery_address
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create the trigger again
CREATE TRIGGER create_delivery_trigger
  AFTER UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION create_delivery_for_order();