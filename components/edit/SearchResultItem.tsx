import { Text, TouchableOpacity } from "react-native";
import {Color} from "@/types/types";
import {formStyles} from "@/theme/formStyles";

type Props ={
    item:Color;
    onSelect: (item:Color) => void;
};

export function SearchResultItem({
    item,
    onSelect,
}: Props) {
    return (
        <TouchableOpacity
        onPress={() => onSelect(item)}
        style={[style.listItems, formStyles.container]}
    >
        <Text>
            {item.番号} - {item.商品名}
            (コード: {item.コード})
        </Text>
    </TouchableOpacity>
    );
}

const style = {
    listItems: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
};