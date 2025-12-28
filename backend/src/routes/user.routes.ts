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

    /* SAVE PUSH TOKEN IF PROVIDED */
    // if (fcmToken) {
    //   user.pushToken = fcmToken;
    //   await user.save();

    //   /* SEND LOGIN NOTIFICATION */
    //   // await sendPushNotification(
    //   //   fcmToken,
    //   //   "Login Successful 🎉",
    //   //   "Welcome back! You have logged in successfully."
    //   // );
    // }

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

router.post("/save-token", async (req, res) => {
  try {
    const { mobile, pushToken } = req.body;

    if (!mobile || !pushToken) {
      return res.status(400).json({ success: false });
    }

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(404).json({ success: false });
    }
    console.log("this is push token ", pushToken);
    user.pushToken = pushToken;
    await user.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Save token error:", err);
    res.status(500).json({ success: false });
  }
});

router.post("/send-login-notification", async (req, res) => {
  const { mobile } = req.body;

  const user = await User.findOne({ mobile });

  if (!user?.pushToken) {
    return res.json({ success: false, message: "No push token" });
  }

  await sendPushNotification(
    user.pushToken,
    "Login Successful 🎉",
    "Welcome back to FoodTruck!"
  );

  res.json({ success: true });
});

export default router;
