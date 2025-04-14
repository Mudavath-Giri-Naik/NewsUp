import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

const BASE_URL = "https://newsup-react-native-app-backend.onrender.com";

const ArticleDetails = () => {
  const { id, paper } = useLocalSearchParams<{ id: string; paper: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/articles/by-id/${encodeURIComponent(
            paper!
          )}/${encodeURIComponent(id!)}`
        );
        setArticle(res.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id && paper) {
      fetchArticle();
    }
  }, [id, paper]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!article) {
    return (
      <View style={styles.centered}>
        <Text>Article not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.meta}>
        Newspaper: {article.newspaper} | Category: {article.category}
      </Text>
      <Text style={styles.sectionHeading}>Description</Text>
      <Text style={styles.text}>{article.description}</Text>

      <Text style={styles.sectionHeading}>Points</Text>
      <Text style={styles.text}>{article.points}</Text>

        {article.glossary && Object.keys(article.glossary).length > 0 && (
    <>
        <Text style={styles.sectionHeading}>Glossary</Text>
        {Object.entries(article.glossary).map(([term, definition]) => (
        <View key={term} style={styles.glossaryItem}>
            <Text style={styles.term}>{term}</Text>
            <Text style={styles.definition}>{String(definition)}</Text>
        </View>
        ))}
    </>
    )}

    </ScrollView>
  );
};

export default ArticleDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  meta: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  glossaryItem: {
    marginBottom: 10,
  },
  term: {
    fontWeight: "bold",
    fontSize: 16,
  },
  definition: {
    fontSize: 15,
    color: "#333",
    marginLeft: 5,
  },
});
