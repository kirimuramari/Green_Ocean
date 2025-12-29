import { StyleSheet } from "react-native";

export type SnackbarType = "success" | "error";

export const snackbarColors: Record<SnackbarType, string> = {
  success: "#2E7D32",
  error: "#D32F2F",
};

export const getSnackbarStyle = (type: SnackbarType) => {
  return {
    backgroundColor: snackbarColors[type],
  };
};

export const snackbarStyles = StyleSheet.create({
  base: {
    margin: 8,
  },
  mobile: {
    alignSelf: "center",
  },
  desktop: {
    position: "absolute",
    right: 24,
    bottom: 24,
    maxWidth: 400,
  },
});
