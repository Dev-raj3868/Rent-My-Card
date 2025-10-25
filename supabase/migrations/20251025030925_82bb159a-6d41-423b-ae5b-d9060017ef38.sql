-- Create storage policies for order-receipts bucket
CREATE POLICY "Card holders can upload order receipts"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'order-receipts' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Card holders can view their uploaded receipts"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'order-receipts' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Customers can view receipts for their requests"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'order-receipts'
  AND EXISTS (
    SELECT 1 FROM public.purchase_requests
    WHERE purchase_requests.customer_id = auth.uid()
    AND purchase_requests.order_receipt_url LIKE '%' || name || '%'
  )
);