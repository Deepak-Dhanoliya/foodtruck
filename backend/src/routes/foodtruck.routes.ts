import { Router } from "express";
import FoodTruck from "../models/FoodTruck";

const router = Router();

router.get("/", async (_, res) => {
  const trucks = await FoodTruck.find();
  res.json(trucks);
});

router.get("/nearby", async (_, res) => {
  const trucks = await FoodTruck.find();
  res.json(trucks);
});

export default router;
