import { StyleSheet } from "react-native";
//モバイルスタイル
export const formStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 25,
    color: "#747575",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    color: "red",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
  },
  picker: {
    marginBottom: 10,
    backgroundColor: "#fff",
    height: 44,
    fontSize: 16,
    width: "100%",
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#ff5159",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
  },
  NoticeDeleteButton: {
    backgroundColor: "#ff5159",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 5,
  },
});

//デスクトップスタイル
export const desktopFormStyles = StyleSheet.create({
  input: {
    width: 200,
    padding: 6,
    fontSize: 14,
  },
  picker: {
    width: 200,
    height: 32,
    fontSize: 14,
  },
  button: {
    width: 200,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 14,
  },
  deleteButton: {
    width: 200,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
