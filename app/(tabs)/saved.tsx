// app/(tabs)/saved.tsx
import { View, Text, StyleSheet } from "react-native";

export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📌 Saved Articles</Text>
      {/* Show list of saved articles here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 70, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
