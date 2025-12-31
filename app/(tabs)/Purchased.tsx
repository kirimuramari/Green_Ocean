import { BackButton } from "@/components/BackButton";
import { SortSelector } from "@/components/common/SortSelector";
import { ListStatus } from "@/components/ListStatus";
import { TableView } from "@/components/TableView";
import { sortItems } from "@/features/sort/sortItems";
import { SortKey } from "@/features/sort/sortTypes";
import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { isDesktop } from "@/theme/isDesktop";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Purchased() {
  interface Item {
    番号: number;

    コード: number;
    商品名: string;
    フリガナ: string;
    セット名: string;
  }

  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("codeAsc");

  const sortOption: SortKey[] = [
    "codeAsc",
    "codeDsc",
    "nameAsc",
    "nameDsc",
    "setNameAsc",
    "setNameDsc",
  ];

  const purchasedColums = [
    { key: "コード", header: "コード", width: isDesktop ? "10%" : "15%" },
    { key: "商品名", header: "商品名", width: isDesktop ? "22%" : "25%" },
    { key: "フリガナ", header: "フリガナ", width: isDesktop ? "22%" : "25%" },
    { key: "セット名", header: "セット名", width: isDesktop ? "22%" : "25%" },
  ];

  useEffect(() => {
    (async () => {
      // 該当商品データを取得
      const { data, error } = await supabase
        .from("GreenOcean_Color")
        .select("*")
        .eq("購入済み", true);

      if (error) {
        console.error("Supabaseエラー:", error);
      } else {
        setData((data as Item[]) || []);
      }
      setLoading(false);
    })();
  }, []);
  const sortedColors = sortItems(data, sortKey);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ListStatus
        loading={loading}
        hasData={setData.length > 0}
        emptyMessage="購入品がありません。"
      />
      <SafeAreaView style={formStyles.container}>
        <View style={formStyles.header}>
          <BackButton />

          <Text style={formStyles.title}>購入品</Text>
          <SortSelector
            value={sortKey}
            onChange={setSortKey}
            option={sortOption}
          />
        </View>
        <TableView
          data={sortedColors}
          columns={purchasedColums}
          isDesktop={isDesktop}
          rowKey={(item) => item.番号}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
