import { Color } from "@/types/types";
import { SortKey } from "./sortTypes";

export function sortItems(items: Color[], key: SortKey) {
  const copied = [...items];

  switch (key) {
    case "numberAsc":
      return copied.sort((a, b) => a.番号 - b.番号);

    case "numberDsc":
      return copied.sort((a, b) => b.番号 - a.番号);
    case "codeAsc":
      return copied.sort((a, b) => a.コード - b.コード);

    case "codeDsc":
      return copied.sort((a, b) => b.コード - a.コード);

    case "PriceAsc":
      return copied.sort((a, b) => (a.値段 ?? 0) - (b.値段 ?? 0));
    case "priceDsc":
      return copied.sort((a, b) => (b.値段 ?? 0) - (a.値段 ?? 0));
    case "nameAsc":
      return copied.sort((a, b) =>
        (a.商品名 ?? a.フリガナ).localeCompare(b.商品名 ?? b.フリガナ, "ja")
      );
  }
}
