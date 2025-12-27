import { Router } from "express";
import User from "../models/User";
import { sendPushNotification } from "../utils/sendNotification";

const router = Router();

/* ================= SIGNUP ================= */
router.post("/signup", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

/* ================= CHECK MOBILE (LOGIN) ================= */
router.post("/check-mobile", async (req, res) => {
  try {
    const { mobile, fcmToken } = req.body;

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.json({ exists: false });
    }

    /* SAVE FCM TOKEN IF PROVIDED */
    if (fcmToken) {
      user.fcmToken = fcmToken;
      await user.save();

      /* SEND LOGIN NOTIFICATION */
      await sendPushNotification(
        fcmToken,
        "Login Successful 🎉",
        "Welcome back! You have logged in successfully."
      );
    }

    res.json({
      exists: true,
      userId: user._id,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

/* ================= FETCH USER BY MOBILE ================= */
router.get("/by-mobile/:mobile", async (req, res) => {
  const user = await User.findOne({ mobile: req.params.mobile });
  res.json(user);
});

/* ================= SAVE LOCATION ================= */
router.post("/location", async (req, res) => {
  const { userId, location } = req.body;

  await User.findByIdAndUpdate(userId, { location });

  res.json({ success: true });
});

export default router;
