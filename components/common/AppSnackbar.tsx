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
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={3000}
      style={{
        backgroundColor: type === "error" ? "#D32F2F" : "#2E7D32",
      }}
    >
      {message}
    </Snackbar>
  );
}
