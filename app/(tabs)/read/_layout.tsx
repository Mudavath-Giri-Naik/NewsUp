import { Stack } from "expo-router";

export default function ReadLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false, }} />
      <Stack.Screen name="newspaper" options={{ title: "Select Newspaper" }} />
      <Stack.Screen name="category" options={{ title: "Select Category" }} />
      <Stack.Screen name="articles" options={{ title: "Articles List" }} />
      
    </Stack>
  );
}
