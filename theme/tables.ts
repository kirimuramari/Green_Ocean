import { StyleSheet } from "react-native";
//モバイルスタイル
export const tables = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 5,
  },
  headerCell: {
    flex: 1,
    textAlign: "left",
    fontWeight: "bold",
    color: "#434656",
    fontSize: 14,
    paddingVertical: 6,
  },
  dataRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  dataCell: {
    flex: 1,
    textAlign: "left",
    paddingVertical: 6,
    fontSize: 13,
    color: "#747575",
  },
});

//デスクトップスタイル
export const desktopTables = StyleSheet.create({
  headerRow: {
    paddingHorizontal: 10,
    paddingTop: 12,
  },
  headerCell: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  dataRow: {
    paddingHorizontal: 10,
  },
  dataCell: {
    fontSize: 16,
    paddingVertical: 8,
  },
});
