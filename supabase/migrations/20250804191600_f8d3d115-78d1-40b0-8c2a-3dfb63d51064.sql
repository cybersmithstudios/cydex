-- Phase 1: Database Schema for Pricing Model

-- Create pricing configuration table
CREATE TABLE IF NOT EXISTS public.pricing_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_rate DECIMAL(10,2) DEFAULT 200.00,
  distance_rate_per_km DECIMAL(10,2) DEFAULT 75.00,
  weight_rates JSONB DEFAULT '{"0.5-5": 100, "5-10": 300}',
  late_night_fee DECIMAL(10,2) DEFAULT 100.00,
  surge_multiplier DECIMAL(3,2) DEFAULT 1.20,
  student_discount_percent DECIMAL(3,2) DEFAULT 0.10,
  green_fee DECIMAL(10,2) DEFAULT 20.00,
  subscription_monthly_rate DECIMAL(10,2) DEFAULT 1000.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create student subscriptions table
CREATE TABLE IF NOT EXISTS public.student_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id),
  status VARCHAR(20) DEFAULT 'active',
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  payment_reference VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Update orders table with pricing breakdown fields
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS base_rate DECIMAL(10,2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS distance_fee DECIMAL(10,2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS weight_fee DECIMAL(10,2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS late_night_fee DECIMAL(10,2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS surge_fee DECIMAL(10,2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS student_discount DECIMAL(10,2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS green_fee DECIMAL(10,2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS distance_km DECIMAL(5,2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS weight_kg DECIMAL(5,2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS is_late_night BOOLEAN DEFAULT FALSE;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS is_peak_hour BOOLEAN DEFAULT FALSE;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS is_student_order BOOLEAN DEFAULT FALSE;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS subscription_applied BOOLEAN DEFAULT FALSE;

-- Enable RLS on new tables
ALTER TABLE public.pricing_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_subscriptions ENABLE ROW LEVEL SECURITY;

-- Pricing config policies (admin only)
CREATE POLICY "Admin can manage pricing config" ON public.pricing_config
FOR ALL USING (is_admin());

-- Student subscription policies
CREATE POLICY "Students can view their own subscriptions" ON public.student_subscriptions
FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can create their own subscriptions" ON public.student_subscriptions
FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their own subscriptions" ON public.student_subscriptions
FOR UPDATE USING (student_id = auth.uid());

-- Insert default pricing configuration
INSERT INTO public.pricing_config DEFAULT VALUES
ON CONFLICT DO NOTHING;