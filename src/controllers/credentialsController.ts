import { Response, Request } from "express";
import {
  postCredentials,
  getCredentials,
} from "../services/credentialsService.js";

export async function createCredentials(req: Request, res: Response) {
  const { title, url, username, password } = req.body;

  try {
    const { userId } = res.locals.userSession;
    await postCredentials(title, url, username, password, userId);
    res.sendStatus(200);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}

export async function obtainCredentials(req: Request, res: Response) {
  let { credentialId } = req.params;
  const { userId } = res.locals.userSession;
  try {
    const credentials = await getCredentials(credentialId, userId);
    res.status(200).send(credentials);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}
