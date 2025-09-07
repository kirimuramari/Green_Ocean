import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function NoticeForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddNotice = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("notices")
      .insert([{ title, content }]);
    setLoading(false);

    if (error) {
      alert("登録に失敗しました: " + error.message);
    } else {
      alert("お知らせを登録しました");
      setTitle("");
      setContent("");
    }
  };
  return (
    <ScrollView contentContainerStyle={styles}>
      <Text style={styles.label}>お知らせ追加</Text>
      <TextInput
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={formStyles.input}
      />
      <Text
        placeholder="内容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={formStyles.input}
      />
      <TouchableOpacity
        onPress={handleAddNotice}
        disabled={loading}
        style={formStyles.button}
      >
        {loading ? "登録中..." : "お知らせ登録"}
      </TouchableOpacity>
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
