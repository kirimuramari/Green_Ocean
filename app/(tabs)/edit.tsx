import { Color} from "@/types/types";
import { useColorForm } from "@/hooks/useColorForm";
import {  useState } from "react";
import { useSetList} from "@/hooks/useSetList"
import { EditHeader } from "@/components/edit/EditHeader";
import {useSnackbar}from "@/hooks/useSnackbar";
import {useColorSearch} from "@/hooks/useColorSearch";
import {useColorUpdate} from "@/hooks/useColorUpdate";
import { AppSnackbar } from "@/components/common/AppSnackbar";
import { SearchResultItem } from "@/components/edit/SearchResultItem";
import { EditFormSection } from "@/components/edit/EditFormSection";
import {
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Text,

} from "react-native";

export default function Edit() {
  const [query, setQuery] = useState("");
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const {setList} = useSetList();
  const {
    visible:snackbarVisible,
    message:snackbarMessage,
    type:snackbarType,
    showSnackbar,
    hideSnackbar,
  } = useSnackbar();
  
  const {
    form,
    loadColor,
    handleChange,
    resetForm,
  } = useColorForm();
  
  const {
    searchResults,
    clearResults,
    loading,
    search,
  } = useColorSearch();

const {
  updating,
  updateColor,
} = useColorUpdate();

const handleCancelEdit = () => {
  setSelectedColor(null);
  resetForm();
  setQuery("");
}

  const handleSearch = async () => {
    if (!query.trim()) {
      showSnackbar("検索ワードを入力してください。", "error");
      clearResults();
      setSelectedColor(null);
      return;
    }
    const result = await search(query);

    if (!result.success) {
      showSnackbar("検索に失敗しました","error");
      clearResults();
      setSelectedColor(null);
      return;
    }
    if (result.count === 0) {
            showSnackbar("データが見つかりません","error");
            clearResults();
    }
  };



  const handleSelectItem = (item: Color) => {
   
    setSelectedColor(item);
    loadColor(item);
  };

 const handleUpdate = async () => {
  if (!selectedColor) return;

  const result = await updateColor(
    selectedColor.番号,
    form
  );

  showSnackbar(
    result.message,
    result.success ? "success" : "error"
  );
 };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.select({
         ios: "padding", 
         android: undefined,
         })}
         style={{flex:1}}
    >
     <FlatList
     data={searchResults}
     style={{backgroundColor:"#FFF"}}
     keyExtractor={(item) => item.番号.toString()}
     ListHeaderComponent={
       <>
       <EditHeader
         query={query}
         setQuery={setQuery}
         handleSearch={handleSearch}
         loading={loading}
         />
         {selectedColor && (
          <EditFormSection
          selectedColor={selectedColor}
          form={form}
          handleChange={handleChange}
          setList={setList}
          updating={updating}
          handleUpdate={handleUpdate}
          handleCancelEdit={handleCancelEdit}

        />
         )}
         
        {searchResults.length > 0 && (
            <Text style={ { marginTop: 24,marginLeft:24, }}>
            検索結果一覧（タップして編集）
                                       </Text>
                                     )}
      </>
     }
       renderItem={({ item }) => (
         <SearchResultItem
         item={item}
         onSelect={handleSelectItem}
         />
       )}
     />
       
      {/* メッセージ表示 */}
      <AppSnackbar
      visible={snackbarVisible}
      message={snackbarMessage}
      type={snackbarType}
      onDismiss={hideSnackbar}
      />
    </KeyboardAvoidingView>
  );
}

