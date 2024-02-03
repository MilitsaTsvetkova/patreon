import { type SupabaseClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { type Database } from "supabase/types";

export default async function uploadFile(
  supabase: SupabaseClient<Database>,
  file: File,
  bucket: string,
) {
  const name = getFileName(file.name);
  console.log("name", name);
  const { data: uploaded } = await supabase.storage
    .from(bucket)
    .upload(name, file);
  const { data } = await supabase.storage
    .from(bucket)
    .getPublicUrl(uploaded?.path!);
  return data.publicUrl;
}

function getFileName(fileName: string) {
  const nameWithoutExtension = fileName.includes(".")
    ? fileName.substring(0, fileName.lastIndexOf("."))
    : fileName;
  console.log("new name", nameWithoutExtension);
  return `${nameWithoutExtension}-${nanoid()}`;
}
