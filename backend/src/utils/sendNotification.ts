import fetch from "node-fetch";

export async function sendPushNotification(
  expoPushToken: string,
  title: string,
  body: string
) {
  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: expoPushToken,   // ✅ Expo token
      sound: "default",
      title,
      body,
    }),
  });

  const data = await response.json();
  console.log("EXPO RESPONSE 👉", data);
  return data;
}