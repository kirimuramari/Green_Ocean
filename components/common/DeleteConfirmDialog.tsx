//削除ダイアログ
import { Button, Dialog, Portal, Text } from "react-native-paper";
type Props = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message?: string;
};

export function DeleteConfirmDialog({
  visible,
  onCancel,
  onConfirm,
  message = "このデータを削除しますか?",
}: Props) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>削除確認</Dialog.Title>
        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>キャンセル</Button>
          <Button onPress={onConfirm} textColor="red">
            削除
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
