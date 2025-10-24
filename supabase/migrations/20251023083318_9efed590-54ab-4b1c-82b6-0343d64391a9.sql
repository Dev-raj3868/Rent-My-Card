-- Add order details and receipt to purchase_requests table
ALTER TABLE public.purchase_requests 
ADD COLUMN order_details TEXT,
ADD COLUMN order_receipt_url TEXT,
ADD COLUMN approved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN rejected_at TIMESTAMP WITH TIME ZONE;

-- Create storage bucket for order receipts
INSERT INTO storage.buckets (id, name, public) 
VALUES ('order-receipts', 'order-receipts', false);

-- Create policies for order receipt uploads
CREATE POLICY "Card holders can upload receipts for their requests"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'order-receipts' AND
  auth.uid() IN (
    SELECT card_holder_id FROM public.purchase_requests 
    WHERE id::text = (storage.foldername(name))[1]
  )
);

CREATE POLICY "Users can view receipts for their requests"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'order-receipts' AND
  (
    auth.uid() IN (
      SELECT card_holder_id FROM public.purchase_requests 
      WHERE id::text = (storage.foldername(name))[1]
    ) OR
    auth.uid() IN (
      SELECT customer_id FROM public.purchase_requests 
      WHERE id::text = (storage.foldername(name))[1]
    )
  )
);