import {useState} from "react";


export function useColorSearch() {
    const [searchKeywordInput, setSearchKeywordInput] = useState("");
    const [selectedSetName, setSelectedSetName] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
      const [searchSetName, setSearchSetName] = useState("");
      const [searchOpen, setSearchOpen] = useState(false);

      const handleKeywordChange = (value:string) => {
        setSearchKeywordInput(value);
      };
      
      const handleSetNameChange = (value: string) => {
        setSelectedSetName(value);
      }
      
        const applySearch = () => {
          setSearchKeyword(searchKeywordInput.trim());
          setSearchSetName(selectedSetName);
        };

        const openSearch = () => {
          setSearchOpen(true);
        };

        const closeSearch = () => {
          setSearchOpen(false);
        };
      
        //スマホ向けアコーディオン切り替えロジック
        const toggleSearch = () => {
            setSearchOpen((prev) => !prev);
          
        };
    return {
        searchKeywordInput,
        selectedSetName,
        searchKeyword,
        searchSetName,
        searchOpen,
        handleKeywordChange,
        applySearch,
        handleSetNameChange,
        openSearch,
        closeSearch,
        toggleSearch,

    };
}
