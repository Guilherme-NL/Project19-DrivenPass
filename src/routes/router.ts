import { Router } from "express";
import authRouter from "./authRouter.js";
import credentialRouter from "./credentialsRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);

export default router;
