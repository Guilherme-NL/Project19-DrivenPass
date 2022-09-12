import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import userSchema from "../schemas/authSchema.js";
import { register, login } from "../controllers/authController.js";
var authRouter = Router();
authRouter.post("/login", validateSchemaMiddleware(userSchema), login);
authRouter.post("/register", validateSchemaMiddleware(userSchema), register);
export default authRouter;
