import ColorSearchPanel from "@/components/color/ColorSearchPanel";
import { BackButton } from "@/components/BackButton";
import { AppSnackbar } from "@/components/common/AppSnackbar";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { ListStatus } from "@/components/ListStatus";
import { TableView,Column } from "@/components/TableView";
import {
  deleteColor,
  togglePurchased,
} from "@/features/itemActions/itemActions";
import { sortItems } from "@/features/sort/sortItems";
import { SortKey } from "@/features/sort/sortTypes";
import { supabase } from "@/lib/supabaseClient";
import { desktopFormStyles, formStyles } from "@/theme/formStyles";
import { SnackbarType } from "@/theme/snackbarStyles";
import { useIsDesktop } from "@/theme/useIsDesktop";
import { Color } from "@/types/types";
import  {createColorColumns}  from "@/components/color/ColorColumns";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
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
  const [deleteTarget, setDeleteTarget] = useState<Color | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<SnackbarType>("success");

  const showSnackbar = (msg: string, type: SnackbarType = "success") => {
    setSnackbarMessage(msg);
    setSnackbarType(type);
    setSnackbarVisible(true);
  };
  //ＰＣかスマホ判定
  const isDesktop = useIsDesktop();

  const handleTogglePurchased = async (item:Color) => {
    await togglePurchased(item.コード, !item.購入済み);

    setColors((prev) => 
    prev.map((c) =>
      c.コード === item.コード
    ? { ...c, 購入済み: !c.購入済み }
    :c
    )
  );
  };

const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
                try {
                  await deleteColor(deleteTarget.コード);

    setColors((prev) =>
    prev.filter((item) => item.コード !== deleteTarget?.コード)
  );
   setSnackbarMessage("データを削除しました。");
                } catch (e) {
                  setSnackbarMessage("削除に失敗しました。");
                } finally {
                  setSnackbarVisible(true);
                  setDeleteTarget(null);
                }
              };

  const columns = createColorColumns({
    isDesktop,
    onTogglePurchased:handleTogglePurchased,
    onDelete:handleDeleteConfirm,
  })
   

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
        .from("GreenOcean_SetColor")
        .select("セット名");

      if (!error && data) {
        const uniqueNames = Array.from(
          new Set(data.map((item: any) => item["セット名"]).filter((v) => v)),
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

const handleKeywordChange = (value:string) => {
  setSearchKeyword(value);
};

const handleSetNameChange = (value: string) => {
  setSelectedSetName(value);
}

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

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* ロード中の表示 */}
      <ListStatus
        loading={loading}
        error={error}
        hasData={!!colors && colors.length > 0}
        emptyMessage="該当する商品がありません"
      />
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
       <BackButton />
       <Text style={[formStyles.title]}>商品一覧表示</Text>
     </View>
     <ColorSearchPanel
        isDesktop={isDesktop}
        searchOpen={searchOpen}
        onToggleSearch={toggleSearch}
        search={{
          keyword: searchKeywordInput,
          selectedSetName,
          setNameList,
        }}
        actions={{
          onKeywordChange: handleKeywordChange,
          onSetNameChange: handleSetNameChange,
          onSearch: handleSearch,
        }}
        sort={{
          value: sortKey,
          onChange: setSortKey,
     }}
     />

        {/* テーブル */}
        <View style={{ flex: 2 }}>
          <View>
            <TableView
              data={sortedColors}
              columns={columns}
              isDesktop={isDesktop}
              rowKey={(item) => item.コード}
            />
            <DeleteConfirmDialog
              visible={!!deleteTarget}
              onCancel={handleDeleteCancel}
              onConfirm={handleDeleteConfirm}
            />
          </View>
          <View style={styles.pagination}>
            <Button title="前へ" onPress={handlePrev} disabled={page === 0} />
            <Text>ページ {page + 1}</Text>
            <Button title="次へ" onPress={handleNext} disabled={!hasMore} />
          </View>
        </View>
      </View>

      <AppSnackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        onDismiss={() => setSnackbarVisible(false)}
      />
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
