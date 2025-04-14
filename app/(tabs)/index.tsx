// app/index.tsx
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NewsUp</Text>
      <Text style={styles.subtitle}>
        Your personalized news navigator for staying informed with the latest stories from India's top newspapers.
      </Text>

      <View style={styles.card}>
        <Text style={styles.featureTitle}>Features</Text>
        <Text style={styles.feature}>✅ Access articles from major Indian newspapers</Text>
        <Text style={styles.feature}>✅ Filter by regional or global news</Text>
        <Text style={styles.feature}>✅ Browse by categories like politics, business, sports</Text>
        <Text style={styles.feature}>✅ Save articles to read later</Text>
        <Text style={styles.feature}>✅ Track reading history</Text>
        <View style={styles.button}>
          <Button title="Start Reading" color="#fff" onPress={() => router.push("/read")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#f7f9fc" },
  title: { fontSize: 36, fontWeight: "bold", textAlign: "center", color: "#1e3a8a" },
  subtitle: { fontSize: 16, textAlign: "center", marginVertical: 20, color: "#333" },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 20, elevation: 5 },
  featureTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  feature: { fontSize: 16, marginVertical: 4 },
  button: {
    backgroundColor: "#1e3a8a",
    borderRadius: 6,
    marginTop: 20,
    overflow: "hidden",
  },
});
