import mongoose from "mongoose";

const FoodTruckSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  category: String,
});

export default mongoose.model("FoodTruck", FoodTruckSchema);
