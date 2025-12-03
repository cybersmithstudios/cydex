-- ===================================================================
-- Clear Database Script for Live Launch
-- Run this script using Supabase SQL Editor with service role key
-- This clears all test data while preserving admin accounts
-- ===================================================================

BEGIN;

-- ===================================================================
-- 1. DELETE ALL ORDERS AND RELATED DATA
-- ===================================================================

DELETE FROM public.order_items;
DELETE FROM public.payment_holds;
DELETE FROM public.settlements;
DELETE FROM public.rider_earnings;
DELETE FROM public.deliveries;
DELETE FROM public.customer_transactions;
DELETE FROM public.orders;

-- ===================================================================
-- 2. DELETE ALL PRODUCTS AND RELATED DATA
-- ===================================================================

DELETE FROM public.product_images;
DELETE FROM public.product_reviews;
DELETE FROM public.products;

-- ===================================================================
-- 3. DELETE ALL USER ACCOUNTS EXCEPT ADMINS
-- ===================================================================

-- Delete all related data for non-admin users
DELETE FROM public.customer_withdrawal_requests
WHERE customer_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');

DELETE FROM public.customer_bank_accounts
WHERE customer_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');

DELETE FROM public.customer_wallet
WHERE customer_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');

DELETE FROM public.vendor_payout_requests
WHERE vendor_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');

DELETE FROM public.vendor_bank_accounts
WHERE vendor_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');

DELETE FROM public.vendor_transactions
WHERE vendor_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');

DELETE FROM public.vendor_wallet
WHERE vendor_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');

DELETE FROM public.rider_payout_requests
WHERE rider_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');

DELETE FROM public.rider_bank_details
WHERE rider_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');

DELETE FROM public.rider_transactions
WHERE rider_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');

DELETE FROM public.rider_wallet
WHERE rider_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');

DELETE FROM public.virtual_accounts
WHERE profile_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');

DELETE FROM public.addresses
WHERE user_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');

DELETE FROM public.student_subscriptions
WHERE student_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');

DELETE FROM public.announcements;

-- Delete all non-admin profiles
DELETE FROM public.profiles
WHERE role != 'ADMIN';

-- ===================================================================
-- 4. CLEAN UP AUTH USERS (Requires service role)
-- ===================================================================

-- This must be run with service role key in Supabase SQL Editor
DELETE FROM auth.users
WHERE id NOT IN (
  SELECT id FROM public.profiles WHERE role = 'ADMIN'
);

COMMIT;

-- ===================================================================
-- VERIFICATION
-- ===================================================================

-- Run these to verify:
SELECT 'Profiles (should only show admins):' as check_type;
SELECT id, name, email, role FROM public.profiles;

SELECT 'Products count (should be 0):' as check_type;
SELECT COUNT(*) as product_count FROM public.products;

SELECT 'Orders count (should be 0):' as check_type;
SELECT COUNT(*) as order_count FROM public.orders;

SELECT 'Non-admin wallets (should be 0):' as check_type;
SELECT COUNT(*) as vendor_wallets FROM public.vendor_wallet;
SELECT COUNT(*) as rider_wallets FROM public.rider_wallet;
SELECT COUNT(*) as customer_wallets FROM public.customer_wallet;

