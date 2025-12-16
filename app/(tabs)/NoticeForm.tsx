import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { flattenStyle } from "@/theme/layout";
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

export default function NoticeForm() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //一覧取得
  const fetchNotices = async () => {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      setMessage("お知らせ一覧を取得できませんでした");
    } else {
      setNotices(data as Notice[]);
    }
  };

  const handleAddNotice = async () => {
    setLoading(true);
    const { error } = await supabase.from("notices").insert([{ title }]);
    setLoading(false);

    if (error) {
      setMessage("登録に失敗しました: " + error.message);
    } else {
      setMessage("お知らせを登録しました");
      setTitle("");
      setContent("");
      fetchNotices();
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("notices").delete().eq("id", id);

    if (error) {
      console.error(error);
      setMessage("削除に失敗しました");
    } else {
      setNotices((prev) => prev.filter((n) => n.id !== id));
      setMessage("お知らせを削除しました");
    }
  };
  useEffect(() => {
    fetchNotices();
  }, []);
  return (
    <ScrollView contentContainerStyle={flattenStyle(styles.container)}>
      <View style={formStyles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={formStyles.arrowButton}
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={formStyles.title}>お知らせ設定</Text>
      </View>
      {message ? <Text style={formStyles.message}>{message}</Text> : null}
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
    </ScrollView>
  );
}
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
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  listText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 14,
  },
});
