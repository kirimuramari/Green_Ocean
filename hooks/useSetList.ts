import { useState,useEffect} from 'react';
import { supabase} from "@/lib/supabaseClient";

export const useSetList = () => {
    const [setList, setSetList] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSetList = async () => {
            const {  data,error} = await supabase
            .from("GreenOcean_SetColor")
            .select("セット名")
            .returns<{セット名:string | null} []>();

            if (error) {
                setLoading(false);
                return;
            }
            const list = Array.from(
                new Set(
                    data
                    .map((item) => item.セット名?.trim())
                    .filter((name): name is string => !!name)
                )
            );
            setSetList(list);
            setLoading(false);
            
        };
        fetchSetList();
    }, []);
    return {
        setList,
        loading,
    };
};