const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB (local or Atlas)
mongoose.connect("mongodb://127.0.0.1:27017/foodtruck", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  age: Number,
  city: String,
  location: String,
});

const User = mongoose.model("User", UserSchema);

// SAVE USER
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ success: true, user });
});

// GET USERS (optional)
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(5000, () => {
  console.log("Mock API running on http://localhost:5000");
});
