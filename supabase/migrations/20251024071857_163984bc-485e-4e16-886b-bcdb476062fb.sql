-- Update foreign key constraints to prevent history deletion when cards are deleted
-- This ensures purchase request history is preserved even when a card is removed

-- First, drop the existing foreign key constraint if it exists
ALTER TABLE purchase_requests DROP CONSTRAINT IF EXISTS purchase_requests_card_id_fkey;

-- Re-add the foreign key with ON DELETE SET NULL to preserve history
ALTER TABLE purchase_requests
ADD CONSTRAINT purchase_requests_card_id_fkey 
FOREIGN KEY (card_id) 
REFERENCES credit_cards(id) 
ON DELETE SET NULL;

-- Make card_id nullable to allow NULL when card is deleted
ALTER TABLE purchase_requests ALTER COLUMN card_id DROP NOT NULL;