import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
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
  const colors = ["#FF6B6B", "#4ECDC4", "#5D5FEF", "#FFB84C", "#1DD1A1"];
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
    <View style={styles.container}>
      <Text style={styles.title}>Categories in {paper}</Text>
      <Text style={styles.subtitle}>
        Select a news category to explore articles
      </Text>

      {loading && <ActivityIndicator size="large" color="#000" />}

      {!loading &&
        categoryCounts.map((cat, index) => {
          const categoryName = cat._id ? capitalize(cat._id) : "Uncategorized";
          return (
            <TouchableOpacity
              key={`${categoryName}-${index}`}
              style={[
                styles.card,
                { borderColor: getBorderColor(index) },
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
        })}
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 14,
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
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: {
    color: "#1a1a1a",
    fontSize: 18,
    fontWeight: "600",
  },
  countBadge: {
    backgroundColor: "#0057D9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
