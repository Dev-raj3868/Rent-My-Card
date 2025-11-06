-- Fix 1: Restrict profiles table to only allow viewing own profile
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Fix 2: Remove ability for users to self-assign roles
DROP POLICY IF EXISTS "Users can insert their own roles on signup" ON public.user_roles;

-- Fix 3: Update trigger to only assign 'customer' role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
  
  -- Always assign 'customer' role on signup, ignore client metadata
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'customer'::user_role);
  
  RETURN NEW;
END;
$$;

-- Fix 4: Make storage buckets private
UPDATE storage.buckets 
SET public = false 
WHERE id IN ('payment-proofs', 'order-receipts');

-- Fix 5: Create RLS policies for storage
CREATE POLICY "Users can upload own files" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id IN ('payment-proofs', 'order-receipts')
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can view own files" ON storage.objects
  FOR SELECT
  USING (
    bucket_id IN ('payment-proofs', 'order-receipts')
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Card holders can view request files" ON storage.objects
  FOR SELECT
  USING (
    bucket_id IN ('payment-proofs', 'order-receipts')
    AND EXISTS (
      SELECT 1 FROM purchase_requests pr
      WHERE pr.card_holder_id = auth.uid()
      AND (
        pr.payment_proof_url LIKE '%' || name || '%'
        OR pr.order_receipt_url LIKE '%' || name || '%'
      )
    )
  );