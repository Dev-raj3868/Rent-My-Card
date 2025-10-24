-- Add rejection_reason column to purchase_requests table
ALTER TABLE purchase_requests
ADD COLUMN rejection_reason TEXT;