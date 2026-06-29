import { useState } from "react";
import { Color } from "@/types/types";
import { deleteColor,togglePurchased } from "@/features/itemActions/itemActions";
import { SnackbarType } from "@/theme/snackbarStyles";

type Props = {
    updateItem:(item:Color)=>void;
    removeItem:(code:number)=>void;
    // showSnackbar:(
    //     message:string,
    //     type?:SnackbarType,
    // )=>void;
};
export function useColorActions({
    updateItem,
    removeItem,

}:Props) {
    const [deleteTarget, setDeleteTarget] = useState<Color | null>(null);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState<SnackbarType>("success")

    const showSnackbar = (
        message:string,
        type:SnackbarType = "success",
    ) => {
        setSnackbarMessage(message);
        setSnackbarType(type);
        setSnackbarVisible(true);
    };
// スナックバーを閉じる
const hideSnackbar = () => {
    setSnackbarVisible(false);
};

    const handleDelete = (item:Color)=>{
        setDeleteTarget(item);
      };
        
    const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };    
    const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
                try {
                  await deleteColor(deleteTarget.コード);

    removeItem(deleteTarget.コード);
   showSnackbar("データを削除しました。");
                } catch {
    showSnackbar("削除に失敗しました。","error");
                } finally {
                  setDeleteTarget(null);
                }
              };
const handleTogglePurchased = async (
    item:Color,
) => {
    try {
    await togglePurchased(
        item.コード, 
        !item.購入済み
    );
    updateItem({
        ...item,
        購入済み: !item.購入済み,
    });
    showSnackbar("更新しました。");
    } catch {
    showSnackbar("更新に失敗しました。","error");
    }
};
return{
    deleteTarget,

    handleDelete,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleTogglePurchased,

    snackbarVisible,
    snackbarMessage,
    setSnackbarType,
    hideSnackbar,
};
}