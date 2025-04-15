import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  SafeAreaView, // ✅
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const points = [
  { text: "Save hours of note-making.", bgColor: "#e0f2fe" },
  { text: "Made for learners, not just readers.", bgColor: "#fef9c3" },
  { text: "One app, your daily current affairs hub.", bgColor: "#f0fdf4" },
  { text: "Master current affairs. Crack any exam.", bgColor: "#fce7f3" },
  { text: "No ads. No distractions. Just learning.", bgColor: "#fff7ed" },
  { text: "Big news, bite-sized for busy minds.", bgColor: "#ede9fe" },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* App Title */}
        <Text style={styles.appTitle}>
          <Text style={styles.newsText}>News</Text>
          <Text style={styles.upText}>Up</Text>
        </Text>

        <Text style={styles.description}>
          The smart way to master current affairs.
        </Text>

        <Image
          source={require("../../assets/images/HomeImage.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.taglineBox}>
          {points.map((item, index) => (
            <View
              key={index}
              style={[styles.taglineItem, { backgroundColor: item.bgColor }]}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color="#1e3a8a"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.taglineText}>{item.text}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/read")}
        >
          <Text style={styles.buttonText}>Start Reading</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  appTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 4,
  },
  newsText: {
    color: "#111212",
  },
  upText: {
    color: "#0270f5",
  },
  description: {
    fontSize: 16,
    color: "#444",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  taglineBox: {
    alignSelf: "stretch",
    borderColor: "#38bdf8",
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    marginBottom: 30,
    marginTop: 1,
  },
  taglineItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  taglineText: {
    fontSize: 16,
    color: "#1e3a8a",
    flexShrink: 1,
  },
  image: {
    width: "100%",
    height: 270,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1e3a8a",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
