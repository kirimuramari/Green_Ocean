import { SORT_LABEL, SortKey } from "@/features/sort/sortTypes";
import React from "react";
import { Button, Menu } from "react-native-paper";

type Props = {
  value: SortKey;
  onChange: (key: SortKey) => void;
};

export function SortSelector({ value, onChange }: Props) {
  const [visible, setVisible] = React.useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Button onPress={() => setVisible(true)}>{SORT_LABEL[value]}</Button>
      }
    >
      {(Object.keys(SORT_LABEL) as SortKey[]).map((key) => (
        <Menu.Item
          key={key}
          title={SORT_LABEL[key]}
          onPress={() => {
            onChange(key);
            setVisible(false);
          }}
        />
      ))}
    </Menu>
  );
}
