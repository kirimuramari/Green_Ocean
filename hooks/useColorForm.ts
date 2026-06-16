import { useEffect, useState } from "react";
import {Colorform,Color} from "@/types/types";


const initialForm:Colorform = {
    コード:"",
    商品名:"",
    フリガナ:"",
    値段:null,
    セット名:"",
    購入済み:false,
};

export const useColorForm = (
    initialValue?: Partial<Colorform>
) => {
    const [form, setForm] = useState<Colorform>({
        ...initialForm,
        ...initialValue,
    });
    
    const handleChange = <K extends keyof Colorform>(
        key:K,
        value: Colorform[K]
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]:value,
        }));
    };
    const resetForm = () => {
        setForm(initialForm);
    };
    useEffect(() => {
        if (/^[\u30A0-\u30FFー\s ]+$/.test(form.商品名)) {
            setForm((prev) => ({
                ...prev,
                フリガナ:prev.商品名,
            }));
    }
},[form.商品名]);
const loadColor = (color: Color) => {
    setForm({
        コード: color.コード,
        商品名: color.商品名,
        フリガナ: color.フリガナ,
        値段: color.値段,
        セット名: color.セット名,
        購入済み: color.購入済み,
    });
};
return {
    form,
    setForm,
    handleChange,
    resetForm,
    loadColor,
};
};