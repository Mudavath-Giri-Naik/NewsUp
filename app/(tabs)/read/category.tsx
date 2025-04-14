import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";

const BASE_URL = "https://newsup-react-native-app-backend.onrender.com";

const CategoryScreen = () => {
  const { paper } = useLocalSearchParams();
  const [categoryCounts, setCategoryCounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/articles/categories/${encodeURIComponent(paper as string)}`
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
      <Text style={styles.heading}>Select Category from {paper}</Text>
      {loading && <ActivityIndicator size="large" color="#000" />}
      {categoryCounts.map((cat, index) => (
        <TouchableOpacity
          key={`${cat._id || "uncategorized"}-${index}`}
          style={styles.button}
          onPress={() =>
            router.push(
              `/read/articles?paper=${encodeURIComponent(paper as string)}&category=${encodeURIComponent(cat._id)}`
            )
          }
        >
          <Text style={styles.buttonText}>
            {cat._id || "Uncategorized"} - {cat.count}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  heading: { fontSize: 20, fontWeight: "bold", marginVertical: 12, textAlign: "center" },
  button: { backgroundColor: "#0057D9", padding: 12, borderRadius: 10, marginVertical: 6 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "500" },
});
