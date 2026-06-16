import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { BackButton } from "@/components/BackButton";
import { formStyles } from "@/theme/formStyles";
import { Dispatch, SetStateAction } from "react";

type Props = {
    query:string;
    setQuery:Dispatch<SetStateAction<string>>;
    handleSearch:() => void;

    loading:boolean;

   
};

export function EditHeader({
    query,
    setQuery,
    handleSearch,
    loading,
   
}:Props) {
    return(
        <View style={formStyles.container}>
            <View style={formStyles.header}>
              <BackButton />
              <Text style={formStyles.title}>登録済み商品の編集</Text>
            </View>
            <Text style={formStyles.label}>コード または 商品名で検索</Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="例: 1 または ミルク"
              returnKeyType="search"
              style={formStyles.input}
            />
            <TouchableOpacity onPress={handleSearch} style={formStyles.button}>
              <Text style={formStyles.buttonText}>検索</Text>
            </TouchableOpacity>
            {loading && (
                <ActivityIndicator style={{ marginTop: 16 }} />
            )}
                          </View>
    );
}