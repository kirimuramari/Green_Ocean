import { Dimensions, Platform, StyleSheet } from "react-native";

const isWeb = Platform.OS === "web";
const isDesktop = isWeb && Dimensions.get("window").width >= 1024;

export const tables = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 5,
    ...(isDesktop && {
      marginHorizontal: 40,
      fontSize: 18,
      paddingTop: 18,
    }),
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "#434656",
    ...(isDesktop && {
      fontSize: 18,
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 8,
    }),
  },
  dataRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    ...(isDesktop && {
      marginHorizontal: 40,
    }),
  },
  dataCell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 6,
    fontSize: 13,
    color: "#747575",

    ...(isDesktop && {
      fontSize: 16,
      padding: 8,
    }),
  },
});
