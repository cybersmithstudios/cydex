-- ===================================================================
-- Announcements System Migration
-- Create tables for managing system announcements and notifications
-- ===================================================================

BEGIN;

-- Create announcements table
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('info', 'warning', 'success', 'error', 'maintenance')),
  target_audience TEXT[] NOT NULL, -- ['customer', 'vendor', 'rider', 'all']
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_announcements_status ON public.announcements(status);
CREATE INDEX IF NOT EXISTS idx_announcements_target ON public.announcements USING GIN(target_audience);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON public.announcements(published_at);
CREATE INDEX IF NOT EXISTS idx_announcements_expires ON public.announcements(expires_at);
CREATE INDEX IF NOT EXISTS idx_announcements_created_by ON public.announcements(created_by);

-- Enable RLS
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Admins can manage all announcements
CREATE POLICY "Admins can manage announcements" 
ON public.announcements
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'ADMIN'
  )
);

-- Users can view published, non-expired announcements relevant to their role
CREATE POLICY "Users can view published announcements" 
ON public.announcements
FOR SELECT 
USING (
  status = 'published' 
  AND (published_at IS NULL OR published_at <= now())
  AND (expires_at IS NULL OR expires_at > now())
  AND (
    'all' = ANY(target_audience) 
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND lower(role) = ANY(target_audience)
    )
  )
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_announcements_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER announcements_updated_at
BEFORE UPDATE ON public.announcements
FOR EACH ROW
EXECUTE FUNCTION update_announcements_updated_at();

COMMIT;

