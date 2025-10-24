-- Force types refresh by adding and removing a temporary column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS temp_refresh_column TEXT DEFAULT NULL;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS temp_refresh_column;