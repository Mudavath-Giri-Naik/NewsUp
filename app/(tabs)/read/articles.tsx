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
        Articles in {capitalize(category as string)}
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {titles.map((t, index) => (
            <TouchableOpacity
              key={t.articleId}
              style={styles.articleBox}
              onPress={() => handlePress(t.articleId)}
            >
              <View style={styles.articleHeader}>
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
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1a1a1a",
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  articleBox: {
    marginBottom: 5,
    paddingBottom: 10,
  },
  articleHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 2,
  },
  serial: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    width: 28,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "900",
    color: "#1a1a1a",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginTop: 10,
  },
});
