import { Response, Request } from "express";
import { postCards, deleteCard, getCards } from "../services/cardsService.js";

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

export async function obtainCards(req: Request, res: Response) {
  const { cardId } = req.params;
  const { userId } = res.locals.userSession;
  try {
    const cards = await getCards(cardId, userId);
    res.status(200).send(cards);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}

export async function removeCards(req: Request, res: Response) {
  const { cardId } = req.params;
  const { userId } = res.locals.userSession;
  try {
    await deleteCard(cardId, userId);
    res.sendStatus(200);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}
