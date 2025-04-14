import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const newspapers = ["Hindustan Times", "Indian Express", "The Hindu", "Times of India"];

const NewspaperScreen = () => {
  const { type } = useLocalSearchParams();
  const router = useRouter();

  if (type === "regional") {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>No database detected for Regional News.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Newspaper</Text>
      {newspapers.map((paper) => (
        <TouchableOpacity
          key={paper}
          style={styles.button}
          onPress={() =>
            router.push(`/read/category?paper=${encodeURIComponent(paper)}`)
          }
        >
          <Text style={styles.buttonText}>{paper}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NewspaperScreen;

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  heading: { fontSize: 20, fontWeight: "bold", marginVertical: 12, textAlign: "center" },
  button: { backgroundColor: "#0057D9", padding: 12, borderRadius: 10, marginVertical: 6 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "500" },
  info: { fontSize: 16, marginVertical: 20, textAlign: "center", color: "gray" },
});
