import { supabase } from "@/integrations/supabase/client";

export const getPublicUrl = (url: string): string | null => {
  if (!url) return null;
  
  // If it's already a full URL, return it
  if (url.startsWith('http')) return url;
  
  // Extract the bucket and path from the URL
  const bucketMatch = url.match(/([^/]+)\/(.+)/);
  if (!bucketMatch) return null;
  
  const [, bucket, path] = bucketMatch;
  
  // Get public URL
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
