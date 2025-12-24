//ソートボタン
import { SortKey } from "@/features/sort/sortTypes";
import { useState } from "react";
import { Button, Menu } from "react-native-paper";

type Props = {
  value: SortKey;
  onChange: (key: SortKey) => void;
  option?: SortKey[];
};

const SORT_LABELS: Record<SortKey, string> = {
  numberAsc: "番号(昇順)",
  numberDsc: "番号(降順)",
  codeAsc: "コード(昇順)",
  codeDsc: "コード(降順)",
  PriceAsc: "価格(昇順)",
  priceDsc: "価格(降順)",
  nameAsc: "商品名(50音順)",
  nameDsc: "商品名(逆50音順)",
  setNameAsc: "セット名(50音順)",
  setNameDsc: "セット名(逆50音順)",
};

export function SortSelector({ value, onChange, option }: Props) {
  const [visible, setVisible] = useState(false);
  const sortKeys = option ?? (Object.keys(SORT_LABELS) as SortKey[]);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Button onPress={() => setVisible(true)}>{SORT_LABELS[value]}</Button>
      }
    >
      {sortKeys.map((key) => (
        <Menu.Item
          key={key}
          title={SORT_LABELS[key]}
          onPress={() => {
            onChange(key);
            setVisible(false);
          }}
        />
      ))}
    </Menu>
  );
}
