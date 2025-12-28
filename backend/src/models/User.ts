import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
    age: String,

    pushToken: String,

    location: {
      address: String,
      latitude: Number,
      longitude: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
