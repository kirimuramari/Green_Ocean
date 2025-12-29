import { snackbarStyles } from "@/theme/snackbarStyles";
import { useIsDesktop } from "@/theme/useIsDesktop";
import { Snackbar } from "react-native-paper";

type Props = {
  visible: boolean;
  message: string;
  onDismiss: () => void;
  type?: "success" | "error";
};
export function AppSnackbar({
  visible,
  message,
  onDismiss,
  type = "success",
}: Props) {
  const isDesktop = useIsDesktop();
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={3000}
      style={{
        ...snackbarStyles.base,
        ...(isDesktop ? snackbarStyles.desktop : snackbarStyles.mobile),

        backgroundColor: type === "error" ? "#D32F2F" : "#2E7D32",
      }}
    >
      {message}
    </Snackbar>
  );
}
