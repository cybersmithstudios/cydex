-- Delete Admin Users Created for Testing
-- This script removes the admin users we created
-- Run this in Supabase SQL Editor with service role privileges

BEGIN;

DO $$
DECLARE
  deleted_count INTEGER := 0;
BEGIN
  -- Delete profiles first (will cascade to auth.users if foreign key is set up)
  DELETE FROM public.profiles
  WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Deleted % profile(s)', deleted_count;
  
  -- Delete from auth.users (requires service role)
  DELETE FROM auth.users
  WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Deleted % user(s) from auth.users', deleted_count;
END $$;

COMMIT;

-- Verification query
SELECT 
  'Remaining users with admin emails:' as check_type,
  COUNT(*) as count
FROM auth.users
WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');


-- This script removes the admin users we created
-- Run this in Supabase SQL Editor with service role privileges

BEGIN;

DO $$
DECLARE
  deleted_count INTEGER := 0;
BEGIN
  -- Delete profiles first (will cascade to auth.users if foreign key is set up)
  DELETE FROM public.profiles
  WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Deleted % profile(s)', deleted_count;
  
  -- Delete from auth.users (requires service role)
  DELETE FROM auth.users
  WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Deleted % user(s) from auth.users', deleted_count;
END $$;

COMMIT;

-- Verification query
SELECT 
  'Remaining users with admin emails:' as check_type,
  COUNT(*) as count
FROM auth.users
WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');

-- This script removes the admin users we created
-- Run this in Supabase SQL Editor with service role privileges

BEGIN;

DO $$
DECLARE
  deleted_count INTEGER := 0;
BEGIN
  -- Delete profiles first (will cascade to auth.users if foreign key is set up)
  DELETE FROM public.profiles
  WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Deleted % profile(s)', deleted_count;
  
  -- Delete from auth.users (requires service role)
  DELETE FROM auth.users
  WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Deleted % user(s) from auth.users', deleted_count;
END $$;

COMMIT;

-- Verification query
SELECT 
  'Remaining users with admin emails:' as check_type,
  COUNT(*) as count
FROM auth.users
WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');

-- This script removes the admin users we created
-- Run this in Supabase SQL Editor with service role privileges

BEGIN;

DO $$
DECLARE
  deleted_count INTEGER := 0;
BEGIN
  -- Delete profiles first (will cascade to auth.users if foreign key is set up)
  DELETE FROM public.profiles
  WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Deleted % profile(s)', deleted_count;
  
  -- Delete from auth.users (requires service role)
  DELETE FROM auth.users
  WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Deleted % user(s) from auth.users', deleted_count;
END $$;

COMMIT;

-- Verification query
SELECT 
  'Remaining users with admin emails:' as check_type,
  COUNT(*) as count
FROM auth.users
WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');

-- This script removes the admin users we created
-- Run this in Supabase SQL Editor with service role privileges

BEGIN;

DO $$
DECLARE
  deleted_count INTEGER := 0;
BEGIN
  -- Delete profiles first (will cascade to auth.users if foreign key is set up)
  DELETE FROM public.profiles
  WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Deleted % profile(s)', deleted_count;
  
  -- Delete from auth.users (requires service role)
  DELETE FROM auth.users
  WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Deleted % user(s) from auth.users', deleted_count;
END $$;

COMMIT;

-- Verification query
SELECT 
  'Remaining users with admin emails:' as check_type,
  COUNT(*) as count
FROM auth.users
WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');

-- This script removes the admin users we created
-- Run this in Supabase SQL Editor with service role privileges

BEGIN;

DO $$
DECLARE
  deleted_count INTEGER := 0;
BEGIN
  -- Delete profiles first (will cascade to auth.users if foreign key is set up)
  DELETE FROM public.profiles
  WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Deleted % profile(s)', deleted_count;
  
  -- Delete from auth.users (requires service role)
  DELETE FROM auth.users
  WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Deleted % user(s) from auth.users', deleted_count;
END $$;

COMMIT;

-- Verification query
SELECT 
  'Remaining users with admin emails:' as check_type,
  COUNT(*) as count
FROM auth.users
WHERE email IN ('cydexlogistics@gmail.com', 'admin.cydex@tempaccess.local');

