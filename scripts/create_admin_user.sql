-- Create Admin User: cydexlogistics@gmail.com
-- Password: Cydex 123$
-- 
-- IMPORTANT: This script must be run with service role privileges in Supabase SQL Editor
-- 
-- Note: Supabase handles password hashing automatically. This script creates the user
-- and profile. You may need to set the password via Supabase Dashboard or Admin API.

BEGIN;

DO $$
DECLARE
  new_user_id UUID;
  user_email TEXT := 'cydexlogistics@gmail.com';
  user_name TEXT := 'Cydex Admin';
BEGIN
  -- Check if user already exists
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = user_email) THEN
    RAISE NOTICE 'User with email % already exists. Updating profile...', user_email;
    -- Get existing user ID
    SELECT id INTO new_user_id FROM auth.users WHERE email = user_email;
  ELSE
    -- Generate a new UUID for the user
    new_user_id := gen_random_uuid();
    
    -- Insert into auth.users
    -- Note: Password must be set separately via Supabase Dashboard or Admin API
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      aud,
      role
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      user_email,
      '', -- Password will be set via Dashboard or Admin API
      NOW(), -- Email confirmed immediately for admin
      '{"provider":"email","providers":["email"]}',
      '{"role":"admin"}',
      NOW(),
      NOW(),
      'authenticated',
      'authenticated'
    );
    
    RAISE NOTICE 'User created with ID: %', new_user_id;
  END IF;
  
  -- Create or update the profile in public.profiles
  INSERT INTO public.profiles (
    id,
    name,
    email,
    role,
    verified,
    status,
    carbon_credits,
    created_at,
    updated_at
  ) VALUES (
    new_user_id,
    user_name,
    user_email,
    'ADMIN',
    true,
    'active',
    0,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) 
  DO UPDATE SET
    name = EXCLUDED.name,
    email = EXCLUDED.email,
    role = 'ADMIN',
    verified = true,
    status = 'active',
    updated_at = NOW();
    
  RAISE NOTICE 'Profile created/updated for user: %', user_email;
END $$;

COMMIT;

-- Verification query
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  p.name,
  p.role,
  p.verified,
  p.status
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'cydexlogistics@gmail.com';

-- ===================================================================
-- IMPORTANT: Setting the Password
-- ===================================================================
-- 
-- After running this script, you need to set the password using one of these methods:
--
-- METHOD 1: Supabase Dashboard (Recommended)
-- 1. Go to your Supabase project Dashboard
-- 2. Navigate to Authentication > Users
-- 3. Find the user: cydexlogistics@gmail.com
-- 4. Click the "..." menu next to the user
-- 5. Select "Reset Password" or "Send Password Reset Email"
-- 6. Set password to: Cydex 123$
--
-- METHOD 2: Supabase Admin API (Using curl or Postman)
-- POST https://<your-project-ref>.supabase.co/auth/v1/admin/users
-- Headers:
--   Authorization: Bearer <your-service-role-key>
--   Content-Type: application/json
-- Body:
-- {
--   "email": "cydexlogistics@gmail.com",
--   "password": "Cydex 123$",
--   "email_confirm": true,
--   "user_metadata": {"role": "admin"}
-- }
--
-- METHOD 3: Update existing user password via Admin API
-- PUT https://<your-project-ref>.supabase.co/auth/v1/admin/users/<user-id>
-- Headers:
--   Authorization: Bearer <your-service-role-key>
--   Content-Type: application/json
-- Body:
-- {
--   "password": "Cydex 123$"
-- }

