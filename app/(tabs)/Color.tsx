import { supabase } from "@/lib/supabaseClient";
import { formStyles } from "@/theme/formStyles";
import { tables } from "@/theme/tables";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet as RNStyleSheet,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Color() {
  interface GreenOcean_Color {
    番号: number;
    コード: number;
    商品名: string;
    フリガナ: string;
    値段: number;
    セット名: string;
  }
  const PAGE_SIZE = 30;
  const [colors, setColors] = useState<GreenOcean_Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchKeywordInput, setSearchKeywordInput] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [setNameList, setSetNameList] = useState<string[]>([]);
  const [selectedSetName, setSelectedSetName] = useState("");
  const [searchSetName, setSearchSetName] = useState("");

  const flattenStyle = (base: any, extra?: any) =>
    RNStyleSheet.flatten([base, extra]);

  // セット名一覧の取得（初回のみ）
  useEffect(() => {
    const fetchSetNames = async () => {
      const { data, error } = await supabase
        .from("GreenOcean_Color")
        .select("セット名");

      if (!error && data) {
        const uniqueNames = Array.from(
          new Set(data.map((item: any) => item["セット名"]).filter((v) => v))
        );
        setSetNameList(uniqueNames);
      }
    };
    fetchSetNames();
  }, []);
  // データ取得（検索キーワード・セット名・ページが変わったとき）
  useEffect(() => {
    fetchData();
  }, [searchKeyword, searchSetName, page]);
  const fetchData = async () => {
    setLoading(true);
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    let query = supabase
      .from("GreenOcean_Color")
      .select("*", { count: "exact" })
      .order("番号", { ascending: true })
      .range(from, to);

    if (searchKeyword) {
      query = query.ilike("商品名", `%${searchKeyword}%`);
    }
    if (searchSetName) {
      query = query.eq("セット名", searchSetName);
    }
    const { data, error, count } = await query;

    if (error) {
      console.error("エラー:", error);
      setColors([]);
      setHasMore(false);
    } else {
      setColors(data ?? []);
      setHasMore((count ?? 0) > to + 1); //次ページが存在するか
      setError(null);
    }

    setLoading(false);
  };

  const handleSearch = () => {
    setPage(0);
    setSearchKeyword(searchKeywordInput.trim());
    setSearchSetName(selectedSetName);
  };
  const handleNext = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  // ロード中の表示

  if (loading) {
    return (
      <View style={flattenStyle(styles.center)}>
        <ActivityIndicator size="large" />
        <Text>読み込み中...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={flattenStyle({ padding: 20 })}>
        <Text style={flattenStyle({ color: "red" })}>エラー:{error}</Text>
      </View>
    );
  }
  if (!colors || colors.length === 0) {
    return <Text>データが存在しません</Text>;
  }
  return (
    <FlatList
      data={colors}
      keyExtractor={(_, index) => index.toString()}
      ListHeaderComponent={
        <View style={flattenStyle(styles.container)}>
          <Text style={flattenStyle(styles.title)}>データ検索</Text>
          <TextInput
            style={formStyles.input}
            placeholder="商品名で検索"
            value={searchKeywordInput}
            onChangeText={setSearchKeywordInput}
          />
          <Text style={flattenStyle(styles.label)}>セット名でフィルター:</Text>
          <Picker
            selectedValue={selectedSetName}
            onValueChange={(itemValue) => setSelectedSetName(itemValue)}
            style={formStyles.picker}
          >
            <Picker.Item label="すべて" value="" />
            {setNameList.map((name) => (
              <Picker.Item key={name} label={name} value={name} />
            ))}
          </Picker>
          <TouchableOpacity onPress={handleSearch} style={formStyles.button}>
            <Text style={formStyles.buttonText}>検索</Text>
          </TouchableOpacity>

          <View style={flattenStyle(tables.headerRow)}>
            <Text style={flattenStyle(tables.headerCell)}>商品名</Text>
            <Text style={flattenStyle(tables.headerCell)}>フリガナ</Text>
            <Text style={flattenStyle(tables.headerCell)}>コード</Text>
            <Text style={flattenStyle(tables.headerCell)}>値段</Text>
            <Text style={flattenStyle(tables.headerCell)}>セット名</Text>
          </View>
        </View>
      }
      renderItem={({ item, index }) => (
        <View
          style={flattenStyle(tables.dataRow, {
            backgroundColor: index % 2 === 0 ? "#fff" : "#eee",
          })}
        >
          <Text style={flattenStyle(tables.dataCell)}>{item.商品名}</Text>
          <Text style={flattenStyle(tables.dataCell)}>{item.フリガナ}</Text>
          <Text style={flattenStyle(tables.dataCell)}>{item.コード}</Text>
          <Text style={flattenStyle(tables.dataCell)}>¥{item.値段}</Text>
          <Text style={flattenStyle(tables.dataCell)}>{item.セット名}</Text>
        </View>
      )}
      ListFooterComponent={
        <View style={flattenStyle(styles.pagination)}>
          <Button title="前へ" onPress={handlePrev} disabled={page === 0} />
          <Text>ページ {page + 1}</Text>
          <Button title="次へ" onPress={handleNext} disabled={!hasMore} />
        </View>
      }
      ListEmptyComponent={
        <View style={flattenStyle({ padding: 20 })}>
          <Text>データがありません</Text>
        </View>
      }
      contentContainerStyle={flattenStyle({ paddingBottom: 80, flexGrow: 1 })}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
        color: "#747575",

    fontWeight: "bold",
        marginTop: 20,

    marginBottom: 10,
  },

  label: { marginBottom: 10 },

  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
