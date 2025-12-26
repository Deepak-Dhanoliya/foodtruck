import { Router } from "express";
import User from "../models/User";

const router = Router();

/* SIGNUP */
router.post("/signup", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

/* CHECK MOBILE (LOGIN STEP 1) */
router.post("/check-mobile", async (req, res) => {
  const { mobile } = req.body;

  const user = await User.findOne({ mobile });

  if (!user) {
    return res.json({ exists: false });
  }

  res.json({ exists: true, userId: user._id });
});

/* FETCH USER BY MOBILE */
router.get("/by-mobile/:mobile", async (req, res) => {
  const user = await User.findOne({ mobile: req.params.mobile });
  res.json(user);
});

/* SAVE LOCATION */
router.post("/location", async (req, res) => {
  const { userId, location } = req.body;
  await User.findByIdAndUpdate(userId, { location });
  res.json({ success: true });
});

// SAVE PUSH TOKEN
router.post("/save-token", async (req, res) => {
  const { mobile, pushToken } = req.body;

  await User.updateOne({ mobile }, { $set: { pushToken } });

  res.json({ success: true });
});

export default router;
