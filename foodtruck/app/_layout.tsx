import { UserProvider, useUser } from "@/context/UserContext";
import { Stack, router } from "expo-router";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/* ---------------- ROOT ---------------- */

function Root() {
  const { setUser } = useUser();

  useEffect(() => {
    const initPush = async () => {
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
      const pushToken = tokenData.data;

      console.log("✅ Expo Push Token:", pushToken);

      /* 🔥 STORE TOKEN GLOBALLY */
      setUser((prev: any) => ({
        ...prev,
        pushToken,
      }));

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
        });
      }
    };

    initPush();

    const receivedSub =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="location" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

/* ---------------- PROVIDER ---------------- */

export default function RootLayout() {
  return (
    <UserProvider>
      <Root />
    </UserProvider>
  );
}