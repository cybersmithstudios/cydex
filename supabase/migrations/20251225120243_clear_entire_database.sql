-- ===================================================================
-- Clear ENTIRE Database Migration
-- WARNING: This will delete ALL data including admin accounts
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
-- 3. DELETE ALL USER WALLET AND FINANCIAL DATA
-- ===================================================================

DO $$
BEGIN
  -- Customer data
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'customer_withdrawal_requests') THEN
    DELETE FROM public.customer_withdrawal_requests;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'customer_bank_accounts') THEN
    DELETE FROM public.customer_bank_accounts;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'customer_wallet') THEN
    DELETE FROM public.customer_wallet;
  END IF;
  
  -- Vendor data
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'vendor_payout_requests') THEN
    DELETE FROM public.vendor_payout_requests;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'vendor_bank_accounts') THEN
    DELETE FROM public.vendor_bank_accounts;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'vendor_transactions') THEN
    DELETE FROM public.vendor_transactions;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'vendor_wallet') THEN
    DELETE FROM public.vendor_wallet;
  END IF;
  
  -- Rider data
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'rider_payout_requests') THEN
    DELETE FROM public.rider_payout_requests;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'rider_bank_details') THEN
    DELETE FROM public.rider_bank_details;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'rider_transactions') THEN
    DELETE FROM public.rider_transactions;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'rider_wallet') THEN
    DELETE FROM public.rider_wallet;
  END IF;
  
  -- Shared data
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'virtual_accounts') THEN
    DELETE FROM public.virtual_accounts;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'addresses') THEN
    DELETE FROM public.addresses;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'student_subscriptions') THEN
    DELETE FROM public.student_subscriptions;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'announcements') THEN
    DELETE FROM public.announcements;
  END IF;
END $$;

-- ===================================================================
-- 4. DELETE ALL PROFILES (INCLUDING ADMINS)
-- ===================================================================

DELETE FROM public.profiles;

COMMIT;

