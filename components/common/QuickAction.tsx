//操作ボタン
import { IconButton } from "react-native-paper";

type Props = {
  purchased: boolean;
  onTogglePurchased: () => void;
  onDelete: () => void;
};
export function QuickActions({
  purchased,
  onTogglePurchased,
  onDelete,
}: Props) {
  return (
    <>
      <IconButton
        icon={purchased ? "check-circle" : "check-circle-outline"}
        onPress={onTogglePurchased}
      />
      <IconButton icon="delete" onPress={onDelete} />
    </>
  );
}
