import { supabase } from "@/lib/supabaseClient";
import { Colorform } from "@/types/types";
 
export function useRegisterColor() {
    const registerColor = async (form:Colorform) => {
        
        // コードの重複チェック
           const { data: existing } = await supabase
       
             .from("GreenOcean_Color")
             .select("コード")
             .eq("コード", Number(form.コード));
           if (existing && existing.length > 0) {
            return {

            success:false,
            message: "このコードはすでに使用されています", 
            };
        }
            const payload = {
                コード: Number(form.コード),
                商品名: form.商品名,
                フリガナ: form.フリガナ,
                値段: form.値段,
                セット名: form.セット名,
                購入済み: form.購入済み,
            };
            const { error } = await supabase
            .from("GreenOcean_Color")
            .insert([payload]);
            if (error) {
                  return{
                    success: false,
                message:"登録に失敗しました",
              };
             }  
             return {
                success: true,
                message:"商品を追加しました",
                // フォームクリアなど
            }
        };
        return {
            registerColor,

        };
    }
