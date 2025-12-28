import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Props = {
  loading: boolean;
  error?: string | null;
  hasData: boolean;
  emptyMessage?: string;
};

export const ListStatus = ({
  loading,
  error,
  hasData,
  emptyMessage = "データがありません。",
}: Props) => {
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>読み込み中...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>エラー:{error}</Text>
      </View>
    );
  }
  if (!hasData) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>{emptyMessage}</Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  center: {
    paddingVertical: 32,
    alignItems: "center",
  },
  text: {
    marginTop: 12,
    opacity: 0.7,
  },
});
