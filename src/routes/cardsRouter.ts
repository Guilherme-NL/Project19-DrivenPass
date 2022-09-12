import { Router } from "express";
import { createCards } from "../controllers/cardsController.js";
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

export default cardsRouter;
