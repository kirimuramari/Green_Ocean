import { Color } from "@/types/types";
import { Column } from "../TableView";
import {  Text } from "react-native";

type CreateColorColumnsProp ={
  isDesktop:boolean
  
};

export function createColorColumns({
    isDesktop,

}: CreateColorColumnsProp):Column<Color>[] {

     return [
     {
          id: "番号",
          key:"番号",
          header: "番号",
          width: isDesktop ? "6%" : "10%",
          render: (item: Color) => (
            <Text style={{ textAlign: "left" }}>{item.番号}</Text>
          ),
        },
        { 
          id: "商品名",
          key:"商品名",
         header: "商品名",
         width: isDesktop ? "14%" : "18%",
         },
        { 
          id: "フリガナ",
          key:"フリガナ",
           header: "フリガナ",
            width: isDesktop ? "14%" : "0%",
           },
        {
          id: "コード",
          key:"コード",
          header: "コード",
          width: isDesktop ? "8%" : "10%",
          render: (item: Color) => (
            <Text style={{ textAlign: "left" }}>{item.コード}</Text>
          ),
        },
        {
          id: "値段",
          key:"値段",
          header: "値段",
          width: isDesktop ? "8%" : "10%",
          render: (item: Color) => (
            <Text style={{ textAlign: "left" }}>¥{item.値段}</Text>
          ),
        },
        { 
          id: "セット名",
          key:"セット名",
          header: "セット名",
           width: isDesktop ? "30%" : "34%" },
   
      ];
}