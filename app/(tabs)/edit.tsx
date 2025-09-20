import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { Color } from "@/types/types";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

const initialForm: Omit<Color, "番号"> = {
  コード: 0,
  商品名: "",
  フリガナ: "",
  値段: 0,
  セット名: "",
  購入済み: false,
};
export default function Edit() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Color[]>([]);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [form, setForm] = useState<Omit<Color, "番号">>(initialForm);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { width } = useWindowDimensions();
  const isPC = width >= 1024;

  const handleSearch = async () => {
    if (!query.trim()) {
      Alert.alert("検索ワードを入力してください");
      return;
    }
    setLoading(true);
    const isNumeric = /^\d+$/.test(query); // ← 数値判定
    const { data, error } = await supabase
      .from("GreenOcean_Color")
      .select("*")
      .or(
        isNumeric
          ? `コード.eq.${query},商品名.ilike.*${query}*`
          : `商品名.ilike.*${query}*`
      )
      .order("番号", { ascending: true });

    if (error || !data || data.length === 0) {
      Alert.alert("一致するレコードが見つかりません");
      setSearchResults([]);
      setSelectedColor(null);
    } else {
      setSearchResults(data);
    }
    setLoading(false);
  };

  const handleDelete = () => {
    if (!selectedColor) return;
    Alert.alert(
      "確認",
      `本当にこのデータ（#${selectedColor.番号})を削除しますか？`,
      [
        { text: "キャンセル", style: "cancel" },
        {
          text: "削除する",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("GreenOcean_Color")
              .delete()
              .eq("番号", selectedColor.番号);

            if (error) {
              Alert.alert("削除に失敗しました", error.message);
            } else {
              Alert.alert("削除が完了しました");
              setSelectedColor(null);
              setForm(initialForm);
              setSearchResults((prev) =>
                prev.filter((item) => item.番号 !== selectedColor.番号)
              );
            }
          },
        },
      ]
    );
  };

  const handleSelectItem = (item: Color) => {
    setSelectedColor(item);
    setForm({
      コード: item.コード,
      商品名: item.商品名,
      フリガナ: item.フリガナ,
      値段: item.値段,
      セット名: item.セット名,
      購入済み: item.購入済み,
    });
  };
  const handleChange = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const handleUpdate = async () => {
    if (!selectedColor) return;
    if (!form.商品名.trim()) return Alert.alert("商品名を入力してください");
    if (form.値段 !== null && isNaN(Number(form.値段)))
      return Alert.alert("値段は数値で入力してください");
    if (!form.セット名.trim()) return Alert.alert("セット名を入力してください");

    setUpdating(true);
    const { error } = await supabase
      .from("GreenOcean_Color")
      .update(form)
      .eq("番号", selectedColor.番号);

    setUpdating(false);

    if (error) {
      Alert.alert("更新に失敗しました", error.message);
    } else {
      Alert.alert("更新が完了しました");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.番号.toString()}
        ListHeaderComponent={
          <View style={styles.container}>
            <Text style={formStyles.title}>登録済み商品の編集</Text>
            <Text style={styles.label}>コード または 商品名で検索</Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="例: 1 または ミルク"
              style={formStyles.input}
            />
            <TouchableOpacity onPress={handleSearch} style={formStyles.button}>
              <Text style={formStyles.buttonText}>検索</Text>
            </TouchableOpacity>
            {loading && (
              <ActivityIndicator size="large" style={{ marginTop: 16 }} />
            )}
            {searchResults.length > 0 && (
              <Text style={[styles.label, { marginTop: 24 }]}>
                検索結果一覧（タップして編集）
              </Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelectItem(item)}
            style={(styles.listItem, formStyles.center)}
          >
            <Text>
              {item.番号} - {item.商品名}(コード: {item.コード})
            </Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          selectedColor && (
            <View style={(formStyles.center, styles.formSection)}>
              <Text style={styles.label}>番号: {selectedColor.番号}</Text>
              <Text style={styles.label}>コード</Text>
              <TextInput
                value={String(form.コード)}
                onChangeText={(text) => handleChange("コード", Number(text))}
                keyboardType="numeric"
                style={formStyles.input}
              />
              <Text style={styles.label}>商品名</Text>
              <View style={styles.row}>
                <TextInput
                  value={form.商品名}
                  onChangeText={(text) => handleChange("商品名", text)}
                  style={formStyles.input}
                />
              </View>
              <Text style={styles.label}>フリガナ</Text>
              <TextInput
                value={form.フリガナ}
                onChangeText={(text) => handleChange("フリガナ", text)}
                style={formStyles.input}
              />
              <Text style={styles.label}>値段</Text>
              <TextInput
                value={form.値段 !== null ? String(form.値段) : ""}
                onChangeText={(text) =>
                  handleChange("値段", text === "" ? null : Number(text))
                }
                keyboardType="numeric"
                style={formStyles.input}
              />
              <Text style={styles.label}>セット名</Text>
              <TextInput
                value={form.セット名}
                onChangeText={(text) => handleChange("セット名", text)}
                style={formStyles.input}
              />
              <View style={styles.switchContainer}>
                <Text style={styles.label}>購入済み</Text>
                <Switch
                  value={form.購入済み}
                  onValueChange={(value) => handleChange("購入済み", value)}
                />
              </View>
              <TouchableOpacity
                onPress={handleUpdate}
                disabled={updating}
                style={formStyles.button}
              >
                <Text style={formStyles.buttonText}>
                  {updating ? "更新中..." : "再登録"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleDelete}
                style={formStyles.deleteButton}
              >
                <Text style={formStyles.buttonText}>削除</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",

    backgroundColor: "#fff",
    gap: 12,
  },
  label: {
    color: "#434656",

    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    color: "#434656",

    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },

  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  formSection: {
    padding: 20,
    backgroundColor: "#fff",
    gap: 12,
  },
});
