import { Router } from "express";
import {
  createCards,
  obtainCards,
  removeCards,
} from "../controllers/cardsController.js";
import { validateToken } from "../middlewares/validateAuthorization.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import cardSchema from "../schemas/cardsSchema.js";

const cardsRouter = Router();

cardsRouter.post(
  "/cards",
  validateToken,
  validateSchemaMiddleware(cardSchema),
  createCards
);
cardsRouter.get("/cards/:cardId?", validateToken, obtainCards);
cardsRouter.delete("/cards/:cardId", validateToken, removeCards);

export default cardsRouter;
