-- Squad payout enhancements: store bank codes and transfer metadata
BEGIN;

-- Ensure bank code column exists for vendor bank accounts
ALTER TABLE public.vendor_bank_accounts
    ADD COLUMN IF NOT EXISTS bank_code TEXT;

-- Ensure bank code column exists for rider bank details
ALTER TABLE public.rider_bank_details
    ADD COLUMN IF NOT EXISTS bank_code TEXT;

-- Track Squad transfer references for vendor payouts
ALTER TABLE public.vendor_payout_requests
    ADD COLUMN IF NOT EXISTS transfer_reference TEXT,
    ADD COLUMN IF NOT EXISTS transfer_metadata JSONB DEFAULT '{}'::jsonb;

-- Track Squad transfer references for rider payouts
ALTER TABLE public.rider_payout_requests
    ADD COLUMN IF NOT EXISTS transfer_reference TEXT,
    ADD COLUMN IF NOT EXISTS transfer_metadata JSONB DEFAULT '{}'::jsonb;

COMMIT;

