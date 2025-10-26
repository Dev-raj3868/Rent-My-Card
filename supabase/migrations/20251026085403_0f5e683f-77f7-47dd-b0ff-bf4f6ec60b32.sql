-- Create payment-proofs bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Recreate order-receipts bucket policies
DROP POLICY IF EXISTS "Users can view order receipts" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload order receipts" ON storage.objects;
DROP POLICY IF EXISTS "Users can update order receipts" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete order receipts" ON storage.objects;

CREATE POLICY "Users can view order receipts"
ON storage.objects FOR SELECT
USING (bucket_id = 'order-receipts' AND auth.role() = 'authenticated');

CREATE POLICY "Users can upload order receipts"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'order-receipts' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update order receipts"
ON storage.objects FOR UPDATE
USING (bucket_id = 'order-receipts' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete order receipts"
ON storage.objects FOR DELETE
USING (bucket_id = 'order-receipts' AND auth.role() = 'authenticated');

-- Create payment-proofs bucket policies
CREATE POLICY "Users can view payment proofs"
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-proofs' AND auth.role() = 'authenticated');

CREATE POLICY "Users can upload payment proofs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'payment-proofs' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update payment proofs"
ON storage.objects FOR UPDATE
USING (bucket_id = 'payment-proofs' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete payment proofs"
ON storage.objects FOR DELETE
USING (bucket_id = 'payment-proofs' AND auth.role() = 'authenticated');