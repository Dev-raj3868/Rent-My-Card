-- Make phone column nullable to allow Google OAuth signups
ALTER TABLE public.profiles 
ALTER COLUMN phone DROP NOT NULL;