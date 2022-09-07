import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import userSchema from "../schemas/authSchema.js";
import { register } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/login");
authRouter.post("/register", validateSchemaMiddleware(userSchema), register);

export default authRouter;
