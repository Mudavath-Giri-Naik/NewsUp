import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const newspapers = [
  "Hindustan Times",
  "Indian Express",
  "The Hindu",
  "Times of India",
];

const NewspaperScreen = () => {
  const { type } = useLocalSearchParams();
  const router = useRouter();

  if (type === "regional") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Regional News</Text>
        <Text style={styles.info}>
          ⚠️ Sorry! No database detected for Regional News at the moment.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Your Preferred Newspaper</Text>
      <Text style={styles.subtitle}>Stay informed with trusted sources</Text>

      {newspapers.map((paper, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, borderColors[index % borderColors.length]]}
          onPress={() =>
            router.push(`/read/category?paper=${encodeURIComponent(paper)}`)
          }
        >
          <Text style={styles.cardText}>{paper}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default NewspaperScreen;

// Border styles for colorful borders without background
const borderColors = [
  { borderColor: "#0077CC" },
  { borderColor: "#00A86B" },
  { borderColor: "#8A2BE2" },
  { borderColor: "#FF6B6B" },
];

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: "#f9f9f9",
    alignItems: "center", 
    marginTop: 8,
  },
  
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 2,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
    alignItems: "center",
  },
  cardText: {
    color: "#1a1a1a",
    fontSize: 20,
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
    paddingHorizontal: 20,
    textAlign: "center",
  },
});
