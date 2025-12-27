import admin from "firebase-admin";

/* INIT FIREBASE ADMIN (ONLY ONCE) */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

/* SEND PUSH NOTIFICATION */
export async function sendPushNotification(
  token: string,
  title: string,
  body: string
) {
  try {
    await admin.messaging().send({
      token,
      notification: {
        title,
        body,
      },
      android: {
        priority: "high",
      },
    });

    console.log("Notification sent successfully");
  } catch (error) {
    console.error("FCM error:", error);
  }
}