-- Add phone to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone text;

-- Add customer info and card name snapshot to purchase_requests
ALTER TABLE public.purchase_requests
ADD COLUMN IF NOT EXISTS customer_name text,
ADD COLUMN IF NOT EXISTS customer_phone text,
ADD COLUMN IF NOT EXISTS card_name_snapshot text;

-- Update existing records to populate card_name_snapshot from credit_cards
UPDATE public.purchase_requests pr
SET card_name_snapshot = cc.card_name
FROM public.credit_cards cc
WHERE pr.card_id = cc.id AND pr.card_name_snapshot IS NULL;

COMMENT ON COLUMN public.profiles.phone IS 'Customer phone number';
COMMENT ON COLUMN public.purchase_requests.customer_name IS 'Snapshot of customer name at time of request';
COMMENT ON COLUMN public.purchase_requests.customer_phone IS 'Snapshot of customer phone at time of request';
COMMENT ON COLUMN public.purchase_requests.card_name_snapshot IS 'Snapshot of card name to preserve history even if card is deleted';