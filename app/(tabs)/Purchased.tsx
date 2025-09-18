import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formStyles } from "@/theme/formStyles";
import { supabase } from "@/lib/supabaseClient";
import { tables } from "@/theme/tables";

export default function Purchased() {
  interface Purchased {
    番号: number;
    コード: number;
    商品名: string;
    フリガナ: string;
    セット名: string;
    備考: string;
  }

  const [data, setData] = useState<Purchased[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      // 該当商品データを取得
      const { data, error } = await supabase
        .from("GreenOcean_Purchased")
        .select("*");

      if (error) {
        console.error("Supabaseエラー:", error);
      } else {
        setData((data as unknown as Purchased[] | null) || []);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>読み込み中...</Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text>購入済みの商品はありません。</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={formStyles.title}>購入品</Text>
      <View style={tables.headerRow}>
        <Text style={tables.headerCell}>商品名</Text>
        <Text style={tables.headerCell}>フリガナ</Text>
        <Text style={tables.headerCell}>コード</Text>
        <Text style={tables.headerCell}>セット名</Text>
        <Text style={tables.headerCell}>備考</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.番号.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              tables.dataRow,
              { backgroundColor: index % 2 === 0 ? "#fff" : "#eee" },
            ]}
          >
            <Text style={tables.dataCell}>{item.商品名}</Text>
            <Text style={tables.dataCell}>{item.フリガナ}</Text>
            <Text style={tables.dataCell}>{item.コード}</Text>
            <Text style={tables.dataCell}>{item.セット名}</Text>
            <Text style={tables.dataCell}>{item.備考}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </SafeAreaView>
  );
}
