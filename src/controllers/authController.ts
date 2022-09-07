import { registerNewUser } from "../services/authService.js";
import { v4 as uuid } from "uuid";
import joi from "joi";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    await registerNewUser(email, password);
    res.sendStatus(201);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}
