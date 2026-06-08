import { Colorform } from "@/types/types";

export function validateColorForm(form: Colorform): string | null {
  if (!form.商品名.trim()) {
    return "商品名を入力してください";
  }

  if (!form.セット名.trim()) {
    return "セット名を選択してください";
  }
  return null;
}
