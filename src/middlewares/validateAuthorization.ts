import { Request, Response, NextFunction } from "express";
import client from "../database/postgres.js";

async function validateToken(req: Request, res: Response, next: NextFunction) {
  const token: string = req.header("Authorization").replace("Bearer ", "");
  const userSession = await client.sessions.findFirst({ where: { token } });

  if (!userSession) {
    return res.status(404).send("token does not belong to any user session");
  }

  res.locals.userSession = userSession;

  next();
}

export { validateToken };
