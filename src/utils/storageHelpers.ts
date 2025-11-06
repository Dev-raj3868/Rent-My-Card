import { supabase } from "@/integrations/supabase/client";

// Get signed URL for private storage buckets (expires in 1 hour)
export const getSignedUrl = async (url: string): Promise<string | null> => {
  if (!url) return null;
  
  // If it's already a full URL, return it
  if (url.startsWith('http')) return url;
  
  // Extract the bucket and path from the URL
  const bucketMatch = url.match(/([^/]+)\/(.+)/);
  if (!bucketMatch) return null;
  
  const [, bucket, path] = bucketMatch;
  
  // Get signed URL (valid for 1 hour)
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, 3600);
  
  if (error) {
    console.error('Error creating signed URL:', error);
    return null;
  }
  
  return data.signedUrl;
};
