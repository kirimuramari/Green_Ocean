import { supabase } from "@/lib/supabaseClient";
import { Ionicons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";

import { SnackbarType, getSnackbarStyle } from "@/theme/snackbarStyles";

import { formStyles } from "@/theme/formStyles";
import { SetColorItem } from "@/types/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddSetName = () => {
  const [setName, setSetName] = useState("");
  const [furigana, setFurigana] = useState("");
  const [price, setPrice] = useState<string>("");
  const [lastNumber, setLastNumber] = useState<number>(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<SnackbarType>("success");

  const showSnackbar = (msg: string, type: SnackbarType = "success") => {
    setSnackbarMessage(msg);
    setSnackbarType(type);
    setSnackbarVisible(true);
  };
  // 最大番号取得
  useEffect(() => {
    const fetchLastNumber = async () => {
      const { data, error } = await supabase
        .from("GreenOcean_SetColor")
        .select("番号")

        .order("番号", { ascending: false })
        .limit(1);

      if (error) {
        console.error("番号取得エラー:", error.message);
        return;
      }
      const last: number =
        (data?.[0] as unknown as SetColorItem)?.["番号"] ?? 0;
      setLastNumber(last);
    };
    fetchLastNumber();
  }, []);

  const handleRegister = async () => {
    if (!setName.trim() || !furigana.trim()) {
      showSnackbar("セット名とフリガナは必須項目です", "error");
      return;
    }
    const newItem: Omit<SetColorItem, "番号" | "コード"> = {
      セット名: setName,
      フリガナ: furigana,
      値段: price.trim() ? Number(price) : 0,
    };

    const { error } = await supabase
      .from("GreenOcean_SetColor")
      .insert(newItem);
    if (error) {
      console.error("登録エラー:", error.message);
      showSnackbar("セット名の登録に失敗しました", "error");
    } else {
      showSnackbar("セット名が登録されました", "success");
      setSetName("");
      setFurigana("");
      setPrice("");
    }
  };

  return (
    <View style={(styles.container, formStyles.container)}>
      <View style={formStyles.subContainer}>
        <View style={formStyles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={formStyles.arrowButton}
          >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={formStyles.title}>セット名の追加</Text>
        </View>
        <Text style={styles.label}>セット名</Text>
        <TextInput
          style={formStyles.input}
          value={setName}
          onChangeText={setSetName}
          placeholder="セット名を入力"
        />
        <Text style={styles.label}>フリガナ</Text>
        <TextInput
          style={formStyles.input}
          value={furigana}
          onChangeText={setFurigana}
          placeholder="フリガナを入力"
        />
        <Text style={styles.label}>値段（任意）</Text>
        <TextInput
          style={formStyles.input}
          value={price ?? ""}
          onChangeText={setPrice}
          placeholder="値段を入力（空白でもOK）"
        />
        <View style={formStyles.buttonRow}>
          <TouchableOpacity onPress={handleRegister} style={formStyles.button}>
            <Text style={formStyles.buttonText}>追加</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={[formStyles.cancelButton, formStyles.halfButton]}
          >
            <Text style={formStyles.cancelButtonText}>キャンセル</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={getSnackbarStyle(snackbarType)}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};
export default AddSetName;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  label: {
    color: "#434656",

    fontSize: 16,
    marginTop: 12,
  },
  input: {
    color: "#434656",

    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    marginTop: 4,
  },
});
