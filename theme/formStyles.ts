import { StyleSheet } from "react-native";
//モバイルスタイル
export const formStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 25,
    //marginTop: 20,
    marginBottom: 10,
    display: "flex",
  },
  message: {
    fontSize: 15,
    color: "red",
    marginBottom: 10,
  },

  input: {
    borderWidth: 2,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    width: "auto",
    alignSelf: "flex-start",
  },
  picker: {
    marginBottom: 10,
    backgroundColor: "#fff",
    height: 44,
    fontSize: 16,
    width: "auto",
    alignSelf: "flex-start",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 5,
    width: "auto",
    alignSelf: "flex-start",
  },
  halfButton: {
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#d1d5db",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    alignSelf: "flex-start",
  },
  cancelButtonText: {
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
    width: "auto",
    alignSelf: "flex-start",
  },
  NoticeDeleteButton: {
    backgroundColor: "#ff5159",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 5,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginTop: 20,
  },
  arrowButton: {
    marginTop: 5,
    marginRight: 4,
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    cursor: "pointer",
    alignItems: "center",
    display: "flex",
    gap: 1,
    minWidth: 200,
    justifyContent: "center",
    width: "auto",
    alignSelf: "flex-start",
  },
  buttonText: {
    fontSize: 14,
  },
  deleteButton: {
    width: 200,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  subContainer: {
    marginHorizontal: "auto",
  },
});
