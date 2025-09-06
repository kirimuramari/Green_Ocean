import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

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
    <div>
      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="内容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleAddNotice} disabled={loading}>
        {loading ? "登録中..." : "お知らせ登録"}
      </button>
    </div>
  );
}
