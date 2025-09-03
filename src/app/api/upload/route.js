import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // generate nama unik
    const fileName = `${Date.now()}-${file.name}`;

    // upload ke Supabase Storage (bucket: "testimoni")
    const { data, error } = await supabase.storage
      .from("testimoni")
      .upload(fileName, file);

    if (error) throw error;

    // ambil public URL
    const { data: publicUrl } = supabase.storage
      .from("testimoni")
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl.publicUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
