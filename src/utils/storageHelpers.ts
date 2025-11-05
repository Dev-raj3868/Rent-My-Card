import { supabase } from "@/integrations/supabase/client";

export const getPublicUrl = async (url: string): Promise<string | null> => {
  if (!url) return null;
  
  // If it's already a full URL, return it
  if (url.startsWith('http')) return url;
  
  // Extract the bucket and path from the URL
  const bucketMatch = url.match(/([^/]+)\/(.+)/);
  if (!bucketMatch) return null;
  
  const [, bucket, path] = bucketMatch;
  
  // Try to get a signed URL for private buckets (expires in 1 hour)
  const { data: signedData, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, 3600);
  
  if (!error && signedData) {
    return signedData.signedUrl;
  }
  
  // Fallback to public URL if signed URL fails
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
