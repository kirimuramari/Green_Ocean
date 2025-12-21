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
