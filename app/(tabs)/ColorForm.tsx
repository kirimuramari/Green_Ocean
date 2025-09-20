import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { Color } from "@/types/types";
import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ColorForm = () => {
  const [data, setData] = useState<Color[]>([]);
  const [code, setCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [furigana, setFurigana] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedSetName, setSelectedSetName] = useState<string>("");
  const [isPurchased, setIsPurchased] = useState<boolean>(false);
  const [setList, setSetList] = useState<string[]>([]);
  const lastNumber = data?.[0]?.番号 ?? 0;
  const nextNumber = lastNumber + 1;

  useEffect(() => {
    // 番号の取得（連番）
    const fetchData = async () => {
      const { data: colorData, error } = await supabase
        .from("GreenOcean_Color")
        .select("*")
        .order("番号", { ascending: false });
      if (error) {
        console.error("データ取得エラー:", error.message);
      } else {
        setData(colorData as Color[]);
      }
      const { data: setNameData, error: setError } = await supabase
        .from("GreenOcean_SetColor")
        .select("セット名");
      if (setError) {
        console.error("セット名取得エラー:", setError.message);
      } else {
        const names = Array.from(
          new Set((setNameData ?? []).map((item: any) => item.セット名))
        );
        setSetList(names);
      }
    };
    fetchData();
  }, []);

  // 商品名がカタカナだけなら nameKana にコピー
  useEffect(() => {
    if (/^[\u30A0-\u30FFー\s ]+$/.test(name)) {
      setFurigana(name);
    }
  }, [name]);

  const handleRegister = async () => {
    const codeNumber = Number(code);
    const priceNumber = Number(price);

    console.log("handleRegister called");
    Alert.alert("確認", "ボタンが押されました");

    if (isNaN(codeNumber)) {
      Alert.alert("エラー", "コードは数値で入力してください");
      return;
    }
    if (isNaN(priceNumber)) {
      Alert.alert("エラー", "値段は数値で入力してください");
      return;
    }
    // コードの重複チェック
    const { data: existing, error: existError } = await supabase

      .from("Greenocean_Color")
      .select("*")
      .eq("コード", codeNumber);
    if (existing && existing.length > 0) {
      Alert.alert("エラー", "このコードはすでに使用されています");
      return;
    }
    console.log("コード:", code);
    console.log("Supabaseに問い合わせます");
    const { error } = await supabase.from("GreenOcean_Color").insert([
      {
        番号: nextNumber,
        コード: Number(code),
        商品名: name,
        フリガナ: furigana,
        値段: Number(price),
        セット名: setName,
        購入済み: isPurchased,
      },
    ]);
    if (error) {
      console.log("登録エラー:", error.message, error.details);
      Alert.alert("登録失敗", error.message);
    } else {
      console.log("登録成功");
      Alert.alert("登録成功", "商品を追加しました");
      // フォームクリアなど
      setCode("");
      setName("");
      setFurigana("");
      setPrice("");
      setSelectedSetName("");
      setIsPurchased(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={(styles.container, formStyles.container)}
    >
      <Text style={formStyles.title}>新規商品登録</Text>
      <Text style={styles.label}>番号: {nextNumber}</Text>
      <Text>コード</Text>
      <TextInput
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        placeholder="コードを入力"
        style={formStyles.input}
      />

      <Text>商品名</Text>
      <TextInput value={name} onChangeText={setName} style={formStyles.input} />
      <Text style={styles.label}>フリガナ</Text>
      <TextInput
        value={furigana}
        onChangeText={setFurigana}
        style={formStyles.input}
      />
      <Text style={styles.label}>値段</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={formStyles.input}
      />

      <Text style={styles.label}>セット名</Text>
      <Picker
        selectedValue={selectedSetName}
        onValueChange={(itemValue: string) => setSelectedSetName(itemValue)}
        style={formStyles.picker}
      >
        <Picker.Item label="選択してください" value="" />
        {setList.map((name) => (
          <Picker.Item key={name} label={name} value={name} />
        ))}
      </Picker>
      <View style={{ marginTop: 8 }}>
        <Text>
          登録したいセット名がない場合は{" "}
          <Link href="/register/add-set-name" asChild>
            <Text style={{ color: "blue" }}>コチラ</Text>
          </Link>
        </Text>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>購入済み</Text>
        <Switch value={isPurchased} onValueChange={setIsPurchased} />
      </View>
      <TouchableOpacity onPress={handleRegister} style={formStyles.button}>
        <Text style={formStyles.buttonText}>登録する</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",

    gap: 12,
  },
  label: {
    color: "#434656",

    fontSize: 16,
  },
  input: {
    color: "#434656",

    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    borderRadius: 4,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ColorForm;
