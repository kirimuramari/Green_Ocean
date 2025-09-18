import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { SetColorItem } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  Alert,
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
  const [message, setMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

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
      Alert.alert("エラー", "セット名とフリガナは必須項目です");
      return;
    }
    const newItem: Omit<SetColorItem, "コード"> = {
      番号: lastNumber + 1,
      セット名: setName,
      フリガナ: furigana,
      値段: price.trim() ? Number(price) : 0,
    };

    const { error } = await supabase
      .from("GreenOcean_SetColor")
      .insert(newItem);
    if (error) {
      console.error("登録エラー:", error.message);
      Alert.alert("登録失敗", "セット名の登録に失敗しました");
    } else {
      Alert.alert("登録成功", "セット名が登録されました");
      setSetName("");
      setFurigana("");
      setPrice("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>セット名の追加</Text>
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
      <TouchableOpacity onPress={handleRegister} style={formStyles.button}>
        <Text style={formStyles.buttonText}>追加</Text>
      </TouchableOpacity>
      {message.type && (
        <Text
          style={{
            marginTop: 12,
            color: message.type === "success" ? "green" : "red",
            fontSize: 16,
          }}
        >
          {message.text}
        </Text>
      )}
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
