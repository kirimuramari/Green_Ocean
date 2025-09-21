import { Slot, Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function RootLayout() {
  return <Slot />;
  <View style={StyleSheet.container}>
    <Stack screenOptions={{ headerShown: false }} />
  </View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
});
