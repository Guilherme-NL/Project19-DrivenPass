import { Router } from "express";
import { validateToken } from "../middlewares/validateAuthorization.js";
import {
  createCredentials,
  obtainCredentials,
  removeCredentials,
} from "../controllers/credentialsController.js";

const credentialRouter = Router();

credentialRouter.post("/credential", validateToken, createCredentials);
credentialRouter.get(
  "/credential/:credentialId?",
  validateToken,
  obtainCredentials
);
credentialRouter.delete(
  "/credential/:credentialId",
  validateToken,
  removeCredentials
);

export default credentialRouter;
