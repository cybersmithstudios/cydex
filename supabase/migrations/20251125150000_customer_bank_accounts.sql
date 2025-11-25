-- Customer bank accounts for withdrawals
BEGIN;

-- Create customer_bank_accounts table
CREATE TABLE IF NOT EXISTS public.customer_bank_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    account_name TEXT NOT NULL,
    bank_name TEXT NOT NULL,
    account_number TEXT NOT NULL,
    bank_code TEXT,
    is_default BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create customer_withdrawal_requests table
CREATE TABLE IF NOT EXISTS public.customer_withdrawal_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    bank_account_id UUID NOT NULL REFERENCES public.customer_bank_accounts(id),
    amount DECIMAL(12,2) NOT NULL,
    fee DECIMAL(12,2) DEFAULT 0,
    net_amount DECIMAL(12,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
    failure_reason TEXT NULL,
    transfer_reference TEXT NULL,
    transfer_metadata JSONB DEFAULT '{}'::jsonb,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    processed_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_customer_bank_accounts_customer ON public.customer_bank_accounts (customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_withdrawal_requests_customer ON public.customer_withdrawal_requests (customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_withdrawal_requests_status ON public.customer_withdrawal_requests (status);

-- Enable RLS
ALTER TABLE public.customer_bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_withdrawal_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for customer_bank_accounts
CREATE POLICY "Customers can view their own bank accounts"
    ON public.customer_bank_accounts FOR SELECT
    USING (auth.uid() = customer_id);

CREATE POLICY "Customers can insert their own bank accounts"
    ON public.customer_bank_accounts FOR INSERT
    WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can update their own bank accounts"
    ON public.customer_bank_accounts FOR UPDATE
    USING (auth.uid() = customer_id)
    WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can delete their own bank accounts"
    ON public.customer_bank_accounts FOR DELETE
    USING (auth.uid() = customer_id);

-- RLS Policies for customer_withdrawal_requests
CREATE POLICY "Customers can view their own withdrawal requests"
    ON public.customer_withdrawal_requests FOR SELECT
    USING (auth.uid() = customer_id);

CREATE POLICY "Customers can create their own withdrawal requests"
    ON public.customer_withdrawal_requests FOR INSERT
    WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "System can update withdrawal requests"
    ON public.customer_withdrawal_requests FOR UPDATE
    USING (true);

COMMIT;

