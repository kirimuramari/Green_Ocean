import { supabase } from "@/lib/supabaseClient";
import { Color } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";

import { QuickActions } from "@/components/common/QuickAction";
import { SortSelector } from "@/components/common/SortSelector";
import {
  deleteItem,
  togglePurchased,
} from "@/features/itemActions/itemActions";
import { sortItems } from "@/features/sort/sortItems";
import { SortKey } from "@/features/sort/sortTypes";
import { desktopFormStyles, formStyles } from "@/theme/formStyles";
import { desktopTables, tables } from "@/theme/tables";
import { useIsDesktop } from "@/theme/useIsDesktop";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ColorScreen() {
  const PAGE_SIZE = 30;
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchKeywordInput, setSearchKeywordInput] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [setNameList, setSetNameList] = useState<string[]>([]);
  const [selectedSetName, setSelectedSetName] = useState("");
  const [searchSetName, setSearchSetName] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("numberAsc");

  //ＰＣかスマホ判定
  const isDesktop = useIsDesktop();
  //スマホ向けアコーディオン切り替えロジック
  const toggleSearch = () => {
    if (!isDesktop) {
      setSearchOpen((prev) => !prev);
    }
  };
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

  const fetchData = useCallback(async () => {
    setLoading(true);
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    let query = supabase
      .from("GreenOcean_Color")
      .select("*", { count: "exact" });

    if (searchKeyword) {
      query = query.ilike("商品名", `%${searchKeyword}%`);
    }
    if (searchSetName) {
      query = query.eq("セット名", searchSetName);
    }
    switch (sortKey) {
      case "numberAsc":
        query = query.order("番号", { ascending: true });
        break;
      case "numberDsc":
        query = query.order("番号", { ascending: false });
        break;
      case "codeAsc":
        query = query.order("コード", { ascending: true });
        break;
      case "codeDsc":
        query = query.order("コード", { ascending: false });
        break;
    }
    query = query.range(from, to);

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
  }, [page, searchKeyword, searchSetName, sortKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const sortedColors = sortItems(colors, sortKey);

  // ロード中の表示

  if (loading) {
    return (
      <View style={formStyles.container}>
        <ActivityIndicator size="large" />
        <Text>読み込み中...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={formStyles.container}>
        <Text style={{ color: "red" }}>エラー:{error}</Text>
      </View>
    );
  }
  if (!colors || colors.length === 0) {
    return <Text>データが存在しません</Text>;
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[
          { width: "100%", backgroundColor: "#fff" },
          isDesktop && { flexDirection: "row", gap: 20 },
        ]}
      >
        <View
          style={[
            { marginLeft: 20, backgroundColor: "#fff" },
            !isDesktop && { marginBottom: 10 },
          ]}
        >
          <View style={formStyles.header}>
            <TouchableOpacity
              onPress={() => router.replace("/")}
              style={formStyles.arrowButton}
            >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
            <Text style={[formStyles.title]}>商品一覧表示</Text>
          </View>
          {/* スマホ：タップして開閉 */}
          <TouchableOpacity disabled={isDesktop} onPress={toggleSearch}>
            <Text style={styles.title}>
              データ検索
              {!isDesktop && (!searchOpen ? " ▼" : " ▲")}
            </Text>
          </TouchableOpacity>

          {(isDesktop || searchOpen) && (
            <View>
              <TextInput
                style={[formStyles.input, isDesktop && desktopFormStyles.input]}
                placeholder="商品名で検索"
                value={searchKeywordInput}
                onChangeText={setSearchKeywordInput}
              />
              <Text style={styles.label}>セット名でフィルター:</Text>
              <Picker
                selectedValue={selectedSetName}
                onValueChange={(itemValue) => setSelectedSetName(itemValue)}
                style={[
                  formStyles.picker,
                  isDesktop && desktopFormStyles.picker,
                ]}
              >
                <Picker.Item label="すべて" value="" />
                {setNameList.map((name) => (
                  <Picker.Item key={name} label={name} value={name} />
                ))}
              </Picker>
              <TouchableOpacity
                onPress={handleSearch}
                style={[
                  formStyles.button,
                  isDesktop && desktopFormStyles.button,
                ]}
              >
                <Text
                  style={[
                    formStyles.buttonText,
                    isDesktop && desktopFormStyles.buttonText,
                  ]}
                >
                  検索
                </Text>
              </TouchableOpacity>
              <SortSelector value={sortKey} onChange={setSortKey} />
            </View>
          )}
        </View>

        {/* テーブル */}
        <View style={{ flex: 2 }}>
          <View style={[desktopTables.tableContainerStyle]}>
            <View
              style={[tables.headerRow, isDesktop && desktopTables.headerRow]}
            >
              <Text
                style={[
                  { width: "10%" },
                  tables.headerCell,
                  isDesktop && desktopTables.headerCell,
                ]}
              >
                番号
              </Text>
              <Text
                style={[
                  { width: "25%" },
                  tables.headerCell,
                  isDesktop && desktopTables.headerCell,
                ]}
              >
                商品名
              </Text>
              <Text
                style={[
                  { width: "20%" },
                  tables.headerCell,
                  isDesktop && desktopTables.headerCell,
                ]}
              >
                フリガナ
              </Text>
              <Text
                style={[
                  { width: "10%" },
                  tables.headerCell,
                  isDesktop && desktopTables.headerCell,
                ]}
              >
                コード
              </Text>
              <Text
                style={[
                  { width: "15%" },
                  tables.headerCell,
                  isDesktop && desktopTables.headerCell,
                ]}
              >
                値段
              </Text>
              <Text
                style={[
                  { width: "30%" },
                  tables.headerCell,
                  isDesktop && desktopTables.headerCell,
                ]}
              >
                セット名
              </Text>
              <Text
                style={[
                  { width: "10%" },
                  tables.headerCell,
                  isDesktop && desktopTables.headerCell,
                ]}
              >
                操作
              </Text>
            </View>
            {sortedColors.map((item, index) => (
              <View
                key={item.コード ?? index}
                style={[
                  tables.dataRow,
                  { backgroundColor: index % 2 === 0 ? "#fff" : "#eee" },
                ]}
              >
                <Text
                  style={[tables.dataCell, isDesktop && desktopTables.dataCell]}
                >
                  {item.番号}
                </Text>
                <Text
                  style={[tables.dataCell, isDesktop && desktopTables.dataCell]}
                >
                  {item.商品名}
                </Text>
                <Text
                  style={[tables.dataCell, isDesktop && desktopTables.dataCell]}
                >
                  {item.フリガナ}
                </Text>
                <Text
                  style={[tables.dataCell, isDesktop && desktopTables.dataCell]}
                >
                  {item.コード}
                </Text>
                <Text
                  style={[tables.dataCell, isDesktop && desktopTables.dataCell]}
                >
                  ¥{item.値段}
                </Text>
                <Text
                  style={[tables.dataCell, isDesktop && desktopTables.dataCell]}
                >
                  {item.セット名}
                </Text>
                <View style={{ width: "10%", flexDirection: "row" }}>
                  <QuickActions
                    purchased={item.購入済み}
                    onTogglePurchased={async () => {
                      await togglePurchased(item.コード, !item.購入済み);
                      setColors((prev) =>
                        prev.map((c) =>
                          c.コード === item.コード
                            ? { ...c, 購入済み: !c.購入済み }
                            : c
                        )
                      );
                    }}
                    onDelete={async () => {
                      await deleteItem(item.コード);
                      setColors((prev) =>
                        prev.filter((c) => c.コード !== item.コード)
                      );
                    }}
                  />
                </View>
              </View>
            ))}
            <View style={styles.pagination}>
              <Button title="前へ" onPress={handlePrev} disabled={page === 0} />
              <Text>ページ {page + 1}</Text>
              <Button title="次へ" onPress={handleNext} disabled={!hasMore} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,

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
  // PC で左右の余白を整える場合
  sideContainer: {
    flex: 1,
    paddingRight: 20,
  },
});
