import { supabase } from "./supabase.js";

export async function uploadToSupabase(file, bucket = "uploads") {
  const fileName = `${Date.now()}-${file.name}`;

  // upload ke Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (error) throw error;

  // ambil public URL
  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
}
