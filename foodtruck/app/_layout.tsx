import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    const sub = Notifications.addNotificationReceivedListener(() => {
      console.log("Notification received");
    });

    return () => sub.remove();
  }, []);
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
