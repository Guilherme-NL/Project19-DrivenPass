import { Router } from "express";
import {
  createWifi,
  obtainWifi,
  removeWifi,
} from "../controllers/wifiController.js";
import { validateToken } from "../middlewares/validateAuthorization.js";

const wifiRouter = Router();

wifiRouter.post("/wifi", validateToken, createWifi);
wifiRouter.get("/wifi/:wifiId?", validateToken, obtainWifi);
wifiRouter.delete("/wifi/:wifiId", validateToken, removeWifi);

export default wifiRouter;
