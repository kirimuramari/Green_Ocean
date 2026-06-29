import { useCallback,useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Color } from "@/types/types";
import { SortKey } from "@/features/sort/sortTypes";

const PAGE_SIZE = 30;

type Props = {
    searchKeyword: string;
    searchSetName: string;
    sortKey: SortKey;
};
export function useColorList({
    searchKeyword,
    searchSetName,
    sortKey,
}: Props) {
    
    const [colors, setColors] = useState<Color[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [setNameList, setSetNameList] = useState<string[]>([]);
    
      // セット名一覧の取得（初回のみ）
      useEffect(() => {
        const fetchSetNames = async () => {
          const { data, error } = await supabase
            .from("GreenOcean_SetColor")
            .select("セット名");
    
          if (!error && data) {
            setSetNameList(
                Array.from(
                  new Set(
                    data
                    .map((item: any) => item["セット名"])
                    .filter(Boolean),
                ),
            ),
        );
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
            query = query.order("番号");
            break;
          case "numberDsc":
            query = query.order("番号", { ascending: false });
            break;
          case "codeAsc":
            query = query.order("コード");
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
          setError(error.message);
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

      useEffect(() => {
        setPage(0);
      },[searchKeyword,searchSetName]);
    
      const nextPage = () => {
        if (hasMore) {
            setPage((prev) => prev + 1);

        } 
      };
    
      const prevPage = () => {
        if (page > 0) {
            setPage((prev) => prev - 1);
        }
      };
      const refresh = () => {
        fetchData();
      };
    
      const updateItem = (updated: Color) => {
        setColors((prev) => 
        prev.map((item) =>
          item.コード === updated.コード ? updated : item,
        ),
      );
      };
    const removeItem = (code:number) => {
        setColors((prev) =>
        prev.filter((item) => item.コード !== code),
        );
    };
    return {
        colors,
        loading,
        error,
        page,
        hasMore,
        setPage,
        setNameList,
        nextPage,
        prevPage,
        refresh,
        updateItem,
        removeItem,
    };
}