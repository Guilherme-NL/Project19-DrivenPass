import { Response, Request } from "express";
import { postCards } from "../services/cardsService.js";

export async function createCards(req: Request, res: Response) {
  const { title, number, name, cvc, expiration, password, isVirtual, type } =
    req.body;
  const userId = Number(res.locals.userSession.userId);
  try {
    await postCards(
      title,
      number,
      name,
      cvc,
      expiration,
      password,
      isVirtual,
      type,
      userId
    );
    res.sendStatus(201);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}
