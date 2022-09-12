import {
  findWifi,
  findWifiById,
  findWifiByIds,
  insertWifi,
  deleteWifiById,
} from "../repositories/wifiRepositorie.js";
import Cryptr from "cryptr";

const cryptr = new Cryptr("myTotallySecretKey");

async function postWifi(title: string, password: string, userId: number) {
  const passwordHash = await passwordCrypt(password);
  await insertWifi(title, passwordHash, userId);
}

async function passwordCrypt(password: string) {
  const passwordHash = cryptr.encrypt(password);
  return passwordHash;
}

async function getWifi(wifiId: string, userId: number) {
  if (wifiId) {
    await validateWifi(wifiId, userId);
    return getWifiById(wifiId, userId);
  } else {
    return await getAllWifi(userId);
  }
}

async function getAllWifi(userId: number) {
  const wifi = await findWifi(userId);
  const decryptWifi = [...wifi];
  decryptWifi.map((e) => {
    e.password = cryptr.decrypt(e.password);
  });
  return decryptWifi;
}

async function getWifiById(wifiId: string, userId: number) {
  const wifi = await findWifiByIds(wifiId, userId);
  if (!wifi) {
    throw {
      code: 404,
      message: "The user does not have any wifi registered whit this id!",
    };
  }
  const decryptWifi = {
    ...wifi,
    password: cryptr.decrypt(wifi.password),
  };
  return decryptWifi;
}

async function validateWifi(wifiId: string, userId: number) {
  const wifi = await findWifiById(wifiId);
  if (!wifi) {
    throw {
      code: 404,
      message: "wifi does not exist",
    };
  }
  const userWifi = await findWifiByIds(wifiId, userId);
  if (!userWifi) {
    throw {
      code: 404,
      message: "The wifi does not belong to this user",
    };
  }
}

async function deleteWifi(wifiId: string, userId: number) {
  await validateWifi(wifiId, userId);
  await getWifiById(wifiId, userId);
  await deleteWifiById(wifiId);
  return "deleted!";
}

export { postWifi, getWifi, deleteWifi };
