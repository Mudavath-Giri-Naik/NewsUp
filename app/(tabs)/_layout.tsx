import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

        switch (route.name) {
          case "index":
            iconName = "home-outline";
            break;
          case "read":
            iconName = "book-outline";
            break;
          case "saved":
            iconName = "bookmark-outline";
            break;
          case "history":
            iconName = "time-outline";
            break;
        }

        return {
          headerShown: false,
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTintColor: "#080808",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={iconName} size={size} color={color} />
          ),
          tabBarActiveTintColor: "#0057D9",
          tabBarInactiveTintColor: "gray",
          tabBarStyle:
            route.name === "index"
              ? { display: "none" } // Hide tab bar only on Home
              : { height: 55 },
        };
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="read" options={{ title: "Read Now" }} />
      <Tabs.Screen name="saved" options={{ title: "Saved Articles" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
    </Tabs>
  );
}
