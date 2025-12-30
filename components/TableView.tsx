import { desktopTables, tables } from "@/theme/tables";
import React from "react";
import { Text, View } from "react-native";

type Column<T> = {
  key: string;
  header: string;
  width: string;
  render?: (item: T) => React.ReactNode;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  isDesktop: boolean;
  rowKey: (item: T, index: number) => string | number;
};

export function TableView<T>({ data, columns, isDesktop, rowKey }: Props<T>) {
  return (
    <View style={[desktopTables.tableContainerStyle]}>
      <View style={[tables.headerRow, isDesktop && desktopTables.headerRow]}>
        {columns.map((col) => (
          <Text
            key={col.key}
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
              key={col.key}
              style={[
                { width: col.width },
                tables.dataCell,
                isDesktop && desktopTables.dataCell,
              ]}
            >
              {col.render ? (
                col.render(item)
              ) : (
                <Text>{String((item as any)[col.key] ?? "")}</Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
