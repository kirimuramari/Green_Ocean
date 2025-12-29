import { ColorFormView } from "@/components/common/ColorFormView";
import { validateColorForm } from "@/features/form/validateColorForm";
import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { SnackbarType, getSnackbarStyle } from "@/theme/snackbarStyles";
import { Colorform } from "@/types/types";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";

const ColorForm = () => {
  const [setList, setSetList] = useState<string[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<SnackbarType>("success");
  const [nextNumber, setNextNumber] = useState<number>(1);

  const [form, setForm] = useState<Colorform>({
    コード: "",
    商品名: "",
    フリガナ: "",
    値段: null,
    セット名: "",
    購入済み: false,
  });

  const showSnackbar = (msg: string, type: SnackbarType = "success") => {
    setSnackbarMessage(msg);
    setSnackbarType(type);
    setSnackbarVisible(true);
  };

  const handleChange = <K extends keyof Colorform>(
    key: K,
    value: Colorform[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  // 番号の取得（連番）
  useEffect(() => {
    const fetchData = async () => {
      const { data: colorData } = (await supabase
        .from("GreenOcean_Color")
        .select("番号")
        .order("番号", { ascending: false })
        .limit(1)) as { data: { 番号: number }[] | null };
      if (colorData && colorData.length > 0) {
        setNextNumber(colorData[0].番号 + 1);
      }
    };
    //セット名取得
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
    fetchData();
    fetchSetList();
  }, []);

  // 商品名がカタカナだけなら nameKana にコピー
  useEffect(() => {
    if (/^[\u30A0-\u30FFー\s ]+$/.test(form.商品名)) {
      setForm((prev) => ({
        ...prev,
        フリガナ: prev.商品名,
      }));
    }
  }, [form.商品名]);

  const handleRegister = async () => {
    const errorMessage = validateColorForm(form);
    if (errorMessage) {
      showSnackbar(errorMessage, "error");

      return;
    }

    // コードの重複チェック
    const { data: existing } = await supabase

      .from("GreenOcean_Color")
      .select("コード")
      .eq("コード", Number(form.コード));
    if (existing && existing.length > 0) {
      showSnackbar("このコードはすでに使用されています", "error");
      return;
    }
    console.log("コード:", form.コード);
    console.log("Supabaseに問い合わせます");
    const { error } = await supabase.from("GreenOcean_Color").insert([
      {
        コード: Number(form.コード),
        商品名: form.商品名,
        フリガナ: form.フリガナ,
        値段: form.値段,
        セット名: form.セット名,
        購入済み: form.購入済み,
      },
    ]);
    if (error) {
      console.log("登録エラー:", error.message, error.details);
      showSnackbar("登録失敗しました", "error");
    } else {
      console.log("登録成功");
      showSnackbar("商品を追加しました", "success");
      // フォームクリアなど
      setForm({
        コード: "",
        商品名: "",
        フリガナ: "",
        値段: null,
        セット名: "",
        購入済み: false,
      });
    }
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={(styles.container, formStyles.container)}
      >
        <View style={formStyles.subContainer}>
          <View style={formStyles.header}>
            <TouchableOpacity
              onPress={() => router.replace("/")}
              style={formStyles.arrowButton}
            >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
            <Text style={formStyles.title}>新規商品登録</Text>
          </View>
          <ColorFormView
            form={form}
            onChange={handleChange}
            setList={setList}
            mode="create"
            readonlyNumber={nextNumber}
            onSubmitEditing={handleRegister}
          />
          <View style={formStyles.buttonRow}>
            <TouchableOpacity
              onPress={handleRegister}
              style={formStyles.button}
            >
              <Text style={formStyles.buttonText}>登録する</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.replace("/")}
              style={[formStyles.cancelButton, formStyles.halfButton]}
            >
              <Text style={formStyles.cancelButtonText}>キャンセル</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
