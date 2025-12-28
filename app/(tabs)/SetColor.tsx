import { AppSnackbar } from "@/components/common/AppSnackbar";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { SortSelector } from "@/components/common/SortSelector";
import { ListStatus } from "@/components/ListStatus";
import { deleteSetColor } from "@/features/itemActions/itemActions";
import { sortItems } from "@/features/sort/sortItems";
import { SortKey } from "@/features/sort/sortTypes";
import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { SnackbarType } from "@/theme/snackbarStyles";
import { tables } from "@/theme/tables";
import { SetColorItem } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function SetColor() {
  const [data, setData] = useState<SetColorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("setNameAsc");
  const sortOptions: SortKey[] = [
    "setNameAsc",
    "setNameDsc",
    "PriceAsc",
    "priceDsc",
    "numberAsc",
    "numberDsc",
  ];

  const [deleteTarget, setDeleteTarget] = useState<SetColorItem | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<SnackbarType>("success");

  const showSnackbar = (msg: string, type: SnackbarType = "success") => {
    setSnackbarMessage(msg);
    setSnackbarType(type);
    setSnackbarVisible(true);
  };
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

  const sortedColors = sortItems(data, sortKey);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ListStatus
        loading={loading}
        hasData={setData.length > 0}
        emptyMessage="セット品が登録されていません。"
      />
      <SafeAreaView style={formStyles.container}>
        <View style={formStyles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={formStyles.arrowButton}
          >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={formStyles.title}>セット品一覧</Text>
          <SortSelector
            value={sortKey}
            onChange={setSortKey}
            option={sortOptions}
          />
        </View>
        <View style={tables.headerRow}>
          <Text style={tables.headerCell}>番号</Text>
          <Text style={tables.headerCell}>セット名</Text>
          <Text style={tables.headerCell}>フリガナ</Text>
          <Text style={tables.headerCell}>値段</Text>
          <Text style={tables.headerCell}>削除</Text>
        </View>
        {sortedColors.map((item, index) => (
          <View
            key={item.番号 ?? index}
            style={[
              tables.dataRow,
              { backgroundColor: index % 2 === 0 ? "#fff" : "#eee" },
            ]}
          >
            <Text style={tables.dataCell}>{item.番号}</Text>
            <Text style={tables.dataCell}>{item.セット名}</Text>
            <Text style={tables.dataCell}>{item.フリガナ}</Text>
            <Text style={tables.dataCell}>¥{item.値段}</Text>
            <TouchableOpacity onPress={() => setDeleteTarget(item)}>
              <Ionicons name="trash" size={22} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </SafeAreaView>
      <DeleteConfirmDialog
        visible={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          try {
            await deleteSetColor(deleteTarget.番号);
            setData((prev) =>
              prev.filter((item) => item.番号 !== deleteTarget.番号)
            );
            showSnackbar("セット品を削除しました。", "success");
            setSnackbarVisible(true);
          } catch {
            showSnackbar("削除に失敗しました。", "error");
            setSnackbarVisible(true);
          } finally {
            setDeleteTarget(null);
          }
        }}
      />
      <AppSnackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        onDismiss={() => setSnackbarVisible(false)}
      />
    </ScrollView>
  );
}
