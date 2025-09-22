import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

console.log("✅ supabase.ts が実行されました");

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase URL または AnonKey が未定義です");
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
