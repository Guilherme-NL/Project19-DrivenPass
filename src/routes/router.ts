import { Router } from "express";
import authRouter from "./authRouter.js";
import cardsRouter from "./cardsRouter.js";
import credentialRouter from "./credentialsRouter.js";
import notesRouter from "./safeNotesRouter.js";
import wifiRouter from "./wifiRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(notesRouter);
router.use(cardsRouter);
router.use(wifiRouter);

export default router;
