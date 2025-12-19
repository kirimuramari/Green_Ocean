import { supabase } from "@/lib/supabaseClient";

export async function togglePurchased(id: number, value: boolean) {
  return supabase.from("items").update({ 購入済み: value }).eq("id", id);
}
export async function deleteItem(id: number) {
  return supabase.from("items").delete().eq("id", id);
}
