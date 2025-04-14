import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useNavigation } from "expo-router";

const ReadIndex = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    // Hide default back gesture + back button in header
    navigation.setOptions({
      gestureEnabled: false,
      headerBackVisible: false,
      headerLeft: () => null, // ✅ This hides any left icon including back icon
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select News Type</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/read/newspaper?type=global")}
      >
        <Text style={styles.buttonText}>Global News</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/read/newspaper?type=regional")}
      >
        <Text style={styles.buttonText}>Regional News</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReadIndex;

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0057D9",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
  },
  buttonText: { color: "white", textAlign: "center", fontWeight: "500" },
});
