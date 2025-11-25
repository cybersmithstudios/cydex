-- Virtual account support for wallets
-- Each user role gets a Squad virtual account linked to their wallet

BEGIN;

-- Create virtual_accounts table
CREATE TABLE IF NOT EXISTS public.virtual_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('customer', 'vendor', 'rider', 'admin')),
    squad_customer_identifier TEXT NOT NULL,
    account_number TEXT NOT NULL,
    account_name TEXT NOT NULL,
    bank_name TEXT NOT NULL,
    bank_code TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (profile_id, role),
    UNIQUE (squad_customer_identifier),
    UNIQUE (account_number, bank_code)
);

COMMENT ON TABLE public.virtual_accounts IS 'Stores Squad virtual account numbers for each user role';

-- Link wallets to virtual accounts
ALTER TABLE public.customer_wallet
    ADD COLUMN IF NOT EXISTS virtual_account_id UUID REFERENCES public.virtual_accounts(id);

ALTER TABLE public.vendor_wallet
    ADD COLUMN IF NOT EXISTS virtual_account_id UUID REFERENCES public.virtual_accounts(id);

ALTER TABLE public.rider_wallet
    ADD COLUMN IF NOT EXISTS virtual_account_id UUID REFERENCES public.virtual_accounts(id);

-- Indexes for quick lookup
CREATE INDEX IF NOT EXISTS idx_virtual_accounts_profile_role ON public.virtual_accounts (profile_id, role);
CREATE INDEX IF NOT EXISTS idx_virtual_accounts_customer_identifier ON public.virtual_accounts (squad_customer_identifier);

-- Security: enable RLS and policies
ALTER TABLE public.virtual_accounts ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (Edge Functions, backend jobs)
CREATE POLICY "service role manage virtual accounts"
    ON public.virtual_accounts
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Allow users to view their own virtual account
CREATE POLICY "users can view own virtual account"
    ON public.virtual_accounts
    FOR SELECT
    USING (auth.uid() = profile_id);

-- Allow users to update metadata (if needed)
CREATE POLICY "users can update own virtual account metadata"
    ON public.virtual_accounts
    FOR UPDATE
    USING (auth.uid() = profile_id)
    WITH CHECK (auth.uid() = profile_id);

COMMIT;

