import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Colorform } from "@/types/types";
import {validateColorForm} from "@/features/form/validateColorForm";


export const useColorUpdate = () => {
    const [updating, setUpdating] = useState(false);

    const updateColor = async (
        number: number,
        form: Colorform
    ) => {
        const errorMessage = validateColorForm(form);

        if (errorMessage){
            return {
                success:false,
                message: errorMessage,
            };
        }
        setUpdating(true);
        try {
        const { error } = await supabase
        .from("GreenOcean_Color")
        .update(form)
        .eq("番号", number);

        if (error) {
            return {
                success: false,
                message: "更新に失敗しました",
            };
        }

        return {
            success:true,
            message: "更新が完了しました",
        };
    } finally {
        setUpdating(false);
    }
};
    return {
        updating,
        updateColor,
    };
};