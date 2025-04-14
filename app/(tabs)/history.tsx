// app/(tabs)/history.tsx
import { View, Text, StyleSheet } from "react-native";

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Reading History</Text>
      {/* Display history grouped by dates like 14-04-2025 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 70, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
