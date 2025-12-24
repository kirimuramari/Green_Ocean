import { supabase } from "@/lib/supabaseClient";

export async function deleteSetColorItem(number: number) {
  const { error } = await supabase
    .from("GreenOcean_SetColor")
    .delete()
    .eq("番号", number);

  if (error) {
    console.error("削除エラー", error);
    throw error;
  }
}
