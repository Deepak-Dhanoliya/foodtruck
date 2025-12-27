import { UserProvider } from "@/context/UserContext";
import { Stack, router } from "expo-router";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";

/* ---------------- NOTIFICATION CONFIG ---------------- */

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/* ---------------- ROOT LAYOUT ---------------- */

export default function RootLayout() {
  useEffect(() => {
    registerForPushNotifications();

    /* App in foreground */
    const receivedSub =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

    /* App opened from notification tap */
    const responseSub =
      Notifications.addNotificationResponseReceivedListener(() => {
        router.push("/notification");
      });

    return () => {
      receivedSub.remove();
      responseSub.remove();
    };
  }, []);

  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="otp" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="location" />
        <Stack.Screen name="notification" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </UserProvider>
  );
}

/* ---------------- REGISTER PUSH ---------------- */

async function registerForPushNotifications() {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Notification permission denied");
      return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    console.log("Expo Push Token:", tokenData.data);

    /* Android channel (IMPORTANT) */
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }
  } catch (err) {
    console.log("Push registration error", err);
  }
}