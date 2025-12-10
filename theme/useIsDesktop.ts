import { useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";

export function useIsDesktop() {
  const isWeb = Platform.OS === "web";
  const getValue = () => isWeb && Dimensions.get("window").width >= 1024;

  const [isDesktop, setIsDesktop] = useState(getValue());

  useEffect(() => {
    const handler = () => setIsDesktop(getValue());
    const subscription = Dimensions.addEventListener("change", handler);
    return () => subscription?.remove();
  }, []);
  return isDesktop;
}
