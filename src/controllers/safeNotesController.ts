import { Response, Request } from "express";
import { postNote, getNotes } from "../services/safenotesService.js";

export async function createNotes(req: Request, res: Response) {
  const { title, note } = req.body;
  const { userId } = res.locals.userSession;

  try {
    await postNote(title, note, userId);
    res.sendStatus(200);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}

export async function obtainNotes(req: Request, res: Response) {
  const { noteId } = req.params;
  const { userId } = res.locals.userSession;

  try {
    const notes = await getNotes(noteId, userId);
    res.status(200).send(notes);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}
