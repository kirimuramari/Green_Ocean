import { validateColorForm } from "@/features/form/validateColorForm";
import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { SnackbarType, getSnackbarStyle } from "@/theme/snackbarStyles";
import { Color, Colorform } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";

import { ColorFormView } from "@/components/common/ColorFormView";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Edit() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Color[]>([]);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [setList, setSetList] = useState<string[]>([]);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<SnackbarType>("success");

  const initaialForm: Colorform = {
    コード: "",
    商品名: "",
    フリガナ: "",
    値段: null,
    セット名: "",
    購入済み: false,
  };
  const [form, setForm] = useState<Colorform>(initaialForm);

  const showSnackbar = (msg: string, type: SnackbarType = "success") => {
    setSnackbarMessage(msg);
    setSnackbarType(type);
    setSnackbarVisible(true);
  };
  //セット名取得
  useEffect(() => {
    const fetchSetList = async () => {
      const { data, error } = await supabase
        .from("GreenOcean_SetColor")
        .select("セット名")
        .returns<{ セット名: string | null }[]>();
      if (error) {
        console.error(error);
        return;
      }
      const list = Array.from(
        new Set(
          data
            .map((item) => item.セット名)
            .filter((name): name is string => !!name)
        )
      );
      setSetList(list);
    };

    fetchSetList();
  }, []);
  //検索
  const handleSearch = async () => {
    if (!query.trim()) {
      showSnackbar("検索ワードを入力してください。", "error");
      setSearchResults([]);
      setSelectedColor(null);
      return;
    }
    setLoading(true);

    try {
      const q = query.trim();
      const isNumeric = /^\d+$/.test(q); // ← 数値判定

      // まずコード完全一致を検索
      const { data, error } = isNumeric
        ? await supabase
            .from("GreenOcean_Color")
            .select("*")
            .eq("コード", Number(q))
        : // コードでヒットしなかったら商品名検索に切り替え
          await supabase
            .from("GreenOcean_Color")
            .select("*")
            .ilike("商品名", `%${q}%`);

      if (error || !data || data.length === 0) {
        showSnackbar("データが見つかりません", "error");
        setSearchResults([]);
        setSelectedColor(null);
        return;
      }
      // 結果あり
      setSearchResults(data);
    } finally {
      setLoading(false);
    }
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
  const handleChange = <K extends keyof Colorform>(
    key: K,
    value: Colorform[K]
  ) => {
    setForm((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const handleUpdate = async () => {
    if (!selectedColor) return;

    const errorMessage = validateColorForm(form);
    if (errorMessage) {
      showSnackbar(errorMessage, "error");

      return;
    }

    setUpdating(true);
    const { error } = await supabase
      .from("GreenOcean_Color")
      .update(form)
      .eq("番号", selectedColor.番号);

    setUpdating(false);

    if (error) {
      showSnackbar("更新に失敗しました", "error");
    } else {
      showSnackbar("更新が完了しました", "success");
    }
  };
  const handleCancelEdit = () => {
    setSelectedColor(null);
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
          <View style={formStyles.container}>
            <View style={formStyles.header}>
              <TouchableOpacity
                onPress={() => router.replace("/")}
                style={formStyles.arrowButton}
              >
                <Ionicons name="arrow-back" size={24} />
              </TouchableOpacity>
              <Text style={formStyles.title}>登録済み商品の編集</Text>
            </View>
            <Text style={formStyles.label}>コード または 商品名で検索</Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="例: 1 または ミルク"
              style={formStyles.input}
            />
            <TouchableOpacity onPress={handleSearch} style={formStyles.button}>
              <Text style={formStyles.buttonText}>検索</Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator style={{ marginTop: 16 }} />}
            {selectedColor && setList.length > 0 && (
              <>
                <ColorFormView
                  form={form}
                  onChange={handleChange}
                  setList={setList}
                  mode="edit"
                  readonlyNumber={selectedColor.番号}
                  onSubmitEditing={handleUpdate}
                />

                <View style={formStyles.buttonRow}>
                  <TouchableOpacity
                    onPress={handleUpdate}
                    disabled={updating}
                    style={[formStyles.button, formStyles.halfButton]}
                  >
                    <Text style={formStyles.buttonText}>
                      {updating ? "更新中..." : "再登録"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleCancelEdit}
                    style={[formStyles.cancelButton, formStyles.halfButton]}
                  >
                    <Text style={formStyles.cancelButtonText}>キャンセル</Text>
                  </TouchableOpacity>
                </View>
              </>
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
            style={[styles.listItem, formStyles.container]}
          >
            <Text style={{ padding: 0 }}>
              {item.番号} - {item.商品名}(コード: {item.コード})
            </Text>
          </TouchableOpacity>
        )}
      />
      {/* メッセージ表示 */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={getSnackbarStyle(snackbarType)}
      >
        {snackbarMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
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
    padding: 10,
    backgroundColor: "#fff",
    gap: 12,
  },
});
