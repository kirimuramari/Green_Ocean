//テーブルスマホ表示のデザイン崩れ防止
import { StyleSheet as RNStyleSheet, StyleProp } from "react-native";

export const flattenStyle = <T>(
  base: StyleProp<T>,
  extra?: StyleProp<T>
): T => {
  return RNStyleSheet.flatten([base, extra]) as T;
};
