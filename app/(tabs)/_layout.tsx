import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "#ffffff", // 🔵 background color
        },
        headerTintColor: "#080808",       // 🔠 text/icon color
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
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
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0057D9",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 55,
        },
      })}
    >
      <Tabs.Screen name="index" options={{headerShown: false }} />
      <Tabs.Screen name="read" options={{ headerShown: false }} /> {/* 👈 hides top header for read flow */}
      <Tabs.Screen name="saved" options={{ headerShown: false }} />
      <Tabs.Screen name="history" options={{ headerShown: false }} />
    </Tabs>
  );
}
