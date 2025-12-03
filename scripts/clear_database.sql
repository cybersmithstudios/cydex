-- ===================================================================
-- Clear Database Script for Live Launch
-- Run this script using Supabase SQL Editor with service role key
-- This clears all test data while preserving admin accounts
-- ===================================================================

BEGIN;

-- ===================================================================
-- 1. DELETE ALL ORDERS AND RELATED DATA
-- ===================================================================

DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'order_items') THEN
    DELETE FROM public.order_items;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'payment_holds') THEN
    DELETE FROM public.payment_holds;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'settlements') THEN
    DELETE FROM public.settlements;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'rider_earnings') THEN
    DELETE FROM public.rider_earnings;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'deliveries') THEN
    DELETE FROM public.deliveries;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'customer_transactions') THEN
    DELETE FROM public.customer_transactions;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'orders') THEN
    DELETE FROM public.orders;
  END IF;
END $$;

-- ===================================================================
-- 2. DELETE ALL PRODUCTS AND RELATED DATA
-- ===================================================================

DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_images') THEN
    DELETE FROM public.product_images;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_reviews') THEN
    DELETE FROM public.product_reviews;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'products') THEN
    DELETE FROM public.products;
  END IF;
END $$;

-- ===================================================================
-- 3. DELETE ALL USER ACCOUNTS EXCEPT ADMINS
-- ===================================================================

DO $$
BEGIN
  -- Customer data
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'customer_withdrawal_requests') THEN
    DELETE FROM public.customer_withdrawal_requests
    WHERE customer_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'customer_bank_accounts') THEN
    DELETE FROM public.customer_bank_accounts
    WHERE customer_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'customer_wallet') THEN
    DELETE FROM public.customer_wallet
    WHERE customer_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
  
  -- Vendor data
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'vendor_payout_requests') THEN
    DELETE FROM public.vendor_payout_requests
    WHERE vendor_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'vendor_bank_accounts') THEN
    DELETE FROM public.vendor_bank_accounts
    WHERE vendor_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'vendor_transactions') THEN
    DELETE FROM public.vendor_transactions
    WHERE vendor_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'vendor_wallet') THEN
    DELETE FROM public.vendor_wallet
    WHERE vendor_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
  
  -- Rider data
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'rider_payout_requests') THEN
    DELETE FROM public.rider_payout_requests
    WHERE rider_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'rider_bank_details') THEN
    DELETE FROM public.rider_bank_details
    WHERE rider_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'rider_transactions') THEN
    DELETE FROM public.rider_transactions
    WHERE rider_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'rider_wallet') THEN
    DELETE FROM public.rider_wallet
    WHERE rider_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
  
  -- Shared data
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'virtual_accounts') THEN
    DELETE FROM public.virtual_accounts
    WHERE profile_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'addresses') THEN
    DELETE FROM public.addresses
    WHERE user_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'student_subscriptions') THEN
    DELETE FROM public.student_subscriptions
    WHERE student_id IN (SELECT id FROM public.profiles WHERE role != 'ADMIN');
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'announcements') THEN
    DELETE FROM public.announcements;
  END IF;
END $$;

-- Delete all non-admin profiles
DELETE FROM public.profiles
WHERE role != 'ADMIN';

-- ===================================================================
-- 4. CLEAN UP AUTH USERS (Requires service role)
-- ===================================================================

-- This must be run with service role key in Supabase SQL Editor
-- Uncomment the line below if you have service role access:
-- DELETE FROM auth.users WHERE id NOT IN (SELECT id FROM public.profiles WHERE role = 'ADMIN');

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
