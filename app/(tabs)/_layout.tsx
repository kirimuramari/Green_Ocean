import { Colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function Layout() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.text,
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        tabBarStyle: { backgroundColor: theme.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Color"
        options={{
          title: "一覧",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="SetColor"
        options={{
          title: "セット品表示",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="albums" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Purchased"
        options={{
          title: "購入済み表示",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-done" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="edit"
        options={{
          title: "データ編集",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ColorForm"
        options={{
          title: "商品登録",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-set-name"
        options={{
          title: "セット登録",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="duplicate-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
