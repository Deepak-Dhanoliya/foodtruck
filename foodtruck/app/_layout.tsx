import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="otp" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="location" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </UserProvider>
  );
}
