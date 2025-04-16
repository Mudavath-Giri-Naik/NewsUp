import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";

const BASE_URL = "https://newsup-react-native-app-backend.onrender.com";

const capitalize = (text: string) =>
  text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getBorderColor = (index: number) => {
  const colors = ["#6C63FF", "#00C897", "#FF9F66", "#00A8E8", "#E94F37"];
  return colors[index % colors.length];
};

const CategoryScreen = () => {
  const { paper } = useLocalSearchParams();
  const [categoryCounts, setCategoryCounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/articles/categories/${encodeURIComponent(
            paper as string
          )}`
        );
        setCategoryCounts(res.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Articles in</Text>
        <View style={styles.paperBox}>
          <Text style={styles.paperName}>{capitalize(paper as string)}</Text>
        </View>
        
        <Text style={styles.subtitle}>
          Choose a category to dive into the latest stories.
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6C63FF" />
      ) : (
        categoryCounts.map((cat, index) => {
          const categoryName = cat._id ? capitalize(cat._id) : "Uncategorized";
          return (
            <TouchableOpacity
              key={`${categoryName}-${index}`}
              style={[
                styles.card,
                { borderLeftColor: getBorderColor(index) },
              ]}
              onPress={() =>
                router.push(
                  `/read/articles?paper=${encodeURIComponent(
                    paper as string
                  )}&category=${encodeURIComponent(cat._id)}`
                )
              }
            >
              <View style={styles.cardRow}>
                <Text style={styles.cardText}>{categoryName}</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{cat.count}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      )}
    </ScrollView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    width: "100%",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#222",
    letterSpacing: 0.5,
  },
  paperBox: {
    marginTop: 6,
    borderWidth: 1.5,
    borderColor: "#052afa",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  paperName: {
    fontSize: 20,
    fontWeight: "500",
    color: "#222",
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 12,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderWidth: 1,
    borderColor: "#000000",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#333",
  },
  countBadge: {
    borderColor: "#052afa",
    borderWidth: 1.5,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  countText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 13,
  },
});
