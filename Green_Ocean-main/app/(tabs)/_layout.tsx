import { useState, useEffect } from "react";
import { Dimensions, Platform, useColorScheme } from "react-native";
import { Tabs, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/theme/colors";

export default function Layout() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  //初期判定
  const [isDesktop, setIsDesktop] = useState(
    Platform.OS === "web" && Dimensions.get("window").width >= 1024
  );
  //画面サイズが変わったら再計算
  useEffect(() => {
    const onChange = ({ window }: { window: any }) => {
      setIsDesktop(Platform.OS === "web" && window.width >= 1024);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);
  // PC の場合は Tabs を返さず Stack を返す
  if (isDesktop) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Color" />
        <Stack.Screen name="SetColor" />
        <Stack.Screen name="Purchased" />
        <Stack.Screen name="edit" />
        <Stack.Screen name="ColorForm" />
        <Stack.Screen name="add-set-name" />
      </Stack>
    );
  }
  // スマホ/タブレットは Tabs を表示

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.text,
        headerStyle: { backgroundColor: theme.background },
        headerShown: false,
        headerTintColor: theme.text,
        tabBarStyle: {
          backgroundColor: theme.background,
        },
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
