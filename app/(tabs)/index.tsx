import { supabase } from "@/lib/supabaseClient";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet as RNStyleSheet,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

export default function Home() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const [notices, setNotices] = useState([]);

  const flattenStyle = (baseStyle: any, extraStyle?: any) =>
    RNStyleSheet.flatten([baseStyle, extraStyle]);
  useEffect(() => {
    const fetchNotices = async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      if (!error) setNotices(data);
    };
    fetchNotices();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ marginBottom: 16 }}>
        {notices.map((n) => (
          <div key={n.id} style={styles.noticeContainer}>
            <Text style={styles.noticesText}>{n.created_at.split("T")[0]}</Text>
            <Text style={styles.noticesText}>{n.title}</Text>
          </div>
        ))}
      </View>
      <Text style={styles.title}>閲覧</Text>

      <View style={[styles.grid, isDesktop && styles.gridDesktop]}>
        <Link href="/Color" asChild>
          <TouchableOpacity
            style={flattenStyle(
              styles.button,
              isDesktop && styles.buttonDesktop
            )}
          >
            <Ionicons
              name="list"
              size={isDesktop ? 48 : 32}
              color="#f7f9ff"
              style={flattenStyle({})}
            />
            <Text style={styles.buttonText}>一覧表示</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/SetColor" asChild>
          <TouchableOpacity
            style={flattenStyle(
              styles.button,
              isDesktop && styles.buttonDesktop
            )}
          >
            <Ionicons
              name="albums"
              size={isDesktop ? 48 : 32}
              color="#f7f9ff"
              style={flattenStyle({})}
            />
            <Text style={styles.buttonText}>セット品表示</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/Purchased" asChild>
          <TouchableOpacity
            style={flattenStyle(
              styles.button,
              isDesktop && styles.buttonDesktop
            )}
          >
            <Ionicons
              name="checkmark-done"
              size={isDesktop ? 48 : 32}
              color="#f7f9ff"
              style={flattenStyle({})}
            />
            <Text style={styles.buttonText}>購入済み表示</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <Text style={styles.title}>編集・登録</Text>
      <View style={[styles.grid, isDesktop && styles.gridDesktop]}>
        <Link href="/edit" asChild>
          <TouchableOpacity
            style={flattenStyle(
              styles.button,
              isDesktop && styles.buttonDesktop
            )}
          >
            <Ionicons
              name="create-outline"
              size={isDesktop ? 48 : 32}
              color="#f7f9ff"
              style={flattenStyle({})}
            />
            <Text style={styles.buttonText}>データ編集</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/ColorForm" asChild>
          <TouchableOpacity
            style={flattenStyle(
              styles.button,
              isDesktop && styles.buttonDesktop
            )}
          >
            <Ionicons
              name="add-circle-outline"
              size={isDesktop ? 48 : 32}
              color="#f7f9ff"
              style={flattenStyle({})}
            />
            <Text style={styles.buttonText}>商品登録</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/add-set-name" asChild>
          <TouchableOpacity
            style={flattenStyle(
              styles.button,
              isDesktop && styles.buttonDesktop
            )}
          >
            <Ionicons
              name="duplicate-outline"
              size={isDesktop ? 48 : 32}
              color="#f7f9ff"
              style={flattenStyle({})}
            />
            <Text style={styles.buttonText}>セット登録</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <Text style={styles.title}>設定</Text>
      <View style={[styles.grid, isDesktop && styles.gridDesktop]}>
        <Link href="/NoticeForm" asChild>
          <TouchableOpacity
            style={flattenStyle(
              styles.button,
              isDesktop && styles.buttonDesktop
            )}
          >
            <Ionicons
              name="settings-outline"
              size={isDesktop ? 48 : 32}
              color="#f7f9ff"
              style={flattenStyle({})}
            />
            <Text style={styles.buttonText}>設定</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",

    backgroundColor: "white",
  },
  noticeContainer: {
    padding: 8,
    marginBottom: 4,
    borderStyle: "dotted",
    borderColor: "#747575",
    borderRadius: 12,
  },
  noticesText: {
    color: "#434656",
    textdecorationline: "underline",
    fontSize: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    color: "#747575",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  gridDesktop: {
    justifyContent: "flex-start",
    gap: 20,
    maxWidth: 900,
  },
  button: {
    backgroundColor: "#a2d2ff",
    width: 102,
    height: 102,
    borderRadius: 12,
    margin: 3.3,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDesktop: {
    width: 150,
    height: 150,
  },
  buttonText: {
    color: "#434656",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },
});
