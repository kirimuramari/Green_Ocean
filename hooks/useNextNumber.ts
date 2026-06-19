import { useEffect,useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Colorform } from "@/types/types";

export function useNextNumber() {
      const [nextNumber, setNextNumber] = useState(1);    
      const [loading, setLoading] = useState(true);
      const refreshNextNumber = async () => {
                    setLoading(true);

          const { data } = await supabase
          .from("GreenOcean_Color")
          .select("番号")
          .order("番号", { ascending: false })
          .limit(1) as {
            data:Colorform[] | null;
          };
          
          setNextNumber(data?.[0]?.番号 ? data[0].番号 + 1 : 1);
           
        
            setLoading(false);
        };
        // 番号の取得（連番）
          useEffect(() => {
            refreshNextNumber();
          }, []);
    
        return {
            nextNumber,
            loading,
            refreshNextNumber,
        };
    
}