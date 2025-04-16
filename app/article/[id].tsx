import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Share,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { Ionicons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://newsup-react-native-app-backend.onrender.com";

const capitalizeWords = (str: string) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

const ArticleDetails = () => {
  const { id, paper } = useLocalSearchParams<{ id: string; paper: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/articles/by-id/${encodeURIComponent(paper!)}/${encodeURIComponent(id!)}`
        );
        setArticle(res.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id && paper) fetchArticle();
  }, [id, paper]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this article: ${article?.title}`,
      });
    } catch (error) {
      console.error("Error sharing article:", error);
    }
  };

  const handleSave = async () => {
    if (!article) return;

    const existing = await AsyncStorage.getItem("savedArticles");
    let saved = existing ? JSON.parse(existing) : [];

    const isAlreadySaved = saved.some(
      (a: any) => a.articleId === article.articleId && a.newspaper === paper
    );
    if (!isAlreadySaved) {
      saved.push({ ...article, newspaper: paper });
      await AsyncStorage.setItem("savedArticles", JSON.stringify(saved));
    }

    Alert.alert("Saved!", "Article has been saved successfully.", [
      { text: "OK", style: "cancel" },
    ]);
  };

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

  const newspaper = capitalizeWords(paper || "");
  const category = capitalizeWords(article.category || "");
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString()
    : null;

  const pointList = article.points
    ?.split(".")
    .map((p: string) => p.trim())
    .filter((p: string) => p.length > 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{article.title}</Text>

      {/* Meta + Action Row */}
      <View style={styles.metaActionRow}>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>
            <Feather name="user" size={14} /> {newspaper}
          </Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.metaText}>
            <Feather name="tag" size={14} /> {category}
          </Text>
          {formattedDate && (
            <>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.metaText}>
                <Feather name="calendar" size={14} /> {formattedDate}
              </Text>
            </>
          )}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
            <Ionicons name="share-social-outline" size={20} color="#444" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
            <Ionicons name="bookmark-outline" size={20} color="#444" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionHeading}>Description</Text>
      <Text style={styles.paragraph}>{article.description}</Text>

      {pointList?.length > 0 && (
        <>
          <Text style={styles.sectionHeading}>Key Points</Text>
          {pointList.map((point: string, index: number) => (
            <Text key={index} style={styles.bullet}>
              {index + 1}. {point}.
            </Text>
          ))}
        </>
      )}

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
    backgroundColor: "#ffffff",
    padding: 20,
    paddingBottom: 60,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#1c1c1e",
    marginBottom: 12,
    lineHeight: 40,
  },
  metaActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
    flexShrink: 1,
  },
  metaText: {
    fontSize: 13,
    color: "#6e6e73",
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    fontSize: 14,
    color: "#888",
    marginHorizontal: 4,
  },
  actionRow: {
    flexDirection: "row",
    gap: 20,
  },
  iconButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#f1f1f1",
  },
  sectionHeading: {
    fontSize: 23,
    fontWeight: "900",
    marginVertical: 16,
    color: "#222",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: "#333",
    fontFamily: "serif",
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    marginBottom: 8,
  },
  glossaryItem: {
    marginBottom: 14,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: "#0077cc",
  },
  term: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  definition: {
    fontSize: 15,
    color: "#555",
    marginTop: 4,
    lineHeight: 22,
  },
});
