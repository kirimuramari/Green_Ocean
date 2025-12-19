import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
});
