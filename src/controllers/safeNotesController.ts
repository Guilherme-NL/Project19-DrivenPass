import { Response, Request } from "express";
import { postNote } from "../services/safenotesService.js";

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
