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
import { Ionicons } from "@expo/vector-icons";
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

    const isAlreadySaved = saved.some((a: any) => a.articleId === article.articleId && a.newspaper === paper);
    if (!isAlreadySaved) {
      saved.push({ ...article, newspaper: paper });
      await AsyncStorage.setItem("savedArticles", JSON.stringify(saved));
    }

    Alert.alert("Saved!", "Article has been saved successfully.", [{ text: "OK", style: "cancel" }]);
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

      <View style={styles.topRow}>
        <View style={styles.badgesContainer}>
          <View style={styles.badge}><Text style={styles.badgeText}>📰 {newspaper}</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>📂 {category}</Text></View>
          {formattedDate && <View style={styles.badge}><Text style={styles.badgeText}>📅 {formattedDate}</Text></View>}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
            <Ionicons name="share-social-outline" size={20} color="#0057D9" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
            <Ionicons name="bookmark-outline" size={20} color="#0057D9" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionHeading}>Description</Text>
      <Text style={styles.text}>{article.description}</Text>

      <Text style={styles.sectionHeading}>Points</Text>
      {pointList?.map((point: string, index: number) => (
        <Text key={index} style={styles.point}>
          {index + 1}. {point}.
        </Text>
      ))}

      {article.glossary && Object.keys(article.glossary).length > 0 && (
        <>
          <Text style={styles.sectionHeading}>Glossary</Text>
          {Object.entries(article.glossary).map(([term, definition]) => (
            <View key={term} style={styles.glossaryItem}>
              <Text style={styles.term}>• {term}</Text>
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
  container: { padding: 20, paddingBottom: 60 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  topRow: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", marginBottom: 16 },
  badgesContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8, flex: 1 },
  badge: { backgroundColor: "#eef2f7", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginRight: 6, marginBottom: 6 },
  badgeText: { fontSize: 13, color: "#333", fontWeight: "500" },
  actionRow: { flexDirection: "row", alignItems: "center", gap: 10, marginLeft: 10 },
  iconButton: { padding: 6 },
  sectionHeading: { fontSize: 18, fontWeight: "600", marginTop: 1, marginBottom: 6 },
  text: { fontSize: 16, lineHeight: 22, marginBottom: 10 },
  point: { fontSize: 16, marginBottom: 6, lineHeight: 22 },
  glossaryItem: { marginBottom: 6 },
  term: { fontWeight: "bold", fontSize: 16 },
  definition: { fontSize: 15, color: "#333", marginLeft: 5 },
});
