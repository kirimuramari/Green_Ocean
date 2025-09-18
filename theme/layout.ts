//テーブルスマホ表示のデザイン崩れ防止
import { StyleSheet as RNStyleSheet } from "react-native";

export const flattenStyle = (base: any, extra?: any) =>
  RNStyleSheet.flatten([base, extra]);
