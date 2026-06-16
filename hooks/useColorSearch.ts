import { useState } from "react";
import { supabase} from "@/lib/supabaseClient";
import { Color} from "@/types/types";

export const useColorSearch = () => {
    const [searchResults, setSearchResults] = useState<Color[]>([]);
    const [loading, setLoading] = useState(false);

    const search = async (query:string) => {
        setLoading(true);
        try {
            const q = query.trim();

            const isNumeric = /^\d+$/.test(q); // 数値判定

            const { data, error} = isNumeric
            ? await supabase
            .from("GreenOcean_Color")
            .select("*")
            .eq("コード", Number(q))
            : await supabase
            .from("GreenOcean_Color")
            .select("*")
            .ilike("商品名", `%${q}%`);
            if (error) {
                return {
                    success:false,
                    message: error.message,
                };
            }
            setSearchResults(data ?? []);
            return {
                success: true,
                count:data?.length ?? 0,
                
            };
        } finally {
            setLoading(false);
        }
    };

const clearResults = () => {
    setSearchResults([]);
};

    return {
        searchResults,
        loading,
        search,
        clearResults,
    };
};