import { BackButton } from "@/components/BackButton";
import { ColorFormView } from "@/components/common/ColorFormView";
import { validateColorForm } from "@/features/form/validateColorForm";
import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { SnackbarType, getSnackbarStyle } from "@/theme/snackbarStyles";
import { Colorform } from "@/types/types";
import { useColorForm } from "@/hooks/useColorForm";
import {useSetList} from "@/hooks/useSetList";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {useSnackbar} from "@/hooks/useSnackbar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";

const ColorForm = () => {
  const {setList} = useSetList();

  const [nextNumber, setNextNumber] = useState<number>(1);
const {
  visible:snackbarVisible,
  message:snackbarMessage,
  type:snackbarType,
  showSnackbar,
  hideSnackbar,
} = useSnackbar();
const {
  form,
  handleChange,
  resetForm,
} = useColorForm();

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
    fetchData();
  },[]);
    //セット名取得
    


  // 商品名がカタカナだけなら nameKana にコピー
 

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
   const payload ={
     コード: Number(form.コード),
     商品名: form.商品名,
     フリガナ: form.フリガナ,
     値段: form.値段,
     セット名: form.セット名,
     購入済み: form.購入済み,

   };
    const { error } = await supabase
    .from("GreenOcean_Color")
    .insert([payload]);
    if (error) {
      showSnackbar("登録失敗しました", "error");
    } else {
      showSnackbar("商品を追加しました", "success");
      // フォームクリアなど
      resetForm();
    }
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={(styles.container, formStyles.container)}
      >
        <View style={formStyles.subContainer}>
          <View style={formStyles.header}>
            <BackButton />
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
        onDismiss={hideSnackbar}
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
