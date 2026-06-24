import { Color } from "@/types/types";
import { Column } from "../TableView";
import { View, Text } from "react-native";
import { QuickActions } from "@/components/common/QuickAction";

type CreateColorColumnsProp ={
  isDesktop:boolean
  onTogglePurchased:(item:Color) => void | Promise<void>
  onDelete:(item:Color) => void;
};

export function createColorColumns({
    isDesktop,
    onTogglePurchased,
    onDelete,
}: CreateColorColumnsProp):Column<Color>[] {
    //サイズ調整
    const actionColumn: Column<Color> = {
          id: "actions",
          header: "操作",
          width: isDesktop ? "10%" : "18%",
          render: (item) => (
            <View
              style={{
                flexDirection: isDesktop ? "row" : "column",
                justifyContent: "center",
                alignItems: "center",
                gap: isDesktop ? 8 : 6,
              }} 
            >
              <QuickActions
                purchased={item.購入済み}
               onTogglePurchased={() => onTogglePurchased(item)}
                onDelete={() => onDelete(item)}
              />
            </View>
          ),
        };
     return [
     {
          id: "番号",
          key:"番号",
          header: "番号",
          width: isDesktop ? "6%" : "10%",
          render: (item: Color) => (
            <Text style={{ textAlign: "left" }}>{item.番号}</Text>
          ),
        },
        { 
          id: "商品名",
          key:"商品名",
         header: "商品名",
         width: isDesktop ? "14%" : "18%",
         },
        { 
          id: "フリガナ",
          key:"フリガナ",
           header: "フリガナ",
            width: isDesktop ? "14%" : "0%",
           },
        {
          id: "コード",
          key:"コード",
          header: "コード",
          width: isDesktop ? "8%" : "10%",
          render: (item: Color) => (
            <Text style={{ textAlign: "left" }}>{item.コード}</Text>
          ),
        },
        {
          id: "値段",
          key:"値段",
          header: "値段",
          width: isDesktop ? "8%" : "10%",
          render: (item: Color) => (
            <Text style={{ textAlign: "left" }}>¥{item.値段}</Text>
          ),
        },
        { 
          id: "セット名",
          key:"セット名",
          header: "セット名",
           width: isDesktop ? "30%" : "34%" },
     actionColumn,
      ];
}