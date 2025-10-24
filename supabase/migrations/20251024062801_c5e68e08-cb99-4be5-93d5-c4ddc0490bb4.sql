-- Add payment proof column to purchase_requests table
ALTER TABLE public.purchase_requests 
ADD COLUMN IF NOT EXISTS payment_proof_url TEXT;

COMMENT ON COLUMN public.purchase_requests.payment_proof_url IS 'URL to customer payment proof/receipt image';