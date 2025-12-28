import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { tables } from "@/theme/tables";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ListStatus } from "@/components/ListStatus";

export default function Purchased() {
  interface Item {
    番号: number;
    コード: number;
    商品名: string;
    フリガナ: string;
    セット名: string;
    購入済み: boolean;
  }

  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ListStatus
        loading={loading}
        hasData={setData.length > 0}
        emptyMessage="購入品がありません。"
      />
      <SafeAreaView style={formStyles.container}>
        <View style={formStyles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={formStyles.arrowButton}
          >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={formStyles.title}>購入品</Text>
        </View>
        <View style={tables.headerRow}>
          <Text style={tables.headerCell}>コード</Text>
          <Text style={tables.headerCell}>商品名</Text>
          <Text style={tables.headerCell}>フリガナ</Text>
          <Text style={tables.headerCell}>セット名</Text>
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
              <Text style={tables.dataCell}>{item.コード}</Text>
              <Text style={tables.dataCell}>{item.商品名}</Text>
              <Text style={tables.dataCell}>{item.フリガナ}</Text>
              <Text style={tables.dataCell}>{item.セット名}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
