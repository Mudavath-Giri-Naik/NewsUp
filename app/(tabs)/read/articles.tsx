import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";

const BASE_URL = "https://newsup-react-native-app-backend.onrender.com";

const ArticlesScreen = () => {
  const { paper, category } = useLocalSearchParams();
  const [titles, setTitles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/articles/titles/${encodeURIComponent(
            paper as string
          )}/${encodeURIComponent(category as string)}`
        );
        setTitles(res.data);
      } catch (error) {
        console.error("Error fetching titles", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTitles();
  }, []);

  const handlePress = (articleId: number) => {
    router.push(`/article/${articleId}?paper=${encodeURIComponent(paper as string)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Articles in {category}</Text>
      {loading && <ActivityIndicator size="large" color="#000" />}
      {titles.map((t) => (
        <TouchableOpacity
          key={t.articleId}
          style={styles.titleBox}
          onPress={() => handlePress(t.articleId)}
        >
          <Text>{t.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ArticlesScreen;

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  heading: { fontSize: 20, fontWeight: "bold", marginVertical: 12, textAlign: "center" },
  titleBox: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
});
