import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
    age: String,

    fcmToken: { type: String, default: null },

    location: {
      address: String,
      latitude: Number,
      longitude: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
