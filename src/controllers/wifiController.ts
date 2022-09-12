import { Response, Request } from "express";
import { postWifi, getWifi, deleteWifi } from "../services/wifiService.js";

export async function createWifi(req: Request, res: Response) {
  const { title, password } = req.body;
  const userId = Number(res.locals.userSession.userId);
  try {
    await postWifi(title, password, userId);
    res.sendStatus(201);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}

export async function obtainWifi(req: Request, res: Response) {
  const { wifiId } = req.params;
  const { userId } = res.locals.userSession;
  try {
    const wifi = await getWifi(wifiId, userId);
    res.status(200).send(wifi);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}

export async function removeWifi(req: Request, res: Response) {
  const { wifiId } = req.params;
  const { userId } = res.locals.userSession;
  try {
    await deleteWifi(wifiId, userId);
    res.sendStatus(200);
  } catch (err) {
    if (err) {
      res.status(err.code).send(err.message);
    }
  }
}
