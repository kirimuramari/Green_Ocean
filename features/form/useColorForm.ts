import { Colorform } from "@/types/types";
import { useState } from "react";

export function useColorForm() {
  const [form, setForm] = useState<Colorform>({
    コード: "",
    商品名: "",
    フリガナ: "",
    値段: null,
    セット名: "",
    購入済み: false,
  });

  const handleChange = <K extends keyof Colorform>(
    key: K,
    value: Colorform[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const resetFromColor = (color: Colorform) => {
    setForm({
      コード: color.コード,
      商品名: color.商品名,
      フリガナ: color.フリガナ,
      値段: color.値段,
      セット名: color.セット名,
      購入済み: color.購入済み,
    });
  };
  return { form, handleChange, resetFromColor };
}
