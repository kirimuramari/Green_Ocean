import { supabase } from "@/lib/supabaseClient";
import { deleteItem } from "./deleteItems";

export async function togglePurchased(id: number, value: boolean) {
  return supabase.from("items").update({ 購入済み: value }).eq("id", id);
}
export async function deleteColor(id: number) {
  await deleteItem({
    table: "GreenOcean_Color",
    keyName: "コード",
    keyValue: id,
  });
}
export async function deleteSetColor(id: number) {
  await deleteItem({
    table: "GreenOcean_SetColor",
    keyName: "番号",
    keyValue: id,
  });
}
