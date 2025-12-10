//画面判定（デスクトップ）
import { Dimensions, Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const isDesktop = isWeb && Dimensions.get("window").width >= 1024;
