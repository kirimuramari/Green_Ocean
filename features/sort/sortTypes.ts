export type SortKey =
  | "numberAsc"
  | "numberDsc"
  | "codeAsc"
  | "codeDsc"
  | "PriceAsc"
  | "priceDsc"
  | "nameAsc";

export const SORT_LABEL: Record<SortKey, string> = {
  numberAsc: "番号(昇順)",
  numberDsc: "番号(降順)",
  codeAsc: "コード(昇順)",
  codeDsc: "コード(降順)",
  PriceAsc: "価格(昇順)",
  priceDsc: "価格(降順)",
  nameAsc: "商品名(50音順)",
};
