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
import { useLocalSearchParams, useRouter } from "expo-router";

const BASE_URL = "https://newsup-react-native-app-backend.onrender.com";

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

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
    router.push(
      `/article/${articleId}?paper=${encodeURIComponent(paper as string)}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Articles in{" "}
        <Text style={styles.highlight}>{capitalize(category as string)}</Text>
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#333" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {titles.map((t, index) => (
            <TouchableOpacity
              key={t.articleId}
              onPress={() => handlePress(t.articleId)}
              style={styles.articleTouchable}
            >
              <View style={styles.articleRow}>
                <Text style={styles.serial}>{index + 1}.</Text>
                <Text style={styles.title}>{t.title}</Text>
              </View>
              <View style={styles.separator} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ArticlesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  highlight: {
    color: "#0077cc",
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  articleTouchable: {
    paddingVertical: 12,
  },
  articleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  serial: {
    fontSize: 16,
    fontWeight: "600",
    color: "#888",
    width: 28,
    textAlign: "right",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    lineHeight: 24,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginTop: 10,
  },
});
