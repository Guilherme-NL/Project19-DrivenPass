import { Router } from "express";
import { validateToken } from "../middlewares/validateAuthorization.js";
import {
  createCredentials,
  obtainCredentials,
} from "../controllers/credentialsController.js";

const credentialRouter = Router();

credentialRouter.post("/credential", validateToken, createCredentials);
credentialRouter.get(
  "/credential/:credentialId?",
  validateToken,
  obtainCredentials
);

export default credentialRouter;
