import { SortKey } from "./sortTypes";

type SortableItem = {
  番号?: number;
  コード?: number;
  商品名?: string;
  値段?: number;
  フリガナ?: string;
  セット名?: string;
};
export function sortItems<T extends SortableItem>(
  items: T[],
  sortKey: SortKey
): T[] {
  const list = [...items];

  switch (sortKey) {
    case "numberAsc":
      return list.sort((a, b) => (a.番号 ?? 0) - (b.番号 ?? 0));

    case "numberDsc":
      return list.sort((a, b) => (b.番号 ?? 0) - (a.番号 ?? 0));
    case "codeAsc":
      return list.sort((a, b) => (a.コード ?? 0) - (b.コード ?? 0));

    case "codeDsc":
      return list.sort((a, b) => (b.コード ?? 0) - (a.コード ?? 0));

    case "PriceAsc":
      return list.sort((a, b) => (a.値段 ?? 0) - (b.値段 ?? 0));
    case "priceDsc":
      return list.sort((a, b) => (b.値段 ?? 0) - (a.値段 ?? 0));
    case "nameAsc":
      return list.sort((a, b) =>
        (a.商品名 ?? a.フリガナ ?? "").localeCompare(
          b.商品名 ?? b.フリガナ ?? "",
          "ja"
        )
      );
    case "nameDsc":
      return list.sort((a, b) =>
        (b.商品名 ?? b.フリガナ ?? "").localeCompare(
          a.商品名 ?? a.フリガナ ?? "",
          "ja"
        )
      );
    case "setNameAsc":
      return list.sort((a, b) =>
        (a.セット名 ?? "").localeCompare(b.セット名 ?? "", "ja")
      );
    case "setNameDsc":
      return list.sort((a, b) =>
        (b.セット名 ?? "").localeCompare(a.セット名 ?? "", "ja")
      );
    default:
      return list;
  }
}
