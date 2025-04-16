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
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
    Alert.alert(
      "🗑️ Remove Article",
      "Are you sure you want to remove this article from Saved?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Unsave",
          style: "destructive",
          onPress: () => removeArticle(articleId),
        },
      ]
    );
  };

  const uniqueCategories = ["All", ...new Set(savedArticles.map((a) => a.category))];

  const filtered =
    selectedCategory === "All"
      ? savedArticles
      : savedArticles.filter((a) => a.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="bookmark-check-outline" size={26} color="#0057D9" />
        <Text style={styles.title}>Saved Articles</Text>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Category</Text>
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
        ListEmptyComponent={
          <Text style={styles.emptyText}>No saved articles in this category.</Text>
        }
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
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <MaterialCommunityIcons name="file-document-outline" size={16} color="#37474F" />
                  <Text style={styles.metaText}>{item.category}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialCommunityIcons name="newspaper-variant-outline" size={16} color="#37474F" />
                  <Text style={styles.metaText}>{item.newspaper}</Text>
                </View>
              </View>
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
    paddingTop: 50,
    backgroundColor: "#f9fafe",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginLeft: 10,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  pickerWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d0d7de",
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  picker: {
    height: 55,
    color: "#1a1a1a",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6f0ff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#002f6c",
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: "row",
    gap: 10,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginRight: 10,
  },
  metaText: {
    fontSize: 14,
    color: "#37474F",
  },
  trashIcon: {
    marginLeft: 12,
    padding: 4,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 40,
  },
});
