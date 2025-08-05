-- Create distance cache table to reduce Google Maps API calls
CREATE TABLE IF NOT EXISTS public.distance_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pickup_address TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  distance_km DECIMAL(5,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_distance_cache_addresses 
ON public.distance_cache(pickup_address, delivery_address);

-- Create index for cleanup of old cache entries
CREATE INDEX IF NOT EXISTS idx_distance_cache_created_at 
ON public.distance_cache(created_at);

-- Enable RLS (optional - for security)
ALTER TABLE public.distance_cache ENABLE ROW LEVEL SECURITY;

-- Policy to allow all authenticated users to read cache
CREATE POLICY "allow_read_distance_cache" ON public.distance_cache
  FOR SELECT USING (true);

-- Policy to allow all authenticated users to insert cache
CREATE POLICY "allow_insert_distance_cache" ON public.distance_cache
  FOR INSERT WITH CHECK (true);

-- Function to clean up old cache entries (older than 24 hours)
CREATE OR REPLACE FUNCTION cleanup_old_distance_cache()
RETURNS void AS $$
BEGIN
  DELETE FROM public.distance_cache 
  WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Optional: Set up a cron job to clean cache daily
-- This would be done through Supabase's pg_cron extension if available 