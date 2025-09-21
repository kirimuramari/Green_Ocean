import { Dimensions, Platform, StyleSheet } from "react-native";

const isWeb = Platform.OS === "web";
const isDesktop = isWeb && Dimensions.get("window").width >= 1024;

export const formStyles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: "#fff",
    maxWidth: 1000,
    marginHorizontal: "auto",
    flex: 1,
  },

  title: {
    fontSize: 25,
    color: "#747575",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: isDesktop ? 6 : 10,
    marginBottom: 15,
    fontSize: isDesktop ? 14 : 16,
    width: isDesktop ? 200 : "100%",
  },
  picker: {
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    height: isDesktop ? 32 : 44,
    fontSize: isDesktop ? 14 : 16,
    width: isDesktop ? 200 : "100%",
  },
  button: {
    paddingVertical: isDesktop ? 6 : 10,
    paddingHorizontal: isDesktop ? 12 : 16,
    backgroundColor: "#3b82f6",
    borderRadius: 6,
    width: isDesktop ? 200 : "100%",
  },

  buttonText: {
    color: "white",
    fontSize: isDesktop ? 14 : 16,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#ff5159",
    paddingVertical: isDesktop ? 6 : 10,
    paddingHorizontal: isDesktop ? 12 : 16,
    borderRadius: 6,
    width: isDesktop ? 200 : "100%",
  },
});
