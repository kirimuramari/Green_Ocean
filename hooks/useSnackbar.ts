import { useState } from "react";
import {SnackbarType} from "@/theme/snackbarStyles";


export const useSnackbar = () => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(""); 
    const [type, setType] = useState<SnackbarType>("success");

    const showSnackbar = (
        msg: string,
        snackbarType: SnackbarType ="success"
    ) => {
        setMessage(msg);
        setType(snackbarType);
        setVisible(true);
    };
    const hideSnackbar = () => {
        setVisible(false);
    };
    return {
        visible,
        message,
        type,
        showSnackbar,
        hideSnackbar,
    };
};