//DB完成型のデータ
export interface Color {
  番号: number;
  コード: number;
  商品名: string;
  フリガナ: string;
  値段: number;
  セット名: string;
  購入済み: boolean;
}
export interface SetColorItem {
  番号: number;
  セット名: string;
  フリガナ: string;
  値段: number;
}
export interface Notice {
  id: number;
  title: string;
  created_at: string;
}
//DB未完成型のデータ
export interface Colorform {
  コード: number | "";
  商品名: string;
  フリガナ: string;
  値段: number | null;
  セット名: string;
  購入済み: boolean;
}
