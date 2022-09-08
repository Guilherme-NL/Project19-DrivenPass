import { Router } from "express";
import authRouter from "./authRouter.js";
import credentialRouter from "./credentialsRouter.js";
import notesRouter from "./safeNotesRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(notesRouter);

export default router;
