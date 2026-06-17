import { supabase } from "@/lib/supabaseClient";

type DeleteParams = {
  table: string;
  keyName: string;
  keyValue: number;
};
export async function deleteItem({ table, keyName, keyValue }: DeleteParams) {
  const { error, data, count } = await supabase
    .from(table)
    .delete()
    .eq(keyName, keyValue)
    .select();

  if (error) {
    throw error;
  }
  return { data, count };
}
