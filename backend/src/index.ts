import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";

import userRoutes from "./routes/user.routes";
import foodTruckRoutes from "./routes/foodtruck.routes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/foodtrucks", foodTruckRoutes);

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
