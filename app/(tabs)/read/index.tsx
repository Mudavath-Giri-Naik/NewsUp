import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const GLOBAL_POINTS = [
  "Top international headlines",
  "Curated from trusted sources",
  "Global News from all National Newspapers",
];

const REGIONAL_POINTS = [
  "Local and state-level news",
  "Focused on regional issues",
  "Regional News from all National Newspapers",
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

  const renderPoints = (points: string[], color: string) => (
    <View style={styles.pointsBox}>
      {points.map((point, index) => (
        <Text key={index} style={[styles.pointItem, { color }]}>
          • {point}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.newsText}>News</Text>
        <Text style={styles.upText}>Up</Text>
      </Text>

      <Text style={styles.subtitle}>
        Categorized into <Text style={styles.globalText}>Global</Text> and{" "}
        <Text style={styles.regionalText}>Regional</Text> sections for a more intuitive reading experience.
      </Text>

      <View style={styles.section}>
        <View style={styles.iconTitleRow}>
          <MaterialCommunityIcons name="earth" size={24} color="#0057D9" />
          <Text style={[styles.sectionTitle, styles.globalText]}>Global News</Text>
        </View>
        {renderPoints(GLOBAL_POINTS, "#0057D9")}
        <TouchableOpacity
          style={[styles.modernButton, { borderColor: "#0057D9" }]}
          onPress={() => router.push("/read/newspaper?type=global")}
        >
          <Text style={[styles.buttonText, { color: "#0057D9" }]}>Read Global News</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.iconTitleRow}>
          <MaterialIcons name="home" size={24} color="#00A86B" />
          <Text style={[styles.sectionTitle, styles.regionalText]}>Regional News</Text>
        </View>
        {renderPoints(REGIONAL_POINTS, "#00A86B")}
        <TouchableOpacity
          style={[styles.modernButton, { borderColor: "#00A86B" }]}
          onPress={() => router.push("/read/newspaper?type=regional")}
        >
          <Text style={[styles.buttonText, { color: "#00A86B" }]}>Read Regional News</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReadIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 80,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 0,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    flexDirection: "row",
    marginBottom: 10,
  },
  newsText: {
    color: "#000",
    fontWeight: "bold",
  },
  upText: {
    color: "#00BFFF",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 17,
    color: "#444",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
    lineHeight: 24,
  },
  section: {
    width: "100%",
    alignItems: "center",
    marginBottom: 35,
  },
  iconTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  globalText: {
    color: "#0057D9",
  },
  regionalText: {
    color: "#00A86B",
  },
  pointsBox: {
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  pointItem: {
    fontSize: 16,
    marginVertical: 4,
  },
  modernButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 2,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
  },
});
