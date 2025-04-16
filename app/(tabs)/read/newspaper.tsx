import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const newspapers = [
  { name: "Hindustan Times", icon: "newspaper-variant-outline", color: "#0077CC", bg: "#E6F0FA" },
  { name: "Indian Express", icon: "file-document-outline", color: "#00A86B", bg: "#E6F7F1" },
  { name: "The Hindu", icon: "book-open-outline", color: "#8A2BE2", bg: "#F1E6FB" },
  { name: "Times of India", icon: "format-title", color: "#FF6B6B", bg: "#FDEAEA" },
];

const NewspaperScreen = () => {
  const { type } = useLocalSearchParams();
  const router = useRouter();

  if (type === "regional") {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text style={styles.title}>Regional News</Text>
        <Text style={styles.info}>
          ⚠️ Sorry! No database detected for Regional News at the moment.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Preferred Newspaper</Text>
      <Text style={styles.subtitle}>Stay informed with trusted sources</Text>

      <View style={styles.cardContainer}>
        {newspapers.map((paper, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: paper.bg, borderColor: paper.color }]}
            onPress={() =>
              router.push(`/read/category?paper=${encodeURIComponent(paper.name)}`)
            }
          >
            <MaterialCommunityIcons
              name={paper.icon as any}
              size={30}
              color={paper.color}
              style={styles.icon}
            />
            <Text style={[styles.cardText, { color: paper.color }]}>
              {paper.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default NewspaperScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 25,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1a1a1a",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  cardContainer: {
    width: "100%",
    flex: 1,
    paddingVertical: 10,
  },
  
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    width: "100%",
    marginBottom: 20,
  },
  
  icon: {
    marginRight: 16,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "700",
  },
  info: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
    paddingHorizontal: 20,
    textAlign: "center",
  },
});
