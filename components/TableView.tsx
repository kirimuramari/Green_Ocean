//テーブル表示
import { desktopTables, tables } from "@/theme/tables";
import React from "react";
import { Text, View, DimensionValue } from "react-native";


export type Column<T extends object> = {
  id:string;
  key?:Extract<keyof T, string | number>;
  header: string;
  width: DimensionValue;
  render?: (item: T) => React.ReactNode;
};

type Props<T extends object> = {
  data: T[];
  columns: Column<T>[];
  isDesktop: boolean;
  rowKey: (item: T, index: number) => string | number;
};


export function TableView<T extends object>
({ data, columns, isDesktop, rowKey }: Props<T>) {
  return (
    <View style={[desktopTables.tableContainerStyle]}>
      <View style={[tables.headerRow, isDesktop && desktopTables.headerRow]}>
        {columns.map((col) => (
          <Text
            key={col.id}
            style={[
              {
                width: col.width,
              },
              tables.headerCell,
              isDesktop && desktopTables.headerCell,
            ]}
          >
            {col.header}
          </Text>
        ))}
      </View>

      {data.map((item, index) => (
        <View
          key={rowKey(item, index)}
          style={[
            tables.headerRow,
            { backgroundColor: index % 2 === 0 ? "#fff" : "#eee" },
          ]}
        >
          {columns.map((col) => (
            <View
              key={col.id}
              style={[
                { width: col.width },
                tables.dataCell,
                isDesktop && desktopTables.dataCell,
              ]}
            >
              {col.render ? (
                col.render(item)
              ) : col.key ? (
                <Text>{String(item[col.key as keyof T] ?? "")}</Text>
              ): null}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
