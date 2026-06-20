import { Picker } from "@react-native-picker/picker";
import { Text, TextInput,TouchableOpacity,View } from "react-native";
import { SortSelector } from "@/components/common/SortSelector";
import { desktopFormStyles,formStyles } from "@/theme/formStyles";
import { SortKey } from "@/features/sort/sortTypes";
import { BackButton } from "../BackButton";

type Props = {
    isDesktop:boolean;
    searchOpen:boolean;

    searchKeywordInput: string;
    onSearchKeywordChange:(text:string) => void;

    setNameList: string;
    onSelectedSetNameChange:(value:string) => void;

    sortKey:SortKey;
    onSortChange:(value:SortKey) => void;

    onSearch:() => void;
    onToggleSearch:() => void;
};

export function ColorSearchPanel({
    isDesktop,
    searchOpen,
    searchKeywordInput,
    onSearchKeywordChange,
    setNameList,
    onSelectedSetNameChange,
    sortKey,
    onSortChange,
    onSearch,
    onToggleSearch,
}:Props) {
    return(

    //  {/* スマホ：タップして開閉 */}
     <TouchableOpacity disabled={isDesktop} onPress={toggleSearch}>
       <Text style={styles.title}>
         データ検索
         {!isDesktop && (!searchOpen ? " ▼" : " ▲")}
       </Text>
     </TouchableOpacity>

     {(isDesktop || searchOpen) && (
       <View>
         <TextInput
           style={[formStyles.input, isDesktop && desktopFormStyles.input]}
           placeholder="商品名で検索"
           value={searchKeywordInput}
           onChangeText={setSearchKeywordInput}
         />
         <Text style={styles.label}>セット名でフィルター:</Text>
         <Picker
           selectedValue={selectedSetName}
           onValueChange={(itemValue) => setSelectedSetName(itemValue)}
           style={[
             formStyles.picker,
             isDesktop && desktopFormStyles.picker,
           ]}
         >
           <Picker.Item label="すべて" value="" />
           {setNameList.map((name) => (
             <Picker.Item key={name} label={name} value={name} />
           ))}
         </Picker>
         <TouchableOpacity
           onPress={handleSearch}
           style={[
             formStyles.button,
             isDesktop && desktopFormStyles.button,
           ]}
         >
           <Text
             style={[
               formStyles.buttonText,
               isDesktop && desktopFormStyles.buttonText,
             ]}
           >
             検索
           </Text>
         </TouchableOpacity>
         <SortSelector value={sortKey} onChange={setSortKey} />
       </View>
     )}
   </View>
    )
}
