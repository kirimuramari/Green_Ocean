import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { flattenStyle } from "@/theme/layout";
import { SnackbarType, getSnackbarStyle } from "@/theme/snackbarStyles";
import { Notice } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";

export default function NoticeForm() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<SnackbarType>("success");

  const showSnackbar = (msg: string, type: SnackbarType = "success") => {
    setSnackbarMessage(msg);
    setSnackbarType(type);
    setSnackbarVisible(true);
  };

  const handleAddNotice = async () => {
    setLoading(true);
    const { error } = await supabase.from("notices").insert([{ title }]);
    setLoading(false);

    if (error) {
      showSnackbar("登録に失敗しました: ", "error");
    } else {
      showSnackbar("お知らせを登録しました", "success");
      setTitle("");
      setContent("");
      // Fetch notices after adding
      const { data } = await supabase
        .from("notices")
        .select("*")
        .order("id", { ascending: true });
      if (data) {
        setNotices(data as Notice[]);
      }
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("notices").delete().eq("id", id);

    if (error) {
      console.error(error);
      showSnackbar("削除に失敗しました", "error");
    } else {
      setNotices((prev) => prev.filter((n) => n.id !== id));
      showSnackbar("お知らせを削除しました", "success");
    }
  };

  useEffect(() => {
    //一覧取得
    const fetchNotices = async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error(error);
        showSnackbar("お知らせ一覧を取得できませんでした", "error");
      } else {
        setNotices(data as Notice[]);
      }
    };

    fetchNotices();
  }, []);
  return (
    <ScrollView contentContainerStyle={formStyles.container}>
      <View style={formStyles.subContainer}>
        <View style={formStyles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={formStyles.arrowButton}
          >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={formStyles.title}>お知らせ設定</Text>
        </View>
        <Text style={styles.label}>お知らせ追加</Text>
        <Text style={styles.label}>タイトル</Text>
        <TextInput
          placeholder="タイトル"
          value={title}
          onChangeText={setTitle}
          style={formStyles.input}
        />
        <TouchableOpacity
          onPress={handleAddNotice}
          disabled={loading}
          style={formStyles.button}
        >
          <Text style={formStyles.buttonText}>
            {loading ? "登録中..." : "お知らせ登録"}
          </Text>
        </TouchableOpacity>
        {/* お知らせの一覧を表示 */}
        <View style={flattenStyle(styles.container)}>
          <Text style={styles.label}>一覧</Text>
          <FlatList
            data={notices}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[flattenStyle(styles.listItem)]}>
                <Text style={styles.listText}>
                  {item.id}.{item.title}.{item.created_at.split("T")[0]}
                </Text>

                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={formStyles.NoticeDeleteButton}
                >
                  <Text style={formStyles.buttonText}>削除</Text>
                </TouchableOpacity>
              </View>
            )}
          />
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
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    gap: 12,
  },
  label: {
    color: "#434656",
    fontSize: 16,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
  },
  listText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    marginRight: 10,
  },
});
