import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { tables } from "@/theme/tables";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function SetColor() {
  interface SetColorItem {
    番号: number;
    コード: number;
    セット名: string;
    フリガナ: string;
    値段: number;
  }
  const [data, setData] = useState<SetColorItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("GreenOcean_SetColor")
        .select("*");
      if (error) {
        console.error("Supabaseエラー:", error);
      } else {
        setData(data || []);
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
        <Text>データが存在しません。</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={formStyles.container}>
        <View style={formStyles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={formStyles.arrowButton}
          >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={formStyles.title}>セット品一覧</Text>
        </View>
        <View style={tables.headerRow}>
          <Text style={tables.headerCell}>番号</Text>
          <Text style={tables.headerCell}>セット名</Text>
          <Text style={tables.headerCell}>フリガナ</Text>
          <Text style={tables.headerCell}>値段</Text>
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
              <Text style={tables.dataCell}>{item.番号}</Text>
              <Text style={tables.dataCell}>{item.セット名}</Text>
              <Text style={tables.dataCell}>{item.フリガナ}</Text>
              <Text style={tables.dataCell}>¥{item.値段}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
