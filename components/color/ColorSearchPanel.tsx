import { Picker } from "@react-native-picker/picker";
import { Text, TextInput,TouchableOpacity,View,StyleSheet } from "react-native";
import { SortSelector } from "@/components/common/SortSelector";
import { desktopFormStyles,formStyles } from "@/theme/formStyles";
import { ColorSearchPanelProps } from "./types";




export default function ColorSearchPanel({
    isDesktop,
    searchOpen,
    onToggleSearch,
    search,
    actions,
    sort,
    
}: ColorSearchPanelProps) {
    return(
<>
     {/* スマホ：タップして開閉 */}
     <TouchableOpacity disabled={isDesktop} onPress={onToggleSearch}>
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
           value={search.keyword}
           onChangeText={actions.onKeywordChange}
         />
         <Text style={styles.label}>セット名でフィルター:</Text>
         <Picker
           selectedValue={search.selectedSetName}
           onValueChange={actions.onSetNameChange}
           style={[
             formStyles.picker,
             isDesktop && desktopFormStyles.picker,
           ]}
         >
           <Picker.Item label="すべて" value="" />
           {search.setNameList.map((name) => (
             <Picker.Item key={name} label={name} value={name} />
           ))}
         </Picker>
         <TouchableOpacity
           onPress={actions.onSearch}
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
         <SortSelector
          value={sort.value}
           onChange={sort.onChange}
            />
       </View>
     )}
   </>
    );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,

    marginTop: 20,

    marginBottom: 10,
  },

  label: { marginBottom: 10 },

  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  // PC で左右の余白を整える場合
  sideContainer: {
    flex: 1,
    paddingRight: 20,
  },
});