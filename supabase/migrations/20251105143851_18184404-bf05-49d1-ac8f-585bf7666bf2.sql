-- Make order-receipts bucket public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'order-receipts';