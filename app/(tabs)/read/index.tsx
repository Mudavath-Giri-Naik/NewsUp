import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";

const GLOBAL_POINTS = [
  "Top international headlines",
  "Curated from trusted sources",
  "Updated daily from National Newspapers",
];

const REGIONAL_POINTS = [
  "Local and state-level news",
  "Focused on regional issues",
  "Timely updates from National sources",
];

const ReadIndex = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      headerBackVisible: false,
      headerLeft: () => null,
    });
  }, [navigation]);

  const renderPoints = (points: string[]) => (
    <View style={styles.pointsBox}>
      {points.map((point, index) => (
        <Text key={index} style={styles.pointItem}>
          • {point}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NewsUp</Text>
      <Text style={styles.subtitle}>
        We’ve categorized a newspaper into Global and Regional sections for a better reading experience.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌍 Global News</Text>
        {renderPoints(GLOBAL_POINTS)}
        <TouchableOpacity
          style={[styles.modernButton, { backgroundColor: "#0057D9" }]}
          onPress={() => router.push("/read/newspaper?type=global")}
        >
          <Text style={styles.buttonText}>Read Global News</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏠 Regional News</Text>
        {renderPoints(REGIONAL_POINTS)}
        <TouchableOpacity
          style={[styles.modernButton, { backgroundColor: "#00A86B" }]}
          onPress={() => router.push("/read/newspaper?type=regional")}
        >
          <Text style={styles.buttonText}>Read Regional News</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReadIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 0,
  },
  section: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  pointsBox: {
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  pointItem: {
    textAlign: "left",
    width: "90%",
    fontSize: 15,
    color: "#444",
    marginVertical: 4,
  },
  modernButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
