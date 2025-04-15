import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

export default function SavedScreen() {
  const [savedArticles, setSavedArticles] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const isFocused = useIsFocused();
  const router = useRouter();

  useEffect(() => {
    const loadSaved = async () => {
      const saved = await AsyncStorage.getItem("savedArticles");
      setSavedArticles(saved ? JSON.parse(saved) : []);
    };

    if (isFocused) loadSaved();
  }, [isFocused]);

  const removeArticle = async (articleId: string) => {
    const updated = savedArticles.filter((item) => item.articleId !== articleId);
    await AsyncStorage.setItem("savedArticles", JSON.stringify(updated));
    setSavedArticles(updated);
  };

  const confirmDelete = (articleId: string) => {
    Alert.alert("Remove Article", "Are you sure you want to remove this article?", [
      { text: "Cancel", style: "cancel" },
      { text: "Unsave", style: "destructive", onPress: () => removeArticle(articleId) },
    ]);
  };

  const uniqueCategories = ["All", ...new Set(savedArticles.map((a) => a.category))];

  const filtered =
    selectedCategory === "All"
      ? savedArticles
      : savedArticles.filter((a) => a.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📌 Saved Articles</Text>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Category:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(val: string) => setSelectedCategory(val)}
            style={styles.picker}
            dropdownIconColor="#0057D9"
          >
            {uniqueCategories.map((cat) => (
              <Picker.Item label={cat} value={cat} key={cat} />
            ))}
          </Picker>
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.articleId.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() =>
                router.push(
                  `/article/${item.articleId}?paper=${encodeURIComponent(item.newspaper)}`
                )
              }
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.meta}>
                📂 {item.category}   |   📰 {item.newspaper}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => confirmDelete(item.articleId)} style={styles.trashIcon}>
              <Ionicons name="trash-outline" size={22} color="#c0392b" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#f9fafe",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#444",
  },
  pickerWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d0d7de",
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  picker: {
    height: 45,
    color: "#1a1a1a",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f0ff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#0057D9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#002f6c",
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: "#37474F",
  },
  trashIcon: {
    marginLeft: 10,
    padding: 4,
  },
});
