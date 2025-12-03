-- ===================================================================
-- Clear Database for Live Launch
-- This migration clears all test data while preserving admin accounts
-- ===================================================================

BEGIN;

-- ===================================================================
-- 1. DELETE ALL ORDERS AND RELATED DATA
-- ===================================================================

-- Delete order items first (foreign key to orders)
DELETE FROM public.order_items;

-- Delete payment holds (foreign key to orders)
DELETE FROM public.payment_holds;

-- Delete settlements (foreign key to orders)
DELETE FROM public.settlements;

-- Delete rider earnings (foreign key to orders)
DELETE FROM public.rider_earnings;

-- Delete deliveries (foreign key to orders)
DELETE FROM public.deliveries;

-- Delete customer transactions (may reference orders)
DELETE FROM public.customer_transactions;

-- Delete orders
DELETE FROM public.orders;

-- ===================================================================
-- 2. DELETE ALL PRODUCTS AND RELATED DATA
-- ===================================================================

-- Delete products (only if tables exist)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_images') THEN
    DELETE FROM public.product_images;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_reviews') THEN
    DELETE FROM public.product_reviews;
  END IF;
END $$;

DELETE FROM public.products;

-- Delete categories if they're not system categories (optional - keeping structure)
-- DELETE FROM public.categories;

-- ===================================================================
-- 3. DELETE ALL USER ACCOUNTS EXCEPT ADMINS
-- ===================================================================

-- First, delete all related data for non-admin users

-- Delete customer withdrawal requests
DELETE FROM public.customer_withdrawal_requests
WHERE customer_id IN (
  SELECT id FROM public.profiles WHERE role != 'ADMIN'
);

-- Delete customer bank accounts
DELETE FROM public.customer_bank_accounts
WHERE customer_id IN (
  SELECT id FROM public.profiles WHERE role != 'ADMIN'
);

-- Delete customer wallet
DELETE FROM public.customer_wallet
WHERE customer_id IN (
  SELECT id FROM public.profiles WHERE role != 'ADMIN'
);

-- Delete vendor payout requests
DELETE FROM public.vendor_payout_requests
WHERE vendor_id IN (
  SELECT id FROM public.profiles WHERE role != 'ADMIN'
);

-- Delete vendor bank accounts
DELETE FROM public.vendor_bank_accounts
WHERE vendor_id IN (
  SELECT id FROM public.profiles WHERE role != 'ADMIN'
);

-- Delete vendor transactions
DELETE FROM public.vendor_transactions
WHERE vendor_id IN (
  SELECT id FROM public.profiles WHERE role != 'ADMIN'
);

-- Delete vendor wallet
DELETE FROM public.vendor_wallet
WHERE vendor_id IN (
  SELECT id FROM public.profiles WHERE role != 'ADMIN'
);

-- Delete rider payout requests
DELETE FROM public.rider_payout_requests
WHERE rider_id IN (
  SELECT id FROM public.profiles WHERE role != 'ADMIN'
);

-- Delete rider bank details
DELETE FROM public.rider_bank_details
WHERE rider_id IN (
  SELECT id FROM public.profiles WHERE role != 'ADMIN'
);

-- Delete rider transactions
DELETE FROM public.rider_transactions
WHERE rider_id IN (
  SELECT id FROM public.profiles WHERE role != 'ADMIN'
);

-- Delete rider wallet
DELETE FROM public.rider_wallet
WHERE rider_id IN (
  SELECT id FROM public.profiles WHERE role != 'ADMIN'
);

-- Delete virtual accounts (for non-admin users)
DELETE FROM public.virtual_accounts
WHERE profile_id IN (
  SELECT id FROM public.profiles WHERE role != 'ADMIN'
);

-- Delete addresses (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'addresses') THEN
    DELETE FROM public.addresses
    WHERE user_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
END $$;

-- Delete student subscriptions
DELETE FROM public.student_subscriptions
WHERE student_id IN (
  SELECT id FROM public.profiles WHERE role != 'ADMIN'
);

-- Delete announcements (optional - keeping structure but clearing content)
DELETE FROM public.announcements;

-- Finally, delete all non-admin profiles
-- This will cascade delete related auth.users if CASCADE is set
DELETE FROM public.profiles
WHERE role != 'ADMIN';

-- ===================================================================
-- 4. CLEAN UP AUTH USERS (Non-admin accounts)
-- ===================================================================

-- Note: Deleting auth.users requires service role key or admin privileges
-- This should be done via Supabase Dashboard or using service role
-- The profiles deletion above will handle most cleanup via CASCADE

-- If you have service role access, uncomment and run:
-- DELETE FROM auth.users
-- WHERE id NOT IN (
--   SELECT id FROM public.profiles WHERE role = 'ADMIN'
-- );

-- ===================================================================
-- 5. RESET SEQUENCES AND COUNTERS (Optional)
-- ===================================================================

-- Reset any sequences if needed (order numbers, etc.)
-- This is optional and depends on your sequence setup

COMMIT;

-- ===================================================================
-- VERIFICATION QUERIES (Run these to verify cleanup)
-- ===================================================================

-- Check remaining profiles (should only show admins)
-- SELECT id, name, email, role FROM public.profiles;

-- Check products (should be empty)
-- SELECT COUNT(*) FROM public.products;

-- Check orders (should be empty)
-- SELECT COUNT(*) FROM public.orders;

-- Check wallets (should only have admin wallets if any)
-- SELECT * FROM public.vendor_wallet;
-- SELECT * FROM public.rider_wallet;
-- SELECT * FROM public.customer_wallet;

