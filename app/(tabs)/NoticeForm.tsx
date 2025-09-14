import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  FlatList,

} from "react-native";

import { tables } from "@/theme/tables";
import { Notice } from "@/types/types";

export default function NoticeForm() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  //一覧取得
  const fetchNotices = async () => {
    const { data, error} = await supabase
      .from("notices")
      .select("*")
      .order("created_at, {ascending: false}");

      if (error) {
        console.error(error);
        Alert.alert("エラー", "お知らせ一覧を取得できませんでした");
      } else {
        setNotices(data as Notice[]);
      }

  };

  const handleAddNotice = async () => {
    setLoading(true);
    const { error } = await supabase.from("notices").insert([{ title }]);
    setLoading(false);

    if (error) {
      alert("登録に失敗しました: " + error.message);
    } else {
      alert("お知らせを登録しました");
      setTitle("");
      setContent("");
    }
  };
  
  const handleDelete = async (id:number) => {
    Alert.alert("確認", "本当に削除しますか？", [
      {text:"キャンセル" },
      {
        text:"削除",
        style:"destructive",
        onPress: async () => {
              const { error } = await supabase
              .from("notices")
              .delete()
              .eq("id",id);
              
    if (error) {
              console.error(error);
      Alert.alert("エラー","削除に失敗しました");
    } else {
      setNotices((prev) => prev.filter((n) => n.id !== id));
    }

        },
      },
    ]);
  };
  useEffect(() => {
    fetchNotices();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>お知らせ追加</Text>
      <Text style={styles.label}>タイトル</Text>
      <TextInput
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
        <View>
          <Text style={styles.label}>一覧</Text>
          <FlatList
          data={notices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <View style={tables.headerRow}>
              <Text style={tables.cell}>{item.id}</Text>
              <Text style={tables.cell}>{item.title}</Text>
              <Text style={tables.cell}>{item.created_at.split("T")[0]}</Text>
              <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              style={formStyles.deleteButton}
              >
                <Text style={formStyles.deleteButtonText}>削除</Text>
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
});
