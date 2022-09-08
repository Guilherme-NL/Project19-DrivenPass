import { Router } from "express";
import {
  createNotes,
  obtainNotes,
  removeNotes,
} from "../controllers/safeNotesController.js";
import { validateToken } from "../middlewares/validateAuthorization.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import noteSchema from "../schemas/safenotesSchema.js";

const notesRouter = Router();

notesRouter.post(
  "/notes",
  validateToken,
  validateSchemaMiddleware(noteSchema),
  createNotes
);
notesRouter.get("/notes/:noteId?", validateToken, obtainNotes);
notesRouter.delete("/notes/:noteId", validateToken, removeNotes);

export default notesRouter;
